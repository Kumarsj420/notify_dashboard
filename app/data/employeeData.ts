export interface ExposureEvent {
  profile: string;
  id: string;
  name: string;
  designation: string;
  description: string;
  location: string;
  number: number,
  email:string,
  type: string | null
}

export const employeeData: ExposureEvent[] = [
  {
    profile: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1480",
    id: "1",
    name: "Kartik Arora",
    designation: "CEO",
    description: "CEO @ Faire. Board Director, Advisor, former CTO of Uber & Coupang.",
    location: "New York, USA",
    number: 9812345821,
    email: "kartik.arora@faire.com",
    type: "critical"
  },
  {
    profile: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1480",
    id: "2",
    name: "Priya Mehta",
    designation: "Chief Information Officer",
    description: "Leads IT infrastructure, cloud adoption, and cybersecurity initiatives.",
    location: "Bangalore, India",
    number: 9823498712,
    email: "priya.mehta@techcorp.com",
    type: "medium"
  },
  {
    profile: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1480",
    id: "3",
    name: "Aarav Sharma",
    designation: "Security Analyst",
    description: "Monitors threat intelligence and ensures endpoint security compliance.",
    location: "London, UK",
    number: 9812234785,
    email: "aarav.sharma@cyberpro.com",
    type: "critical"
  },
  {
    profile: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1480",
    id: "4",
    name: "Sofia Alvarez",
    designation: "Data Scientist",
    description: "Builds predictive models for fraud detection and financial risk analysis.",
    location: "Toronto, Canada",
    number: 9815678920,
    email: "sofia.alvarez@datasafe.com",
    type: null
  },
  {
    profile: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1480",
    id: "5",
    name: "Rohit Bansal",
    designation: "VP, Operations",
    description: "Oversees cross-functional teams and ensures compliance across regions.",
    location: "Singapore",
    number: 9845123789,
    email: "rohit.bansal@globex.com",
    type: "medium"
  },
  {
    profile: "https://plus.unsplash.com/premium_photo-1723867331866-e112500178a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1127",
    id: "6",
    name: "Maya Deshmukh",
    designation: "Product Manager",
    description: "Drives product strategy and roadmap for cybersecurity SaaS platforms.",
    location: "Pune, India",
    number: 9887234590,
    email: "maya.deshmukh@secureapp.io",
    type: null
  },
  {
    profile: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1480",
    id: "7",
    name: "Liam Carter",
    designation: "DevOps Engineer",
    description: "Automates cloud deployment pipelines and manages CI/CD workflows.",
    location: "Sydney, Australia",
    number: 9876123456,
    email: "liam.carter@devopsx.io",
    type: "medium"
  },
  {
    profile: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1480",
    id: "8",
    name: "Emma Johnson",
    designation: "Chief Marketing Officer",
    description: "Leads global brand and growth marketing initiatives for enterprise clients.",
    location: "San Francisco, USA",
    number: 9812387567,
    email: "emma.johnson@brandlytics.com",
    type: null
  },
  {
    profile: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1480",
    id: "9",
    name: "Harsh Vardhan",
    designation: "Cybersecurity Lead",
    description: "Manages network defense, incident response, and red team exercises.",
    location: "Delhi, India",
    number: 9845678123,
    email: "harsh.vardhan@infosec.com",
    type: "critical"
  },
  {
    profile: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1480",
    id: "10",
    name: "Lucas Martin",
    designation: "Legal Counsel",
    description: "Handles compliance, data protection, and cyber law advisories.",
    location: "Berlin, Germany",
    number: 9812347890,
    email: "lucas.martin@lawtech.eu",
    type: null
  }
];

