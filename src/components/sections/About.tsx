import { TrendingUp, Users, CheckCircle } from 'lucide-react';

const highlights = [
  "Certified PMP and Scrum Master with advanced certifications",
  "Expert in Agile, Waterfall, and hybrid project methodologies",
  "Proven track record of delivering projects on time and within budget",
  "Strong background in cloud technologies and digital transformation"
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">About Me</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Passionate about bridging the gap between technology and business objectives
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Leadership Philosophy</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              I believe in empowering teams to achieve extraordinary results through clear communication,
              strategic thinking, and adaptive leadership. My approach combines technical expertise with
              human-centered management to deliver solutions that exceed expectations.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-slate-800">50+ Projects</h4>
                <p className="text-sm text-gray-600">Successfully delivered</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-800">100+ Team Members</h4>
                <p className="text-sm text-gray-600">Led and mentored</p>
              </div>
            </div>

            <div className="space-y-3">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
