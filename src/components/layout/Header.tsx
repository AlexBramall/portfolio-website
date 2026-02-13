import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../../types';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (section: SectionId) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-slate-800">
            Alex Bramall
          </div>

          <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onNavigate={handleNavigate} />
    </nav>
  );
};
