import { SectionId } from '../../types';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const sections: SectionId[] = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  return (
    <div className="hidden md:flex space-x-8">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onNavigate(section)}
          className={`capitalize transition-colors duration-200 ${
            activeSection === section
              ? 'text-red-600 font-medium'
              : 'text-gray-600 hover:text-red-600'
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
};
