import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-nav">
      <div className="px-6 md:px-10 lg:px-20">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between">
        <Link
          to="/"
          className="text-label font-semibold text-text"
          onClick={closeMenu}
        >
          Alex Bramall
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative pb-1 text-label transition-colors duration-150 ${
                  isActive
                    ? 'text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-pill after:bg-accent'
                    : 'text-text-secondary hover:text-text'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="rounded-control p-2 text-text md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-border bg-surface px-6 py-6 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-control px-4 py-3 text-label ${
                    isActive ? 'bg-accent-subtle text-accent-hover' : 'text-text-secondary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
};
