import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, CreditCard, RefreshCw, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import SomiHeader from "@/components/SomiHeader";
import SomiFooter from "@/components/SomiFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

type Provider = "stripe" | "paystack";

const nairaAmounts = [5000, 10000, 25000, 50000];
const dollarAmounts = [10, 25, 50, 100];

const Donate = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const canceled = searchParams.get("canceled") === "true";

  const [provider, setProvider] = useState<Provider>("paystack");
  const [recurring, setRecurring] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const amounts = provider === "paystack" ? nairaAmounts : dollarAmounts;
  const currencySymbol = provider === "paystack" ? "₦" : "$";
  const currency = provider === "paystack" ? "NGN" : "USD";

  const finalAmount = selectedAmount || (customAmount ? Number(customAmount) : 0);

  const handleDonate = async () => {
    if (!finalAmount || finalAmount <= 0) {
      toast({ title: "Please select or enter an amount", variant: "destructive" });
      return;
    }
    if (!email.trim()) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { provider, amount: finalAmount, currency, email, name, recurring },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast({ title: "Payment Error", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <SomiHeader />
        <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
          <CheckCircle className="w-16 h-16 text-primary mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Thank You for Your Donation!</h1>
          <p className="text-muted-foreground text-lg max-w-md">Your generosity helps us screen more men and save lives across Nigeria.</p>
          <a href="/" className="somi-btn-gold mt-8 inline-block text-sm py-3 px-6">Back to Home</a>
        </div>
        <SomiFooter />
      </div>
    );
  }

  if (canceled) {
    return (
      <div className="min-h-screen bg-background">
        <SomiHeader />
        <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
          <XCircle className="w-16 h-16 text-destructive mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Donation Canceled</h1>
          <p className="text-muted-foreground text-lg max-w-md">No worries — you can try again anytime.</p>
          <a href="/donate" className="somi-btn-gold mt-8 inline-block text-sm py-3 px-6">Try Again</a>
        </div>
        <SomiFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SomiHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <motion.div {...fadeUp} className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" /> Every Naira & Dollar Saves Lives
          </motion.div>
          <motion.h1 {...fadeUp} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6">
            Support the <span className="somi-gradient-text">Mission.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.2 }} className="text-lg text-background/60 max-w-xl mx-auto">
            Your donation funds free prostate cancer screenings for men who can't afford them.
          </motion.p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-lg">
          <motion.div {...fadeUp} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">

            {/* Provider Tabs */}
            <div className="flex rounded-xl bg-muted p-1 mb-6">
              <button
                onClick={() => { setProvider("paystack"); setSelectedAmount(null); setCustomAmount(""); }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${provider === "paystack" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                🇳🇬 Pay in Naira
              </button>
              <button
                onClick={() => { setProvider("stripe"); setSelectedAmount(null); setCustomAmount(""); }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${provider === "stripe" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                🌍 Pay in USD
              </button>
            </div>

            {/* Recurring Toggle */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setRecurring(false)}
                className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${!recurring ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
              >
                One-time
              </button>
              <button
                onClick={() => setRecurring(true)}
                className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${recurring ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
              >
                <RefreshCw className="w-3.5 h-3.5" /> Monthly
              </button>
            </div>

            {/* Amount Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  className={`py-3 rounded-xl border text-sm font-semibold transition-all ${selectedAmount === amt ? "border-primary bg-primary text-primary-foreground shadow-md" : "border-border text-foreground hover:border-primary/40 bg-background"}`}
                >
                  {currencySymbol}{amt.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
                {currencySymbol}
              </span>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                min="1"
                className="w-full border border-border rounded-xl pl-8 pr-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Donor Info */}
            <input
              type="text"
              placeholder="Your Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors mb-3"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors mb-6"
            />

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={loading || !finalAmount}
              className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Donate {finalAmount ? `${currencySymbol}${finalAmount.toLocaleString()}` : ""} {recurring ? "/ month" : ""}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Payments processed securely via {provider === "stripe" ? "Stripe" : "Paystack"}. {recurring ? "You can cancel your subscription anytime." : ""}
            </p>
          </motion.div>
        </div>
      </section>

      <SomiFooter />
    </div>
  );
};

export default Donate;
