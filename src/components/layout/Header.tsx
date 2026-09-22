import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

type NavItem = {
  to: '/work' | '/about' | '/resume' | '/contact';
  label: 'Work' | 'About' | 'Resume' | 'Contact';
};

const navItems: readonly NavItem[] = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
];

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

function NavItemControl({
  item,
  compact,
  onNavigate,
}: {
  item: NavItem;
  compact: boolean;
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) => navLinkClassName(isActive, compact)}
    >
      {item.label}
    </NavLink>
  );
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
              <NavItemControl key={item.label} item={item} compact />
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
              <NavItemControl key={item.label} item={item} compact={false} onNavigate={closeMenu} />
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
};
