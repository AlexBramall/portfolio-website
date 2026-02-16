import { Target, Zap, Code, Globe, Users, Briefcase, Database, Award } from 'lucide-react';
import { skillsData } from '../../data/skills';

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
};

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sienna-700 mb-4">Core Competencies</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive skill set built through years of hands-on experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((skill, index) => (
            <div key={index} className="bg-warmNeutral-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-sienna-600">
                    {iconMap[skill.iconName]}
                  </div>
                  <h3 className="font-semibold text-sienna-700">{skill.name}</h3>
                </div>
                <span className="text-sm font-medium text-gray-600">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-sienna-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
