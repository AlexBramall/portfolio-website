import { Mail, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Alex Bramall</h3>
            <p className="text-gray-400">Technical Project Manager</p>
          </div>

          <div className="flex space-x-6">
            <a href="mailto:alex.Bramall@email.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/alexBramall" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com/alexBramall" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 Alex Bramall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
