import { motion } from "framer-motion";
import { User } from "lucide-react";

const team = [
  { name: "Executive Director", role: "Executive Director" },
  { name: "Medical Director", role: "Medical Director" },
  { name: "Director of Information Technology", role: "Director of IT" },
];

const TeamSection = () => {
  return (
    <section id="stories" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground"
        >
          The People Behind{" "}
          <span className="somi-gradient-text">the Mission</span>
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="somi-card p-6 text-center border border-border"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
