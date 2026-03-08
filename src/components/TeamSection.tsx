import { motion, AnimatePresence } from "framer-motion";
import { User, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

const leadership: TeamMember[] = [
  {
    name: "Dr. Moyinoluwa Akinwumi",
    role: "Founder / Executive Director",
    bio: "Dr. Moyinoluwa Akinwumi, fondly called Dr. MO, is the founder of the Saving Our Men Initiative. The first non-governmental organization (NGO) in Nigeria dedicated to prostate cancer awareness and screening. She has over 10 years of experience in community engagement and health workshops. A YALI (Young African Leader Initiative) alumnus and United People Global (UUPG) Leader. She works at a cancer center in Nigeria, where she passionately cares for thousands of patients. She is compassionate about cancer prevention, health equity, and advocacy. In her leisure time, she enjoys photography, capturing life moments through creative lenses.",
  },
  {
    name: "Dr. Olaoye Jegede",
    role: "Director of Volunteering",
  },
  {
    name: "Dr. Kabir Shomorin",
    role: "Director of Programs & Projects",
  },
  {
    name: "Dr. Favour Okoye",
    role: "Director of Partnership & Fundraising",
  },
  {
    name: "Barr. Majekodunmi",
    role: "Attorney",
  },
  {
    name: "Ayobami",
    role: "Director of Research",
  },
  {
    name: "Oluwasegun Ariyo",
    role: "Risk & Compliance Analyst",
  },
  {
    name: "Daniel Ohida",
    role: "Director of Communication",
  },
  {
    name: "Solomon Olalemi",
    role: "Director of Information Technology",
  },
  {
    name: "Tolulope",
    role: "Director of Operations",
  },
  {
    name: "Precious Opawoye",
    role: "Director of Media & Publicity",
  },
];

const advisoryBoard: TeamMember[] = [
  { name: "Engr. Joanna Olu Maduka", role: "Advisory Member" },
  { name: "Mrs. Emem Iyoho", role: "Advisory Member" },
  { name: "Engr. Vincent Maduka", role: "Advisory Member" },
  { name: "Dr. Chinenye Iwuji", role: "Advisory Member" },
  { name: "Prof. Olusegun Alatise", role: "Advisory Member" },
];

const getInitials = (name: string) => {
  const parts = name.replace(/^(Dr\.|Barr\.|Engr\.|Mrs\.|Prof\.)\s*/i, "").split(" ");
  return parts
    .filter((p) => p.length > 0)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const MemberCard = ({
  member,
  index,
  onSelect,
}: {
  member: TeamMember;
  index: number;
  onSelect: (m: TeamMember) => void;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06, duration: 0.4 }}
    whileHover={{ y: -6, scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => onSelect(member)}
    className="group relative bg-background rounded-2xl border border-border p-6 text-center cursor-pointer overflow-hidden transition-shadow duration-500 hover:shadow-[0_16px_48px_-12px_hsl(var(--primary)/0.18)] hover:border-primary/40"
  >
    {/* Top accent */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

    {member.image ? (
      <img
        src={member.image}
        alt={member.name}
        className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-transparent group-hover:ring-primary transition-all duration-400"
      />
    ) : (
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary transition-colors duration-400">
        <span className="text-lg font-bold text-primary group-hover:text-primary-foreground transition-colors duration-400">
          {getInitials(member.name)}
        </span>
      </div>
    )}
      </span>
    </div>

    <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
      {member.name}
    </h3>
    <p className="text-muted-foreground text-xs">{member.role}</p>

    {member.bio && (
      <div className="mt-3 flex items-center justify-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <span className="text-xs font-semibold">Read more</span>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="stroke-current">
          <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )}
  </motion.button>
);

const TeamSection = () => {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Meet the{" "}
            <span className="somi-gradient-text">Team</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Dedicated professionals united by one goal — saving men's lives through early detection and care.
          </p>
        </motion.div>

        {/* Leadership Grid */}
        <motion.h3
          {...fadeUp}
          className="text-xl font-bold text-foreground mb-6 text-center"
        >
          Leadership
        </motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {leadership.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} onSelect={setSelected} />
          ))}
        </div>

        {/* Advisory Board */}
        <motion.h3
          {...fadeUp}
          className="text-xl font-bold text-foreground mb-6 text-center"
        >
          Advisory Board
        </motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {advisoryBoard.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {/* Bio Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
              {selected?.image ? (
                <img
                  src={selected.image}
                  alt={selected?.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                  <span className="text-lg font-bold text-primary">
                    {selected ? getInitials(selected.name) : ""}
                  </span>
                </div>
              )}
              <div>
                <DialogTitle className="text-lg">{selected?.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">{selected?.role}</p>
              </div>
            </div>
          </DialogHeader>
          <DialogDescription className="text-muted-foreground leading-relaxed">
            {selected?.bio || "Bio coming soon."}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TeamSection;
