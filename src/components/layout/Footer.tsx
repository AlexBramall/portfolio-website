import { Mail, Linkedin, Github } from 'lucide-react';

const social = [
  { href: 'mailto:alex.Bramall@email.com', label: 'Email', icon: Mail },
  { href: 'https://linkedin.com/in/alexBramall', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/alexBramall', label: 'GitHub', icon: Github },
] as const;

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="px-5 md:px-8 lg:px-16">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex gap-4">
            {social.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-text-muted transition-colors duration-200 hover:text-accent"
                  aria-label={item.label}
                  {...(item.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
          <p className="text-caption text-text-muted">
            &copy; {new Date().getFullYear()} Alex Bramall
          </p>
        </div>
      </div>
    </footer>
  );
};
