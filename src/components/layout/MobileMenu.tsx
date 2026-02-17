import { SectionId } from '../../types';

interface MobileMenuProps {
  isOpen: boolean;
  sections: { id: SectionId; label: string }[];
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export const MobileMenu = ({ isOpen, sections, activeSection, onNavigate }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-black/[0.06]">
      <div className="px-6 py-4 space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`block px-4 py-2 text-body font-medium w-full text-left rounded-full transition-colors duration-150 ${
              activeSection === section.id
                ? 'bg-black text-white'
                : 'text-muted-text hover:text-black'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};
