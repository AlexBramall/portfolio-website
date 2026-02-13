import { Project } from '../types';

export const projects: Project[] = [
  {
    title: "Spanx Hydrogen Migration",
    description: "Led a comprehensive cloud migration project for a Fortune 500 company, transitioning 200+ applications to AWS while maintaining 99.9% uptime.",
    technologies: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    metrics: {
      timeline: "18 months",
      team: "25 engineers",
      savings: "$2M annually"
    },
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Digital Transformation Platform",
    description: "Orchestrated the development of a unified digital platform serving 50,000+ daily users across multiple business units.",
    technologies: ["React", "Node.js", "MongoDB", "Microservices"],
    metrics: {
      timeline: "24 months",
      team: "40 engineers",
      users: "50K+ DAU"
    },
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "AI-Powered Analytics Suite",
    description: "Managed the creation of an advanced analytics platform leveraging machine learning to provide real-time business insights.",
    technologies: ["Python", "TensorFlow", "Apache Spark", "Tableau"],
    metrics: {
      timeline: "15 months",
      team: "18 engineers",
      efficiency: "40% improvement"
    },
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Mobile Banking Redesign",
    description: "Spearheaded the complete redesign of a mobile banking application, improving user experience and security protocols.",
    technologies: ["React Native", "Firebase", "OAuth", "Biometrics"],
    metrics: {
      timeline: "12 months",
      team: "15 engineers",
      satisfaction: "4.8/5 rating"
    },
    image: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];
