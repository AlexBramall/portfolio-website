import { projects } from '../../data/projects';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export const Projects = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollCheck = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 10
    );
  };

  useEffect(() => {
    handleScrollCheck();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScrollCheck);
      window.addEventListener('resize', handleScrollCheck);
      return () => {
        container.removeEventListener('scroll', handleScrollCheck);
        window.removeEventListener('resize', handleScrollCheck);
      };
    }
  }, []);

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

        <div className="relative">
          {/* Carousel Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80"
              >
                <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Image Area */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[10/7] object-cover bg-neutral-300"
                  />

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-heading-sm font-semibold text-black mb-2">
                      {project.title}
                    </h3>
                    <p className="text-caption font-normal text-muted-text mb-4 line-clamp-2 flex-grow">
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
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Below Carousel */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`p-1 rounded-full transition-colors duration-150 ${
                canScrollLeft
                  ? 'bg-neutral-200 text-black hover:bg-neutral-300'
                  : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              }`}
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>

            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`p-1 rounded-full transition-colors duration-150 ${
                canScrollRight
                  ? 'bg-neutral-200 text-black hover:bg-neutral-300'
                  : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              }`}
              aria-label="Next projects"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
