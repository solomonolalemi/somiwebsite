import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";
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
    role: "Head of Volunteering",
    bio: "A motivator and goal-oriented medical doctor, a strategic thinker with good sense of initiative and passion for service to humanity and leadership. He is an empathetic listener and empowerment advocate who believes that people can be anything they want to be as long as they have strong conviction and act in accordance with their faith.\n\nHe took many leadership roles as a student in the prestigious College of Medicine, University of Ibadan and continues to strive to live a life of impact and leave a lasting legacy that you can be the positive change in a world full of negativity, your background notwithstanding.",
  },
  {
    name: "Dr. Kabir Shomorin",
    role: "Head of Programs & Projects",
    bio: "He is a seasoned dental surgeon, whom over the years as a healthcare provider in his field of expertise, had gained recognition. His background involvement in providing for the underserved populace has steered his motives to continuously render community's health education and workshops, collaborating with local government agencies and other NGOs. His belief in giving to the community has been the driving force behind his relentless humanitarian services. When he is not providing solutions to worries of mankind, he is busy travelling, hiking and seeking new adventures.",
  },
  {
    name: "Dr. Favour Okoye",
    role: "Head of Partnership & Fundraising",
    bio: "Dr. Favour Okoye is a dedicated China-trained physician who returned to Nigeria with a mission to contribute to his community's healthcare. Specializing in family medicine, hospice, and palliative care, he is a strong advocate for early cancer screening, timely diagnosis, and prompt treatment. Dr. Okoye's commitment to improving health outcomes reflects his passion for holistic patient care. Outside of his professional life, he enjoys traveling and staying active by playing both table and long tennis, making a balanced approach to life a core aspect of his philosophy.",
  },
  {
    name: "Ayodeji Ojetunde",
    role: "Head of Research",
  },
  {
    name: "Oluwasegun Ariyo",
    role: "Risk & Compliance Analyst",
    bio: "He is an accomplished software developer who holds a Master's degree in Cybersecurity Management and has a proven track record of delivering secure, high-quality software solutions. He has excelled in developing applications that meet stringent data protection and integrity standards. He has collaborated effectively with cross-functional teams, leveraging agile methodologies, test-driven development, and continuous integration to deliver successful projects in fast-paced environments. His technical acumen, coupled with a deep understanding of security principles, positions him to contribute to innovative and challenging projects that prioritize both performance and security.",
  },
  {
    name: "Daniel Ohida",
    role: "Head of Communication",
    bio: "Daniel Ohida is an astute filmmaker & photographer with a knack for storytelling. He spends most of his time leveling up in filmmaking; exploring the tenets of cinematography and video editing. He believes that in an ever-changing world of cutting-edge technology, one must always and constantly shift his creative paradigms to remain relevant and become a creative of the future. His enthusiasm lies with visual storytelling (filmmaking, photography & editing), and he constantly looks out for mediums that help him employ his interest as a tool for sociocultural development.",
  },
  {
    name: "Solomon Olalemi",
    role: "Head of Information Technology",
    bio: "Solomon Olalemi is a visionary leader dedicated to nurturing a generation of better men in society. With over 5 years of experience as a Product Manager in the financial sector, Solomon has harnessed his innovative spirit to create impactful solutions that enhance lives. Currently serving as the Head of Digital Product at Polaris Bank, Nigeria, he continues to simplify financial activities for countless individuals.\n\nBeyond his professional achievements, Solomon is deeply passionate about health and wellness. He envisions a world where people thrive in both physical and spiritual well-being. Through his NGO work, Solomon channels his expertise in innovation and his commitment to healthy living, striving to create lasting positive change in communities across Nigeria.",
  },
  {
    name: "Tolulope",
    role: "Head of Operations",
  },
  {
    name: "Precious Opawoye",
    role: "Head of Media & Publicity",
    bio: "Precious Opawoye is the Head of Media and Publicity, specializing in strengthening the connection between the healthcare sector and the public. With a background in business development and research, she excels at creating strategic partnerships and promoting patient-centric healthcare solutions.\n\nHer passion for public health, cancer prevention, and women's health fuels her commitment to advancing initiatives that address critical health issues. She is dedicated to raising awareness and improving healthcare accessibility, ensuring that more people have access to the care they need. Precious is focused on using media and publicity to highlight transformative healthcare solutions that enhance patient outcomes and promote sustainable practices.",
  },
];

const boardOfTrustees: TeamMember[] = [
  {
    name: "Dr. Moyinoluwa Akinwumi",
    role: "Board of Trustees",
    bio: "Dr. Moyinoluwa Akinwumi, fondly called Dr. MO, is the founder of the Saving Our Men Initiative. The first non-governmental organization (NGO) in Nigeria dedicated to prostate cancer awareness and screening. She has over 10 years of experience in community engagement and health workshops. A YALI (Young African Leader Initiative) alumnus and United People Global (UUPG) Leader. She works at a cancer center in Nigeria, where she passionately cares for thousands of patients. She is compassionate about cancer prevention, health equity, and advocacy. In her leisure time, she enjoys photography, capturing life moments through creative lenses.",
  },
  {
    name: "Dr. Kabir Shomorin",
    role: "Board of Trustees",
    bio: "He is a seasoned dental surgeon, whom over the years as a healthcare provider in his field of expertise, had gained recognition. His background involvement in providing for the underserved populace has steered his motives to continuously render community's health education and workshops, collaborating with local government agencies and other NGOs. His belief in giving to the community has been the driving force behind his relentless humanitarian services. When he is not providing solutions to worries of mankind, he is busy travelling, hiking and seeking new adventures.",
  },
  {
    name: "Oluwasegun Ariyo",
    role: "Board of Trustees",
    bio: "He is an accomplished software developer who holds a Master's degree in Cybersecurity Management and has a proven track record of delivering secure, high-quality software solutions. He has excelled in developing applications that meet stringent data protection and integrity standards. He has collaborated effectively with cross-functional teams, leveraging agile methodologies, test-driven development, and continuous integration to deliver successful projects in fast-paced environments. His technical acumen, coupled with a deep understanding of security principles, positions him to contribute to innovative and challenging projects that prioritize both performance and security.",
  },
  {
    name: "Dr. Favour Okoye",
    role: "Board of Trustees",
    bio: "Dr. Favour Okoye is a dedicated China-trained physician who returned to Nigeria with a mission to contribute to his community's healthcare. Specializing in family medicine, hospice, and palliative care, he is a strong advocate for early cancer screening, timely diagnosis, and prompt treatment. Dr. Okoye's commitment to improving health outcomes reflects his passion for holistic patient care. Outside of his professional life, he enjoys traveling and staying active by playing both table and long tennis, making a balanced approach to life a core aspect of his philosophy.",
  },
  {
    name: "Barr. Majekodunmi",
    role: "Board of Trustees",
  },
];

const advisoryBoard: TeamMember[] = [
  {
    name: "Engr. Joanna Olu Maduka",
    role: "Advisory Member",
    bio: "Engr Mrs. Maduka is recognized for her distinguished and unique professional accomplishments. She had her first degree at University of Ife (now OAU) and MSc degree from Trinity College, Dublin. The first female elected member, then fellow of the Nigerian Society of Engineers (MNSE, FNSE), first female registered by Council of the Regulation of Engineers in Nigeria (COREN). She founded Association of Professional Women Engineers, APWEN.\n\nShe is an honorary fellow of the Nigerian Institute of Science and Technology, Yaba. A principal partner in a foremost electrical engineering consulting firm, LECCOM Associates, engaged in the design and supervision of several construction projects all over Nigeria, including the new Nigerian capital, Abuja. Former member of the United Nations Advisory Board on Science and Technology for Development. She founded the Friends of the Environment (FOTE). She was conferred with the Nigerian National Honor, MFR.",
  },
  {
    name: "Mrs. Emem Iyoho",
    role: "Advisory Member",
    bio: "She is a seasoned trainer and public administrator with a deep commitment to advancing public health. With over 17 years of experience in the public sector, she has developed a reputation for fostering innovative solutions, implementing policy changes, and delivering impactful training programs in her organization. As a team player, she brings a wealth of expertise in areas such as health systems strengthening, leadership development, capacity building and training for healthcare professionals and public institutions.\n\nShe continuously strives to empower individuals and organizations to achieve excellence in public health management and administration, contributing to healthier, more resilient communities and organizations. Her commitment to giving back to the community is a result of her expertise in initiatives that promote public health and administration.",
  },
  {
    name: "Engr. Vincent Maduka",
    role: "Advisory Member",
    bio: "Engr. Vincent is a Nigerian engineer, a renowned broadcaster and a teacher. He was conferred with the Nigerian national honor, OFR. He had his first degree at Leeds University, and obtained his master degree at the University College, Dublin, UK.\n\nHe worked with the Western Nigerian Television (WNTV) Ibadan, owned by the Western Nigerian Government Broadcasting Corporation (WNBC) and became the chief executive officer of WNTV-WNBS. He was subsequently appointed as the pioneer Director-General of the new federal television monopoly, the NTA. He served as the President of the Nigerian Society of Engineers and Nigerian Academy of Engineering. He served as the Chairman, boards of Nigerian Telecommunications Limited (NITEL), Development Alternatives and Resource Center (DARC), Magnum Trust Bank, to name a few. He lectured at the School of Media and Communication, Pan-Atlantic University where he taught Creativity and Innovation as a course to the Masters' students.",
  },
  {
    name: "Dr. Chinenye Iwuji",
    role: "Advisory Member",
    bio: "Dr Chinenye Iwuji trained in the United Kingdom, she had her first degree at the University of Dundee, and then received her medical degree from the University of Southampton. She completed her MSc and PhD in Oncology courses from the University of Nottingham and University of Leicester, respectively. She completed her oncology residency training at the University Hospitals of Leicester (UHL). A member of Royal College of Physicians (MRCP).\n\nA founding member of the British Nigerian Oncology Group (BNOG) and the current President. She is the head of Medical Oncology at Lakeshore Cancer Center, Nigeria where she manages all solid tumors and provides palliative/home care services. She has research networks home and abroad to promote research opportunities and initial clinical trials.",
  },
  {
    name: "Prof. Olusegun Alatise",
    role: "Advisory Member",
    bio: "Prof. Alatise is a Nigerian Consultant General Surgeon with a specialization in Surgical Oncology. He received training at the renowned Memorial Sloan Kettering Cancer Center (MSKCC) in 2009. Following his visit, MSKCC partnered with Obafemi Awolowo University Teaching Hospitals Complex (OAUTH), Nigeria, to establish the Global Cancer Disparities Initiatives (GCDI) in 2011, aiming to address global cancer burdens.\n\nIn 2013, Prof. Alatise co-founded the African Research Group for Oncology (ARGO), an initiative dedicated to advancing cancer research in Nigeria. He holds fellowships in Endoscopy and Colorectal Surgery and was recognized as one of IARC's \"50 for 50\" global cancer leaders in 2016. With over 111 publications to his name, Prof. Alatise received the prestigious Prof T.A.I Grillo Excellence in Research Award in 2017.",
  },
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

    <img
      src={member.image || "/placeholder.svg"}
      alt={member.name}
      className="w-16 h-16 rounded-full object-cover mx-auto mb-4 ring-2 ring-transparent group-hover:ring-primary transition-all duration-400 bg-primary/10"
    />

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

        {/* Board of Trustees */}
        <motion.h3
          {...fadeUp}
          className="text-xl font-bold text-foreground mb-6 text-center"
        >
          Board of Trustees
        </motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16 max-w-4xl mx-auto">
          {boardOfTrustees.map((member, i) => (
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
              <img
                src={selected?.image || "/placeholder.svg"}
                alt={selected?.name}
                className="w-14 h-14 rounded-full object-cover bg-primary/10"
              />
              <div>
                <DialogTitle className="text-lg">{selected?.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">{selected?.role}</p>
              </div>
            </div>
          </DialogHeader>
          <DialogDescription className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {selected?.bio || "Bio coming soon."}
          </DialogDescription>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TeamSection;
