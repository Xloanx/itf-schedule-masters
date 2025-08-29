import { 
  GraduationCap, 
  TrendingUp, 
  Search, 
  BookOpen, 
  Building2, 
  CreditCard, 
  Shield, 
  Users, 
  Wrench, 
  Target, 
  Megaphone 
} from "lucide-react";

export interface Schedule {
  id: string;
  name: string;
  acronym: string;
  description: string;
  objective: string;
  icon: any;
  color: string;
  expertise: string[];
  procedures: string[];
}

export const schedules: Schedule[] = [
  {
    id: "siwes",
    name: "Students Industrial Work Experience Scheme",
    acronym: "SIWES",
    description: "Bridges the gap between theoretical knowledge and practical experience for students in tertiary institutions.",
    objective: "To provide students with hands-on experience in industrial and commercial settings, enhancing their employability and bridging the skills gap between academia and industry.",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    expertise: [
      "Student placement coordination",
      "Industry partnership management", 
      "Progress monitoring and evaluation",
      "Stipend administration",
      "Logbook supervision"
    ],
    procedures: [
      "Student registration and verification",
      "Industry placement matching",
      "Monthly stipend processing",
      "Progress report evaluation",
      "Final assessment and certification"
    ]
  },
  {
    id: "ppit",
    name: "Performance and Productivity Improvement Training",
    acronym: "PPIT",
    description: "Enhances organizational performance through targeted training interventions and productivity improvement strategies.",
    objective: "To improve workplace productivity, enhance employee skills, and optimize organizational performance through structured training programs and strategic interventions.",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    expertise: [
      "Performance gap analysis",
      "Training needs identification",
      "Productivity metrics development",
      "Intervention design and implementation",
      "Impact assessment and reporting"
    ],
    procedures: [
      "Organizational performance assessment",
      "Training program design",
      "Implementation and delivery",
      "Progress monitoring",
      "Outcome evaluation and reporting"
    ]
  },
  {
    id: "tna",
    name: "Training Needs Assessment",
    acronym: "TNA",
    description: "Systematic identification and analysis of training requirements to address skills gaps and performance deficiencies.",
    objective: "To systematically identify, analyze, and prioritize training needs within organizations to ensure targeted and effective capacity building interventions.",
    icon: Search,
    color: "from-purple-500 to-violet-500",
    expertise: [
      "Skills gap analysis",
      "Competency mapping",
      "Data collection and analysis",
      "Stakeholder consultation",
      "Training recommendations"
    ],
    procedures: [
      "Preliminary needs identification",
      "Data collection and surveys",
      "Analysis and gap identification",
      "Training plan development",
      "Recommendation and approval"
    ]
  },
  {
    id: "curriculum",
    name: "Curriculum Development",
    acronym: "CURRICULUM",
    description: "Design and development of comprehensive training curricula aligned with industry standards and emerging technologies.",
    objective: "To develop relevant, industry-aligned curricula that meet current and future skill requirements while maintaining international standards and best practices.",
    icon: BookOpen,
    color: "from-orange-500 to-amber-500",
    expertise: [
      "Curriculum design and development",
      "Industry standards alignment",
      "Learning outcome definition",
      "Assessment strategy development",
      "Content quality assurance"
    ],
    procedures: [
      "Industry consultation and research",
      "Curriculum framework design",
      "Content development and review",
      "Pilot testing and validation",
      "Implementation and continuous improvement"
    ]
  },
  {
    id: "msme",
    name: "Micro Small and Medium Enterprise",
    acronym: "MSME",
    description: "Supports the growth and development of MSMEs through targeted training, capacity building, and business development services.",
    objective: "To enhance the capacity, competitiveness, and sustainability of micro, small, and medium enterprises through comprehensive training and business development support.",
    icon: Building2,
    color: "from-teal-500 to-cyan-500",
    expertise: [
      "Business development support",
      "Entrepreneurship training",
      "Financial literacy programs",
      "Market access facilitation",
      "Technology adoption guidance"
    ],
    procedures: [
      "MSME registration and profiling",
      "Business needs assessment",
      "Training program delivery",
      "Mentorship and coaching",
      "Progress monitoring and support"
    ]
  },
  {
    id: "reimbursement",
    name: "Reimbursement",
    acronym: "REIMBURSEMENT",
    description: "Manages the reimbursement process for training expenditures and ensures compliance with ITF policies and procedures.",
    objective: "To ensure accurate, timely, and compliant processing of reimbursement claims while maintaining transparency and accountability in financial transactions.",
    icon: CreditCard,
    color: "from-indigo-500 to-blue-500",
    expertise: [
      "Claims processing and verification",
      "Policy compliance monitoring",
      "Financial documentation review",
      "Audit trail management",
      "Disbursement coordination"
    ],
    procedures: [
      "Claim submission and validation",
      "Documentation verification",
      "Approval workflow processing",
      "Payment authorization",
      "Record keeping and reporting"
    ]
  },
  {
    id: "safety",
    name: "Safety",
    acronym: "SAFETY",
    description: "Promotes workplace safety culture through training, awareness programs, and safety management system implementation.",
    objective: "To establish and maintain a comprehensive safety culture through training, awareness, and implementation of best practice safety management systems.",
    icon: Shield,
    color: "from-red-500 to-pink-500",
    expertise: [
      "Safety training program development",
      "Risk assessment and management",
      "Safety compliance monitoring",
      "Incident investigation and reporting",
      "Emergency response planning"
    ],
    procedures: [
      "Safety needs assessment",
      "Training program design and delivery",
      "Safety audit and inspection",
      "Incident response and investigation",
      "Continuous improvement and review"
    ]
  },
  {
    id: "consultancy",
    name: "Consultancy",
    acronym: "CONSULTANCY",
    description: "Provides expert advisory services and technical assistance to organizations seeking specialized training and development solutions.",
    objective: "To deliver high-quality consultancy services that address specific organizational challenges and support strategic capacity building initiatives.",
    icon: Users,
    color: "from-emerald-500 to-green-500",
    expertise: [
      "Expert advisory services",
      "Technical assistance provision",
      "Strategic planning support",
      "Implementation guidance",
      "Performance optimization"
    ],
    procedures: [
      "Client needs assessment",
      "Proposal development and approval",
      "Service delivery and implementation",
      "Progress monitoring and reporting",
      "Project closure and evaluation"
    ]
  },
  {
    id: "tvst",
    name: "Technical and Vocational Skills Training",
    acronym: "TVST",
    description: "Delivers technical and vocational skills training programs to enhance workforce capabilities and employability.",
    objective: "To provide comprehensive technical and vocational skills training that enhances workforce capabilities and improves employment opportunities.",
    icon: Wrench,
    color: "from-yellow-500 to-orange-500",
    expertise: [
      "Technical skills development",
      "Vocational training delivery",
      "Industry-specific training",
      "Practical skills assessment",
      "Certification and accreditation"
    ],
    procedures: [
      "Skills needs identification",
      "Training program development",
      "Practical training delivery",
      "Skills assessment and certification",
      "Graduate tracking and support"
    ]
  },
  {
    id: "direct-training",
    name: "Direct Training",
    acronym: "DIRECT TRAINING",
    description: "Provides direct training interventions and capacity building programs tailored to specific organizational and individual needs.",
    objective: "To deliver targeted, direct training interventions that address specific skill gaps and capacity building requirements of individuals and organizations.",
    icon: Target,
    color: "from-violet-500 to-purple-500",
    expertise: [
      "Direct training delivery",
      "Customized program development",
      "Skills transfer and knowledge sharing",
      "Performance improvement tracking",
      "Capacity building assessment"
    ],
    procedures: [
      "Training needs specification",
      "Program customization and planning",
      "Direct training implementation",
      "Skills verification and assessment",
      "Impact evaluation and reporting"
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    acronym: "MARKETING",
    description: "Promotes ITF services, programs, and initiatives through strategic marketing and communication activities.",
    objective: "To effectively promote ITF services and programs while building strong stakeholder relationships and enhancing organizational visibility and impact.",
    icon: Megaphone,
    color: "from-pink-500 to-rose-500",
    expertise: [
      "Strategic marketing planning",
      "Brand management and promotion",
      "Stakeholder engagement",
      "Communication strategy development",
      "Digital marketing and outreach"
    ],
    procedures: [
      "Marketing strategy development",
      "Campaign planning and execution",
      "Content creation and distribution",
      "Stakeholder relationship management",
      "Performance measurement and optimization"
    ]
  }
];

export const getScheduleById = (id: string): Schedule | undefined => {
// export const getScheduleById = (id: string) => {
  return schedules.find(schedule => schedule.id === id);
};

export const getSchedulesByCategory = (category: string): Schedule[] => {
  // This can be expanded based on categorization needs
  return schedules;
};