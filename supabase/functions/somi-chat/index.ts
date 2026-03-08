import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are SOMI Assistant — the official AI helper for the Saving Our Men Initiative (SOMI), Nigeria's first NGO dedicated to prostate cancer awareness and screening.

Your role:
1. **Answer FAQs** about SOMI: what we do, our mission, how to donate, how to volunteer, upcoming events, and partner information.
2. **Guide men to get screened**: Explain the PSA test process (register → quick blood draw → results & counseling), reassure them it's quick (15 min), painless, free, and confidential.
3. **Help assess risk**: Ask about age (40+), family history, symptoms (difficulty urinating, frequent urination, blood in urine, pelvic pain). Emphasize you are NOT a doctor and they should get screened. Never diagnose.
4. **Collect inquiries**: If someone wants follow-up, ask for their name and phone/email so the SOMI team can reach out.

Key facts:
- SOMI was founded by Dr. Moyinoluwa Akinwumi (Dr. MO)
- 780+ men screened across Lagos and Osun states
- 1 in 6 Black men are affected by prostate cancer
- 80% of Nigerian cases are diagnosed late
- A PSA blood test takes just 15 minutes
- SOMI provides free screenings, treatment support, and financial aid
- Partner hospitals: LUTH, OAUTH, Reddington Hospital, First Consultant Medical Centre
- Website: savingourmen.org

Tone: Warm, empathetic, encouraging. Use simple language. Be culturally sensitive to Nigerian context. Keep responses concise (2-4 paragraphs max). Use markdown for formatting when helpful.

If asked something outside your scope, politely redirect to SOMI's mission or suggest contacting the team via WhatsApp.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "We're receiving too many requests right now. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to get a response. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("somi-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
