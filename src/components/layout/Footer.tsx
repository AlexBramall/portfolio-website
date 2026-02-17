import { Mail, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: Name and title */}
          <div>
            <h3 className="text-body font-semibold">Alex Bramall</h3>
            <p className="text-caption font-normal text-light-muted">Technical Program Manager</p>
          </div>

          {/* Center: Social icons */}
          <div className="flex gap-4">
            <a 
              href="mailto:alex.Bramall@email.com" 
              className="text-light-muted hover:text-white transition-colors duration-150"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/alexBramall" 
              className="text-light-muted hover:text-white transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/alexBramall" 
              className="text-light-muted hover:text-white transition-colors duration-150"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-caption font-normal text-light-muted">
            &copy; {new Date().getFullYear()} Alex Bramall
          </div>
        </div>
      </div>
    </footer>
  );
};
