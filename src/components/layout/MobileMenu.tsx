import { SectionId } from '../../types';

interface MobileMenuProps {
  isOpen: boolean;
  onNavigate: (section: SectionId) => void;
}

const sections: SectionId[] = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export const MobileMenu = ({ isOpen, onNavigate }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-red-600 capitalize w-full text-left"
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
};
