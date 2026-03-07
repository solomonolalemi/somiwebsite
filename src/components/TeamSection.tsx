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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            The People Behind{" "}
            <span className="somi-gradient-text">the Mission</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="somi-card p-6 text-center border border-border"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">
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
