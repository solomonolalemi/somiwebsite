import { motion } from "framer-motion";
import { BookOpen, Cross, ShieldCheck } from "lucide-react";
import SomiHeader from "@/components/SomiHeader";
import SomiFooter from "@/components/SomiFooter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const pillars = [
  {
    icon: BookOpen,
    title: "Education",
    text: "We educate men and their families about prostate health through community workshops, localized campaigns, and expert medical advisory.",
  },
  {
    icon: Cross,
    title: "Early Screening",
    text: "We provide regular, free prostate cancer screenings to enhance early detection when the disease is most treatable.",
  },
  {
    icon: ShieldCheck,
    title: "Financial Aid",
    text: "We offer financial assistance to men battling this disease. By contributing to our financial assistance fund, you help us sustain these free screenings and offer ongoing, life-saving support to those who need it most.",
  },
];

const missionBlocks = [
  {
    title: "Our Mission",
    text: "We are dedicated to empowering low-income communities with the knowledge needed to fight prostate cancer. Our absolute commitment is to bridge the critical gap in healthcare education and access.",
  },
  {
    title: "Our Vision",
    text: "Our vision is for every man, regardless of socio-economic status, to have access to the resources, support, and medical care needed to detect and treat prostate cancer.",
  },
  {
    title: "Our Goal",
    text: "We aim to drastically reduce prostate cancer mortality through early detection, aggressive awareness campaigns, and relentless advocacy for better healthcare policies in Nigeria.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <SomiHeader />

      {/* Section 1: Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <motion.h1
            {...fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6"
          >
            Bridging the Gap Between{" "}
            <span className="somi-gradient-text">Diagnosis and Treatment.</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-lg sm:text-xl text-background/60 max-w-2xl mx-auto"
          >
            We believe that every man deserves the opportunity to thrive without
            the fear of prostate cancer. Together, we are building a future where
            this disease is no longer a threat.
          </motion.p>
        </div>
      </section>

      {/* Section 2: Why We Exist */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.h2
            {...fadeUp}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center"
          >
            Why We Exist
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="text-muted-foreground text-lg leading-relaxed mb-6"
          >
            Recognizing the urgent need for targeted action, our initiative
            focuses on creating awareness, providing life-saving screenings, and
            raising funds for comprehensive prostate cancer care.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            We are here to ensure that every man—regardless of his
            background—has access to the necessary resources for prevention,
            early detection, and effective treatment. Our goal is to empower men
            to take control of their health and live fuller, healthier lives.
          </motion.p>
        </div>
      </section>

      {/* Section 3: Mission / Vision / Goal */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            {...fadeUp}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center"
          >
            What We Exist to Accomplish
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionBlocks.map((block, i) => (
              <motion.div
                key={block.title}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-background rounded-2xl border border-border p-8"
              >
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {block.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Three Pillars */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Targeted Action.{" "}
              <span className="somi-gradient-text">Tangible Results.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Together, we can create a healthier future for Nigerian men.
              Recognizing the urgent need for action, our initiative operates on
              three main pillars:
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-foreground rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-background mb-3">
                  {p.title}
                </h3>
                <p className="text-background/60 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <motion.h2
            {...fadeUp}
            className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4"
          >
            Your Support Changes Everything.
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-primary-foreground/70 text-lg mb-8"
          >
            Your generous donation directly translates to tests administered,
            families educated, and lives saved.
          </motion.p>
          <motion.a
            {...fadeUp}
            transition={{ delay: 0.2, duration: 0.5 }}
            href="#"
            className="inline-block bg-background text-foreground font-semibold py-3.5 px-8 rounded-full hover:opacity-90 transition-opacity"
          >
            Donate to Our Financial Assistance Fund
          </motion.a>
        </div>
      </section>

      <SomiFooter />
    </div>
  );
};

export default AboutUs;
