export interface SkillData {
  name: string;
  level: number;
  iconName: string;
}

export const skillsData: SkillData[] = [
  { name: "Project Management", level: 95, iconName: "Target" },
  { name: "Agile/Scrum", level: 90, iconName: "Zap" },
  { name: "Technical Architecture", level: 85, iconName: "Code" },
  { name: "Cloud Platforms", level: 88, iconName: "Globe" },
  { name: "Team Leadership", level: 92, iconName: "Users" },
  { name: "Stakeholder Management", level: 94, iconName: "Briefcase" },
  { name: "Data Analytics", level: 80, iconName: "Database" },
  { name: "Risk Management", level: 87, iconName: "Award" }
];
