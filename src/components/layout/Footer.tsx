import { Mail, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex justify-between items-center">
          {/* Social icons */}
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

          {/* Copyright */}
          <div className="text-caption font-normal text-light-muted">
            &copy; {new Date().getFullYear()} Alex Bramall
          </div>
        </div>
      </div>
    </footer>
  );
};
