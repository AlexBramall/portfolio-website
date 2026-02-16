import { ChevronDown, Mail, ArrowRight } from 'lucide-react';
import { SectionId } from '../../types';

interface HeroProps {
  onNavigate: (section: SectionId) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warmNeutral-50 to-sienna-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <img
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
            alt="Alex Bramall"
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-xl"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-sienna-700 mb-4">
            Alex Bramall
          </h1>
          <p className="text-2xl md:text-3xl text-sienna-600 mb-8">
            Technical Project Manager
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transforming complex technical challenges into successful outcomes.
            With 10+ years of experience leading cross-functional teams and delivering
            enterprise-scale solutions that drive business value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('projects')}
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border border-sienna-100 text-sienna-700 px-8 py-3 rounded-lg font-medium hover:bg-warmNeutral-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Get In Touch
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="animate-bounce">
          <ChevronDown
            className="w-8 h-8 text-sienna-300 mx-auto cursor-pointer"
            onClick={() => onNavigate('about')}
          />
        </div>
      </div>
    </section>
  );
};
