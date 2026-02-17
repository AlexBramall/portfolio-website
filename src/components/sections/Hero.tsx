import { ChevronDown, Mail, ArrowRight } from 'lucide-react';
import { SectionId } from '../../types';

interface HeroProps {
  onNavigate: (section: SectionId) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section 
      id="home" 
      className="min-h-[80vh] flex flex-col items-center justify-center bg-white pt-16 px-4 sm:px-6 md:px-12"
    >
      <div className="text-center flex flex-col items-center">
        <h1 className="text-display-xl font-bold text-black mb-4 leading-tight">
          Alex Bramall
        </h1>
        <p className="text-display-lg font-normal text-muted-text mb-6 tracking-normal">
          Technical Program Manager 
        </p>
        <p className="text-body font-normal text-muted-text max-w-[480px] mb-12 leading-relaxed">
          Transforming complex technical challenges into successful outcomes.
          With 10+ years of experience leading cross-functional teams and delivering
          enterprise-scale solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-full text-label font-medium hover:bg-dark-gray transition-colors duration-200"
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#48A111] text-white rounded-full text-label font-medium hover:bg-[#3a810d] transition-colors duration-200"
          >
            Get In Touch
            <Mail className="w-4 h-4" />
          </button>
        </div>

        <div className="animate-bounce">
          <ChevronDown
            className="w-6 h-6 text-light-muted cursor-pointer"
            onClick={() => onNavigate('about')}
          />
        </div>
      </div>
    </section>
  );
};
