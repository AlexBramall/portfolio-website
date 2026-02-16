import { Calendar, Users, TrendingUp } from 'lucide-react';
import { projects } from '../../data/projects';

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-warmNeutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sienna-700 mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Showcasing impactful projects that demonstrate strategic thinking and execution excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-sienna-700 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-sienna-100 text-sienna-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                    </div>
                    <p className="text-sm font-medium text-sienna-700">{project.metrics.timeline}</p>
                    <p className="text-xs text-gray-500">Timeline</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                    </div>
                    <p className="text-sm font-medium text-sienna-700">{project.metrics.team}</p>
                    <p className="text-xs text-gray-500">Team Size</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="w-4 h-4 text-gray-400 mr-1" />
                    </div>
                    <p className="text-sm font-medium text-sienna-700">
                      {project.metrics.savings || project.metrics.users || project.metrics.efficiency || project.metrics.satisfaction}
                    </p>
                    <p className="text-xs text-gray-500">Impact</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
