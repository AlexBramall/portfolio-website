import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../../types';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const sections: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (section: SectionId) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-[67px] flex items-center justify-between">
        {/* Logo */}
        <div className="text-body font-semibold text-black tracking-normal">
          Alex Bramall
        </div>

        {/* Desktop Segmented Pill Navigation */}
        <div className="hidden md:flex items-center gap-0.5 bg-nav-pill rounded-full p-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavigate(section.id)}
              className={`px-[18px] py-[7px] rounded-full text-tag font-medium transition-all duration-150 ${
                activeSection === section.id
                  ? 'bg-white text-black shadow-nav-pill'
                  : 'text-muted-text hover:text-black'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen} 
        sections={sections}
        activeSection={activeSection}
        onNavigate={handleNavigate} 
      />
    </nav>
  );
};
