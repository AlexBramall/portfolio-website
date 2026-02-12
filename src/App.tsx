import React, { useState, useEffect } from 'react';
import * as Sentry from "@sentry/react";
import { captureError, captureMessage, setCustomTags } from './sentry';
import ErrorFallback from './components/ErrorFallback';
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Briefcase,
  Code,
  Database,
  Globe,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

const AppContent = Sentry.withProfiler(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Set custom tags for better error tracking
    setCustomTags({
      page: 'portfolio',
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    });

    // Log page load
    captureMessage('Portfolio page loaded', 'info');

    const handleScroll = () => {
      try {
        const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      } catch (error) {
        captureError(error as Error, { context: 'scroll_handler' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Track navigation events
        Sentry.addBreadcrumb({
          message: `Navigated to section: ${sectionId}`,
          category: 'navigation',
          level: 'info',
        });
      } else {
        captureMessage(`Section not found: ${sectionId}`, 'warning');
      }
    } catch (error) {
      captureError(error as Error, { context: 'scroll_to_section', sectionId });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "Spanx Hydrogen Migration",
      description: "Led a comprehensive cloud migration project for a Fortune 500 company, transitioning 200+ applications to AWS while maintaining 99.9% uptime.",
      technologies: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      metrics: {
        timeline: "18 months",
        team: "25 engineers",
        savings: "$2M annually"
      },
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Digital Transformation Platform",
      description: "Orchestrated the development of a unified digital platform serving 50,000+ daily users across multiple business units.",
      technologies: ["React", "Node.js", "MongoDB", "Microservices"],
      metrics: {
        timeline: "24 months",
        team: "40 engineers",
        users: "50K+ DAU"
      },
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "AI-Powered Analytics Suite",
      description: "Managed the creation of an advanced analytics platform leveraging machine learning to provide real-time business insights.",
      technologies: ["Python", "TensorFlow", "Apache Spark", "Tableau"],
      metrics: {
        timeline: "15 months",
        team: "18 engineers",
        efficiency: "40% improvement"
      },
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Mobile Banking Redesign",
      description: "Spearheaded the complete redesign of a mobile banking application, improving user experience and security protocols.",
      technologies: ["React Native", "Firebase", "OAuth", "Biometrics"],
      metrics: {
        timeline: "12 months",
        team: "15 engineers",
        satisfaction: "4.8/5 rating"
      },
      image: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const skills = [
    { name: "Project Management", level: 95, icon: <Target className="w-5 h-5" /> },
    { name: "Agile/Scrum", level: 90, icon: <Zap className="w-5 h-5" /> },
    { name: "Technical Architecture", level: 85, icon: <Code className="w-5 h-5" /> },
    { name: "Cloud Platforms", level: 88, icon: <Globe className="w-5 h-5" /> },
    { name: "Team Leadership", level: 92, icon: <Users className="w-5 h-5" /> },
    { name: "Stakeholder Management", level: 94, icon: <Briefcase className="w-5 h-5" /> },
    { name: "Data Analytics", level: 80, icon: <Database className="w-5 h-5" /> },
    { name: "Risk Management", level: 87, icon: <Award className="w-5 h-5" /> }
  ];

  const experience = [
    {
      year: "2022 - Present",
      role: "Senior Program Manager",
      company: "Form Facory",
      achievements: [
        "Led 15+ enterprise-level projects with combined budget of $50M+",
        "Implemented agile methodologies, improving delivery speed by 35%",
        "Built and managed cross-functional teams of 100+ professionals"
      ]
    },
    {
      year: "2017 - 2020",
      role: "Technical Project Manager",
      company: "Innovation Labs Inc.",
      achievements: [
        "Managed digital transformation initiatives for Fortune 500 clients",
        "Delivered 12 major projects on time and within budget",
        "Established PMO standards and best practices"
      ]
    },
    {
      year: "2014 - 2017",
      role: "Senior Business Analyst",
      company: "DataDriven Corp",
      achievements: [
        "Analyzed business requirements for complex technical solutions",
        "Facilitated stakeholder workshops and requirement gathering sessions",
        "Contributed to $10M+ revenue growth through process optimization"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-slate-800">
              Alex Bramall
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === section 
                      ? 'text-emerald-600 font-medium' 
                      : 'text-gray-600 hover:text-slate-800'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-slate-800 capitalize w-full text-left"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
              alt="Alex Bramall"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-xl"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
              Alex Bramall
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 mb-8">
              Technical Project Manager
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transforming complex technical challenges into successful outcomes. 
              With 10+ years of experience leading cross-functional teams and delivering 
              enterprise-scale solutions that drive business value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Get In Touch
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="animate-bounce">
            <ChevronDown 
              className="w-8 h-8 text-gray-400 mx-auto cursor-pointer" 
              onClick={() => scrollToSection('about')}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">About Me</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Passionate about bridging the gap between technology and business objectives
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Leadership Philosophy</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                I believe in empowering teams to achieve extraordinary results through clear communication, 
                strategic thinking, and adaptive leadership. My approach combines technical expertise with 
                human-centered management to deliver solutions that exceed expectations.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800">50+ Projects</h4>
                  <p className="text-sm text-gray-600">Successfully delivered</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800">100+ Team Members</h4>
                  <p className="text-sm text-gray-600">Led and mentored</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  "Certified PMP and Scrum Master with advanced certifications",
                  "Expert in Agile, Waterfall, and hybrid project methodologies",
                  "Proven track record of delivering projects on time and within budget",
                  "Strong background in cloud technologies and digital transformation"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Core Competencies</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A comprehensive skill set built through years of hands-on experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-emerald-600">
                      {skill.icon}
                    </div>
                    <h3 className="font-semibold text-slate-800">{skill.name}</h3>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Showcasing impactful projects that demonstrate strategic thinking and execution excellence
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                      </div>
                      <p className="text-sm font-medium text-slate-800">{project.metrics.timeline}</p>
                      <p className="text-xs text-gray-500">Timeline</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-gray-400 mr-1" />
                      </div>
                      <p className="text-sm font-medium text-slate-800">{project.metrics.team}</p>
                      <p className="text-xs text-gray-500">Team Size</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="w-4 h-4 text-gray-400 mr-1" />
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        {project.metrics.savings || project.metrics.users || project.metrics.efficiency || project.metrics.satisfaction}
                      </p>
                      <p className="text-xs text-gray-500">Impact</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Professional Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A decade of progressive growth in technical project management
            </p>
          </div>
          
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{job.role}</h3>
                    <p className="text-emerald-600 font-medium">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mt-2 md:mt-0">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">{job.year}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {job.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Let's Connect</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to discuss your next project or opportunity? I'd love to hear from you.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-xl text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Drop me a line anytime</p>
              <a
                href="mailto:alex.Bramall@email.com"
                className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                alex.Bramall@email.com
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Linkedin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">LinkedIn</h3>
              <p className="text-gray-600 mb-4">Connect professionally</p>
              <a
                href="https://linkedin.com/in/alexBramall"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                View Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Location</h3>
              <p className="text-gray-600 mb-4">Available for remote work</p>
              <p className="text-purple-600 font-medium">San Francisco, CA</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Start a Conversation?</h3>
              <p className="text-gray-600 mb-6">
                Whether you're looking for a technical project manager, consultant, or collaboration partner, 
                I'm always interested in discussing innovative projects and opportunities.
              </p>
              <a
                href="mailto:alex.Bramall@email.com"
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 inline-flex items-center gap-2"
              >
                Schedule a Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Alex Bramall</h3>
              <p className="text-gray-400">Technical Project Manager</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="mailto:alex.Bramall@email.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/alexBramall" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/alexBramall" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Alex Bramall. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
});

// Wrap the entire app with Sentry's error boundary
const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog>
      <AppContent />
    </Sentry.ErrorBoundary>
  );
};

export default App;