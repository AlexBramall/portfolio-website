# Portfolio Website

A modern, performant portfolio website built with React and TypeScript, featuring professional architecture, error monitoring, and responsive design.

## 🚀 Tech Stack

### Core Framework & Language
- **React 18.3.1** - Chosen as the primary framework due to familiarity and industry adoption
- **TypeScript 5.5.3** - Provides type safety, better IDE support, and improved developer experience
- **Vite 5.4.2** - Lightning-fast build tool with HMR (Hot Module Replacement) for optimal development experience

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid UI development
- **PostCSS 8.4.35** - CSS processor for Tailwind compilation
- **Lucide React 0.344.0** - Beautiful, consistent icon library

### Monitoring & Error Tracking
- **Sentry 9.35.0** - Production-grade error monitoring and performance tracking
  - Error boundaries for graceful error handling
  - Performance monitoring with browser tracing
  - Custom breadcrumbs for debugging
  - User context and custom tags

### Code Quality
- **ESLint 9.9.1** - JavaScript/TypeScript linting
- **TypeScript ESLint 8.3.0** - TypeScript-specific linting rules
- **React Hooks ESLint Plugin** - Enforces React Hooks best practices
- **React Refresh ESLint Plugin** - Ensures Fast Refresh compatibility

### Why This Stack?

**React was chosen** as the foundation because:
- Strong familiarity with the React ecosystem
- Extensive component library and tooling support
- Large community and extensive documentation
- Industry-standard for modern web applications
- Excellent performance with virtual DOM
- Rich ecosystem of hooks, libraries, and patterns

## 📁 Architecture

This project follows a **component-based architecture** with clear separation of concerns, making it scalable, maintainable, and easy to understand.

### Project Structure

```
src/
├── components/           # All React components
│   ├── layout/          # Layout components (Header, Footer, Navigation)
│   ├── sections/        # Page section components (Hero, About, Skills, etc.)
│   └── ErrorFallback.tsx # Error boundary fallback UI
├── data/                # Static data and content
│   ├── projects.ts      # Project showcase data
│   ├── skills.ts        # Skills and competencies
│   └── experience.ts    # Work experience history
├── hooks/               # Custom React hooks
│   ├── useActiveSection.ts      # Tracks active section on scroll
│   └── useScrollToSection.ts    # Smooth scroll navigation
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared interfaces and types
├── App.tsx              # Main application component (orchestrator)
├── main.tsx             # Application entry point
├── sentry.ts            # Sentry configuration and utilities
└── index.css            # Global styles and Tailwind directives
```

### Architecture Principles

#### 1. **Separation of Concerns**
- **Data Layer** ([data/](src/data/)) - All content is externalized from components
- **Presentation Layer** ([components/](src/components/)) - Pure UI components
- **Business Logic** ([hooks/](src/hooks/)) - Reusable logic extracted into custom hooks
- **Type Safety** ([types/](src/types/)) - Centralized type definitions

#### 2. **Component Organization**

**Layout Components** ([components/layout/](src/components/layout/))
- Reusable structural components (Header, Footer, Navigation)
- Manage layout-level state (mobile menu open/closed)
- Provide consistent UI framework

**Section Components** ([components/sections/](src/components/sections/))
- Self-contained page sections (Hero, About, Skills, Projects, Experience, Contact)
- Each section is independently maintainable
- Can be reordered or removed without affecting others

**Benefits:**
- Easy to locate specific features
- Changes are isolated and safe
- Components can be tested independently
- New developers can navigate the codebase quickly

#### 3. **Custom Hooks Pattern**

**useActiveSection** ([hooks/useActiveSection.ts](src/hooks/useActiveSection.ts))
```typescript
// Tracks which section is currently in viewport
const activeSection = useActiveSection(['home', 'about', 'skills', ...]);
```

**useScrollToSection** ([hooks/useScrollToSection.ts](src/hooks/useScrollToSection.ts))
```typescript
// Provides smooth scroll navigation with Sentry tracking
const scrollToSection = useScrollToSection();
scrollToSection('projects');
```

**Benefits:**
- Logic reuse across components
- Easier to test and debug
- Cleaner component code
- Follows React best practices

#### 4. **Type-Safe Data Flow**

```typescript
// types/index.ts - Single source of truth for data shapes
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  metrics: { ... };
  image: string;
}

// data/projects.ts - Type-safe data
export const projects: Project[] = [ ... ];

// components/sections/Projects.tsx - Type-safe consumption
import { projects } from '../../data/projects';
```

**Benefits:**
- Catch errors at compile time
- IDE autocomplete and IntelliSense
- Refactoring is safer
- Self-documenting code

#### 5. **Error Boundary Pattern**

```typescript
// App.tsx
<Sentry.ErrorBoundary fallback={ErrorFallback} showDialog>
  <AppContent />
</Sentry.ErrorBoundary>
```

- Graceful error handling prevents white screen of death
- User-friendly error messages
- Automatic error reporting to Sentry
- Option for users to report issues

## 🎯 Key Features

### Developer Experience
- ⚡ **Hot Module Replacement** - Instant updates during development
- 🔍 **TypeScript IntelliSense** - Smart autocomplete and type checking
- 📏 **ESLint** - Consistent code quality and best practices
- 🎨 **Tailwind CSS** - Rapid UI development with utility classes

### User Experience
- 📱 **Fully Responsive** - Mobile-first design with adaptive layouts
- 🎯 **Smooth Scroll Navigation** - Seamless section transitions
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🎭 **Error Handling** - Graceful degradation with user-friendly messages

### Performance
- 🚀 **Vite Build** - Optimized production bundles
- 📦 **Code Splitting** - Ready for lazy loading (via React.lazy)
- 🔄 **React 18** - Concurrent features and automatic batching
- 📊 **Performance Monitoring** - Sentry performance tracking

### Monitoring & Observability
- 🐛 **Error Tracking** - Automatic error capture and reporting
- 📈 **Performance Metrics** - Real user monitoring (RUM)
- 🍞 **Breadcrumbs** - Navigation and interaction tracking
- 🏷️ **Custom Tags** - Environment, viewport, and user context

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your Sentry DSN (optional)
# Edit .env and add: VITE_SENTRY_DSN=your-dsn-here
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 (or next available port)
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📝 Development Workflow

### Adding a New Section

1. **Create Section Component**
```bash
src/components/sections/NewSection.tsx
```

2. **Import and Add to App.tsx**
```typescript
import { NewSection } from './components/sections/NewSection';

// Add to sections array
const sections: SectionId[] = ['home', 'about', 'skills', 'projects', 'experience', 'contact', 'newsection'];

// Add to JSX
<NewSection />
```

3. **Update Navigation** - Add section to navigation arrays in:
   - [components/layout/Navigation.tsx](src/components/layout/Navigation.tsx)
   - [components/layout/MobileMenu.tsx](src/components/layout/MobileMenu.tsx)

### Adding Data

1. **Create Data File** in [data/](src/data/)
```typescript
// src/data/testimonials.ts
export const testimonials = [
  { name: "...", quote: "...", company: "..." }
];
```

2. **Create Type Definition** in [types/index.ts](src/types/index.ts)
```typescript
export interface Testimonial {
  name: string;
  quote: string;
  company: string;
}
```

3. **Import in Component**
```typescript
import { testimonials } from '../../data/testimonials';
```

### Creating Custom Hooks

Place in [hooks/](src/hooks/) directory:
```typescript
// src/hooks/useWindowSize.ts
import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
```

## 🔧 Configuration Files

- **vite.config.ts** - Vite build configuration
- **tsconfig.json** - TypeScript configuration (project references)
- **tsconfig.app.json** - App-specific TypeScript settings
- **tsconfig.node.json** - Node environment TypeScript settings
- **tailwind.config.js** - Tailwind CSS customization
- **postcss.config.js** - PostCSS plugins (Tailwind + Autoprefixer)
- **eslint.config.js** - ESLint rules and plugins

## 📊 Sentry Integration

### Setup
1. Create a Sentry account at [sentry.io](https://sentry.io)
2. Create a new project (React)
3. Copy your DSN
4. Add to `.env`: `VITE_SENTRY_DSN=your-dsn`

### Features
- Automatic error capture
- Performance monitoring
- Custom breadcrumbs for user actions
- Error boundaries with user feedback
- Source maps for production debugging

### Custom Error Tracking
```typescript
import { captureError, captureMessage } from './sentry';

// Capture exceptions
try {
  // risky code
} catch (error) {
  captureError(error, { context: 'custom_context' });
}

// Log messages
captureMessage('User completed checkout', 'info');
```

## 🎨 Styling Approach

### Tailwind Utility Classes
- **Rapid Development** - Build UI without leaving JSX
- **Consistent Design** - Predefined spacing, colors, and sizes
- **Responsive Design** - Mobile-first with breakpoint prefixes
- **No CSS Files** - Styles colocated with components

### Example
```tsx
<button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
  Click Me
</button>
```

## 🔄 CI/CD & Deployment

This project is ready for professional CI/CD implementation. See the **[Complete CI/CD Guide](docs/CI-CD-GUIDE.md)** for:

- ✅ GitHub Actions workflow examples
- ✅ Automated testing, linting, and building
- ✅ Deployment to Vercel, Netlify, or GitHub Pages
- ✅ PR preview deployments
- ✅ Sentry release tracking
- ✅ Security scanning and dependency updates
- ✅ Performance monitoring with Lighthouse

**Quick Start**: Copy the workflow files from the guide to `.github/workflows/` and add your deployment secrets.

## 🚀 Future Enhancements

### Ready to Add
- **React Router** - Multi-page navigation
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Server state management for API calls
- **Vitest** - Unit and integration testing
- **Cypress** - End-to-end testing
- **Contentful/Sanity** - Headless CMS integration

### Scalability Path
1. Add state management (Context API or Zustand)
2. Implement code splitting with React.lazy
3. Add SEO optimizations (meta tags, Open Graph)
4. Set up analytics (Google Analytics, Mixpanel)
5. Implement A/B testing
6. Add internationalization (i18n)

## 📄 License

This project is private and proprietary.

## 👤 Author

**Alex Bramall**
Technical Project Manager

---

**Built with React because it's the framework I work with most** - combining familiarity with modern best practices for a production-ready portfolio solution.
