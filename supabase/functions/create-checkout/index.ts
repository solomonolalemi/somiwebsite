import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { provider, amount, currency, email, name, recurring } = await req.json();

    if (!provider || !amount || !currency || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (provider === "stripe") {
      const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
      if (!STRIPE_SECRET_KEY) {
        return new Response(
          JSON.stringify({ error: "Stripe is not configured yet. Please add your Stripe API key." }),
          { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Create a Stripe Checkout Session
      const lineItems = [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: { name: `SOMI Donation${recurring ? " (Monthly)" : ""}` },
            unit_amount: Math.round(amount * 100),
            ...(recurring ? { recurring: { interval: "month" } } : {}),
          },
          quantity: 1,
        },
      ];

      const body = new URLSearchParams({
        "mode": recurring ? "subscription" : "payment",
        "success_url": `${req.headers.get("origin") || "https://somiwebsite.lovable.app"}/donate?success=true`,
        "cancel_url": `${req.headers.get("origin") || "https://somiwebsite.lovable.app"}/donate?canceled=true`,
        "customer_email": email,
        "line_items[0][price_data][currency]": currency.toLowerCase(),
        "line_items[0][price_data][product_data][name]": `SOMI Donation${recurring ? " (Monthly)" : ""}`,
        "line_items[0][price_data][unit_amount]": String(Math.round(amount * 100)),
        "line_items[0][quantity]": "1",
        ...(recurring
          ? { "line_items[0][price_data][recurring][interval]": "month" }
          : {}),
      });

      const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const session = await stripeRes.json();

      if (session.error) {
        return new Response(JSON.stringify({ error: session.error.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (provider === "paystack") {
      const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY");
      if (!PAYSTACK_SECRET_KEY) {
        return new Response(
          JSON.stringify({ error: "Paystack is not configured yet. Please add your Paystack API key." }),
          { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const paystackBody: Record<string, unknown> = {
        email,
        amount: Math.round(amount * 100), // Paystack uses kobo
        currency: "NGN",
        callback_url: `${req.headers.get("origin") || "https://somiwebsite.lovable.app"}/donate?success=true`,
        metadata: { donor_name: name, recurring: recurring ? "monthly" : "one-time" },
      };

      // For recurring, create a plan first then use it
      if (recurring) {
        // Create a plan
        const planRes = await fetch("https://api.paystack.co/plan", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `SOMI Monthly ₦${amount.toLocaleString()}`,
            interval: "monthly",
            amount: Math.round(amount * 100),
          }),
        });
        const planData = await planRes.json();
        if (planData.status && planData.data?.plan_code) {
          paystackBody.plan = planData.data.plan_code;
          delete paystackBody.amount;
        }
      }

      const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paystackBody),
      });

      const paystackData = await paystackRes.json();

      if (!paystackData.status) {
        return new Response(JSON.stringify({ error: paystackData.message || "Paystack error" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ url: paystackData.data.authorization_url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid provider" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
