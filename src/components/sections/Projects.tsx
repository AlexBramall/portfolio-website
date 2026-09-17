import { projects } from '../../data/projects';
import { Project } from '../../types';

const impactMetric = (metrics: Project['metrics']) => {
  if (metrics.savings) {
    return { value: metrics.savings, label: 'Impact' };
  }
  if (metrics.users) {
    return { value: metrics.users, label: 'Impact' };
  }
  if (metrics.efficiency) {
    return { value: metrics.efficiency, label: 'Impact' };
  }
  if (metrics.satisfaction) {
    return { value: metrics.satisfaction, label: 'Impact' };
  }
  return { value: '—', label: 'Impact' };
};

export const Projects = () => {
  return (
    <section id="projects" className="py-32 md:py-40 bg-surface px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <p className="text-eyebrow font-medium tracking-wide uppercase text-light-muted mb-2">
            Work
          </p>
          <h2 className="text-heading-xl font-semibold text-black">
            Featured Projects
          </h2>
        </div>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {projects.map((project) => {
            const impact = impactMetric(project.metrics);

            return (
              <article
                key={project.title}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-video object-cover bg-neutral-200"
                />

                <div className="p-8">
                  <h3 className="text-heading-lg font-semibold text-black mb-2">
                    {project.title}
                  </h3>
                  <p className="text-body-sm font-normal text-muted-text mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface rounded-full px-[12px] py-[4px] text-[12px] font-medium text-muted-text"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-8 border-t border-surface text-center">
                    <div>
                      <p className="text-heading-lg font-bold text-black">
                        {project.metrics.timeline}
                      </p>
                      <p className="text-eyebrow font-medium tracking-widest uppercase text-light-muted">
                        Timeline
                      </p>
                    </div>
                    <div>
                      <p className="text-heading-lg font-bold text-black">
                        {project.metrics.team}
                      </p>
                      <p className="text-eyebrow font-medium tracking-widest uppercase text-light-muted">
                        Team
                      </p>
                    </div>
                    <div>
                      <p className="text-heading-lg font-bold text-black">
                        {impact.value}
                      </p>
                      <p className="text-eyebrow font-medium tracking-widest uppercase text-light-muted">
                        {impact.label}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
