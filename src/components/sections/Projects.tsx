import { projects } from '../../data/projects';

export const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-surface px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-eyebrow font-medium tracking-wide uppercase text-light-muted mb-2">
            Work
          </p>
          <h2 className="text-heading-xl font-semibold text-black">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden"
            >
              {/* Image Area */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-square object-cover bg-neutral-300"
              />

              {/* Content Area */}
              <div className="p-6">
                <h3 className="text-heading-sm font-semibold text-black mb-2">
                  {project.title}
                </h3>
                <p className="text-caption font-normal text-muted-text mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 2).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-surface rounded-full px-2 py-0.5 text-tag font-medium text-muted-text text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-neutral-200 text-center">
                  <div>
                    <p className="text-label font-bold text-black text-sm">
                      {project.metrics.timeline}
                    </p>
                    <p className="text-xs font-medium tracking-wide uppercase text-light-muted">
                      Timeline
                    </p>
                  </div>
                  <div>
                    <p className="text-label font-bold text-black text-sm">
                      {project.metrics.team}
                    </p>
                    <p className="text-xs font-medium tracking-wide uppercase text-light-muted">
                      Team
                    </p>
                  </div>
                  <div>
                    <p className="text-label font-bold text-black text-sm">
                      {project.metrics.savings || project.metrics.users || project.metrics.efficiency || project.metrics.satisfaction || '—'}
                    </p>
                    <p className="text-xs font-medium tracking-wide uppercase text-light-muted">
                      Impact
                    </p>
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
