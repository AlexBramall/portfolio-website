const highlights = [
  "Certified PMP and Scrum Master with advanced certifications",
  "Expert in Agile, Waterfall, and hybrid project methodologies",
  "Proven track record of delivering projects on time and within budget",
  "Strong background in cloud technologies and digital transformation"
];

export const About = () => {
  return (
    <section id="about" className="py-10 sm:py-24 bg-surface px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Photo */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Alex Bramall"
              className="w-full sm:w-80 h-[300px] sm:h-[400px] rounded-2xl object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="mb-12">
              <p className="text-eyebrow font-medium tracking-wide uppercase text-light-muted mb-2">
                About Me
              </p>
              <h2 className="text-heading-xl font-semibold text-black mb-6">
                Leadership Philosophy
              </h2>
              <p className="text-body font-normal text-muted-text leading-relaxed max-w-[500px] mb-8">
                I believe in empowering teams to achieve extraordinary results through clear communication,
                strategic thinking, and adaptive leadership. My approach combines technical expertise with
                human-centered management to deliver solutions that exceed expectations.
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 mb-8">
              {highlights.map((item, index) => (
                <span
                  key={index}
                  className="border border-button-border rounded-full px-4 py-1.5 text-tag font-medium text-muted-text"
                >
                  {item.split(' ')[0]} {item.split(' ')[1]}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <p key={index} className="text-caption font-normal text-muted-text">
                  • {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
