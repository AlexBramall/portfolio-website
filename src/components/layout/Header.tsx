import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

function navLinkClassName(isActive: boolean, compact: boolean): string {
  const shape = compact
    ? 'rounded-pill px-3 py-1.5'
    : 'rounded-pill px-4 py-3';

  return `${shape} text-label transition-[color,background-color] duration-200 ${
    isActive
      ? 'bg-accent-subtle text-accent'
      : 'text-text-secondary hover:bg-surface-muted hover:text-text'
  }`;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/80 bg-bg/70 backdrop-blur-nav">
      <div className="px-5 md:px-8 lg:px-16">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between">
          <Link to="/" className="text-label font-semibold text-text" onClick={closeMenu}>
            Alex Bramall
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => navLinkClassName(isActive, true)}
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
        <div className="border-t border-border bg-surface/95 px-5 py-6 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) => navLinkClassName(isActive, false)}
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
