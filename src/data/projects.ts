import { Project } from '../types';

export const projects: Project[] = [
  {
    title: "Lorem Ipsum Project Alpha",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    technologies: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    metrics: {
      timeline: "18 months",
      team: "25 engineers",
      savings: "$2M annually"
    },
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Lorem Ipsum Project Beta",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    technologies: ["React", "Node.js", "MongoDB", "Microservices"],
    metrics: {
      timeline: "24 months",
      team: "40 engineers",
      users: "50K+ DAU"
    },
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Lorem Ipsum Project Gamma",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    technologies: ["Python", "TensorFlow", "Apache Spark", "Tableau"],
    metrics: {
      timeline: "15 months",
      team: "18 engineers",
      efficiency: "40% improvement"
    },
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Lorem Ipsum Project Delta",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    technologies: ["React Native", "Firebase", "OAuth", "Biometrics"],
    metrics: {
      timeline: "12 months",
      team: "15 engineers",
      satisfaction: "4.8/5 rating"
    },
    image: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];
