import { Mail, Linkedin, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Let's Connect</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to discuss your next project or opportunity? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-xl text-center">
            <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Drop me a line anytime</p>
            <a
              href="mailto:alex.Bramall@email.com"
              className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              alex.Bramall@email.com
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Linkedin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">LinkedIn</h3>
            <p className="text-gray-600 mb-4">Connect professionally</p>
            <a
              href="https://linkedin.com/in/alexBramall"
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              View Profile
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Location</h3>
            <p className="text-gray-600 mb-4">Available for remote work</p>
            <p className="text-purple-600 font-medium">San Francisco, CA</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-slate-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Start a Conversation?</h3>
            <p className="text-gray-600 mb-6">
              Whether you're looking for a technical project manager, consultant, or collaboration partner,
              I'm always interested in discussing innovative projects and opportunities.
            </p>
            <a
              href="mailto:alex.Bramall@email.com"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 inline-flex items-center gap-2"
            >
              Schedule a Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
