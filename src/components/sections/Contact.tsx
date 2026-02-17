import { MapPin, ArrowRight } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-black text-white">
      <div className="max-w-6xl mx-auto px-12">
        <div className="text-center mb-8">
          <h2 className="text-heading-xl font-bold mb-4">
            Let's Connect
          </h2>
          <p className="text-body font-normal text-light-muted max-w-[480px] mx-auto">
            Ready to discuss your next project or opportunity? I'd love to hear from you.
          </p>
        </div>

        {/* Location */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <MapPin className="w-4 h-4 text-light-muted" />
          <span className="text-caption font-normal text-light-muted">
            Austin, Texas
          </span>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="mailto:alex.Bramall@email.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#48A111] text-white rounded-full text-label font-medium hover:bg-[#3a810d] transition-colors duration-200"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
