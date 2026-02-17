import { skillsData } from '../../data/skills';

export const Skills = () => {
  // Group competencies by category
  const grouped = skillsData.reduce((acc, item) => {
    const existing = acc.find(group => group.category === item.category);
    if (existing) {
      existing.items.push(item);
    } else {
      acc.push({ category: item.category, items: [item] });
    }
    return acc;
  }, [] as Array<{ category: string; items: typeof skillsData }>);

  return (
    <section id="skills" className="py-10 sm:py-24 bg-white px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <p className="text-eyebrow font-medium tracking-wide uppercase text-light-muted mb-2">
            Competencies
          </p>
          <h2 className="text-heading-xl font-semibold text-black">
            Core Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {skillsData.map((competency, index) => (
            <div
              key={index}
              className="bg-surface rounded-2xl p-5 sm:p-8 hover:bg-neutral-200 transition-colors duration-200"
            >
              <p className="text-eyebrow font-medium tracking-wide uppercase text-light-muted mb-3">
                {competency.category}
              </p>
              <h3 className="text-heading-md font-semibold text-black mb-2">
                {competency.name}
              </h3>
              <p className="text-caption font-normal text-muted-text line-clamp-2">
                {competency.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
