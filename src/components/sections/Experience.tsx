import { Calendar, CheckCircle } from 'lucide-react';
import { experience } from '../../data/experience';

export const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Professional Journey</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A decade of progressive growth in technical project management
          </p>
        </div>

        <div className="space-y-8">
          {experience.map((job, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{job.role}</h3>
                  <p className="text-emerald-600 font-medium">{job.company}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-2 md:mt-0">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{job.year}</span>
                </div>
              </div>

              <div className="space-y-3">
                {job.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
