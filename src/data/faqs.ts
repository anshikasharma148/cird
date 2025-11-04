// src/data/faqs.ts
export type FAQ = {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  category: string; // <---- added
};

const faqs: FAQ[] = [
  {
    id: "about-1",
    question: "What is CIRD?",
    answer:
      "The Centre for Industrial Research and Development (CIRD) is an Industry–Academia interface established at Jaypee University of Engineering and Technology (JUET), Guna to facilitate research translation, technology development, IPR management, R&D collaboration, technology transfer and commercialization, and mentoring.",
    tags: ["about"],
    category: "About",
  },
  {
    id: "mission-1",
    question: "What is the mission of CIRD?",
    answer:
      "To be a dynamic interface with industry, fostering innovation, research collaboration, and sustainable commercialization of science and technology for mutual benefit.",
    tags: ["about", "mission"],
    category: "About",
  },
  {
    id: "aim-1",
    question: "What is the aim of CIRD?",
    answer:
      "CIRD aims to serve as an effective interface between academia and industry to foster, promote, and sustain the commercialization of science and technology for mutual growth and societal benefit.",
    tags: ["about", "aim"],
    category: "About",
  },
  {
    id: "research-areas-1",
    question: "What are the main research areas at CIRD?",
    answer:
      "CIRD focuses on IoT & embedded systems, robotics & industrial automation, AI/ML, VLSI and microelectronics, materials research, and technology transfer for industry applications.",
    tags: ["research"],
    category: "Projects",
  },
  {
    id: "projects-1",
    question: "How many projects are ongoing and completed?",
    answer:
      "CIRD manages multiple projects. Example numbers shown on the site: 11 ongoing and 4 completed projects (illustrative — refer to the Research page for the latest list).",
    tags: ["projects"],
    category: "Projects",
  },
  {
    id: "ongoing-1",
    question: "Can you list some ongoing projects?",
    answer:
      "Ongoing projects include: Utilization of Bottom Ash in concrete and pavers, Monitoring and control system for coal handling plant, SF-6 Gas Monitoring System (GIS), and Automatic Reservoir Monitoring System (ARMAC).",
    tags: ["projects"],
    category: "Projects",
  },
  {
    id: "patents-1",
    question: "Has CIRD filed patents?",
    answer:
      "Yes. CIRD has several patents granted and many applications under review with IP India. Examples include Lateral Force Resistance Interlocking Brick, Rail-Guided Inspection Robot, and Master Troughing Idler designs.",
    tags: ["patents"],
    category: "Patents",
  },
  {
    id: "patent-process",
    question: "How does CIRD handle intellectual property (IPR)?",
    answer:
      "CIRD supports IPR management, filing patents with IP India, and working on commercialization or licensing opportunities for approved patents.",
    tags: ["ipr", "patents"],
    category: "Patents",
  },
  {
    id: "team-1",
    question: "Who leads CIRD?",
    answer:
      "Coordinator & Incharge: Dr. Dhananjay R. Mishra. Core members include Dr. Pankaj Dumka, Dr. Gaurav Saxena, Dr. Amit Kumar Srivastava, and Dr. Dharmendra Kumar Shukla.",
    tags: ["team"],
    category: "Team",
  },
  {
    id: "team-opportunities",
    question: "Who can I contact for joining as a research collaborator?",
    answer:
      "You can contact the coordinator at cird@juetguna.in. Individual faculty leads handle domain-specific collaborations.",
    tags: ["team", "collaboration"],
    category: "Team",
  },
  {
    id: "contact-1",
    question: "What is the contact information for CIRD?",
    answer:
      "Email: cird@juetguna.in. Address: Jaypee University of Engineering and Technology, Guna. Phone: listed on the site footer for specific coordinators.",
    tags: ["contact"],
    category: "Contact",
  },
  {
    id: "apply-internship",
    question: "How can students apply for internships?",
    answer:
      "Students should reach out via cird@juetguna.in or the 'Opportunities' page. Openings may also be shared by faculty mentors.",
    tags: ["internships"],
    category: "Contact",
  },
  {
    id: "collab-1",
    question: "How does CIRD collaborate with industry?",
    answer:
      "CIRD collaborates through MoUs and consultancy agreements (e.g., with JPVL) to run joint R&D and technology transfer projects.",
    tags: ["collaboration"],
    category: "About",
  },
  {
    id: "service-offer",
    question: "Does CIRD offer consultancy services?",
    answer:
      "Yes — CIRD provides technical consultancy to industry partners under MoUs and project agreements.",
    tags: ["services"],
    category: "About",
  },
  {
    id: "more-info",
    question: "Where can I get more information about CIRD?",
    answer:
      "Visit the About, Research, or Entities pages on this website, or email cird@juetguna.in for specific queries.",
    tags: ["about", "contact"],
    category: "Contact",
  },
];

export default faqs;
