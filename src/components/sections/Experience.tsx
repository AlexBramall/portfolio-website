import { experience } from '../../data/experience';

export const Experience = () => {
  return (
    <section id="experience" className="py-10 sm:py-24 bg-white px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <p className="text-eyebrow font-medium tracking-wide uppercase text-light-muted mb-2">
            Experience
          </p>
          <h2 className="text-heading-xl font-semibold text-black">
            Professional Journey
          </h2>
        </div>

        <div className="space-y-8 max-w-4xl">
          {experience.map((job, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                {/* Date column */}
                <div className="sm:w-48 sm:flex-shrink-0 mb-1 sm:mb-0">
                  <p className="text-caption font-normal text-light-muted">
                    {job.year}
                  </p>
                </div>

                {/* Content column */}
                <div className="flex-1 pb-8 border-b border-surface">
                  <h3 className="text-heading-sm font-semibold text-black mb-1">
                    {job.role}
                  </h3>
                  <p className="text-caption font-normal text-light-muted mb-4">
                    {job.company}
                  </p>

                  <ul className="space-y-2">
                    {job.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-caption font-normal text-muted-text">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
