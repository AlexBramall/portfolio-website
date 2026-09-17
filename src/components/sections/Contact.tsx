import { MapPin } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-32 md:py-40 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-6">
          <h2 className="text-[40px] font-bold mb-4">
            Let's Connect
          </h2>
          <p className="text-heading-sm font-normal text-light-muted max-w-[480px] mx-auto">
            Ready to discuss your next project or opportunity? I'd love to hear from you.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-8 text-caption font-normal text-muted-text">
          <a
            href="mailto:alex.Bramall@email.com"
            className="hover:text-white transition-colors duration-150"
          >
            alex.Bramall@email.com
          </a>
          <a
            href="https://linkedin.com/in/alexBramall"
            className="hover:text-white transition-colors duration-150"
          >
            LinkedIn
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Austin, Texas
          </span>
        </div>

        <div className="flex justify-center">
          <a
            href="mailto:alex.Bramall@email.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full text-label font-medium hover:bg-neutral-200 transition-colors duration-200"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};
