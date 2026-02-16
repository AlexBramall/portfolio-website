import { Mail, Linkedin, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-black text-white">
      <div className="max-w-6xl mx-auto px-12">
        <div className="text-center mb-16">
          <h2 className="text-heading-xl font-bold mb-4">
            Let's Connect
          </h2>
          <p className="text-body font-normal text-light-muted max-w-[480px] mx-auto">
            Ready to discuss your next project or opportunity? I'd love to hear from you.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-8">
          <a
            href="mailto:alex.Bramall@email.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#48A111] text-white rounded-full text-label font-medium hover:bg-[#3a810d] transition-colors duration-200"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 items-center text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 flex-shrink-0" />
            <a
              href="mailto:alex.Bramall@email.com"
              className="text-caption font-normal text-light-muted hover:text-white transition-colors"
            >
              alex.Bramall@email.com
            </a>
          </div>

          <div className="hidden sm:block w-px h-6 bg-white/20"></div>

          <div className="flex items-center gap-3">
            <Linkedin className="w-5 h-5 flex-shrink-0" />
            <a
              href="https://linkedin.com/in/alexBramall"
              className="text-caption font-normal text-light-muted hover:text-white transition-colors inline-flex items-center gap-1"
            >
              LinkedIn Profile
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="hidden sm:block w-px h-6 bg-white/20"></div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 flex-shrink-0" />
            <span className="text-caption font-normal text-light-muted">
              San Francisco, CA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
