import React, { useState, useEffect } from 'react';

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl shadow-xl border-b border-gray-800' 
        : 'bg-gray-900/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="relative group">
            <div className="text-xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              YM
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  activeSection === item.id
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {activeSection === item.id && (
                  <span className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-lg"></span>
                )}
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 group-hover:w-3/4 transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 hover:shadow-lg transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <svg className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-3 animate-slideDown">
            <div className="space-y-1 bg-gray-800/80 backdrop-blur-xl rounded-xl p-3 shadow-xl border border-gray-700">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    activeSection === item.id
                      ? 'bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-200 hover:bg-gray-700'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex items-center justify-between">
                    {item.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Component
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-blue-900 pt-16">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{ transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{ transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)` }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fadeInUp">
          <div className="inline-block mb-3 px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-300">
            👋 Welcome to my portfolio
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Yash Malik
            </span>
          </h1>
          
          <h2 className="text-xl md:text-3xl font-semibold text-gray-100 mb-4">
            MERN Stack Developer & AI Enthusiast
          </h2>
          
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences that blend elegant design with powerful functionality. 
            Specializing in scalable full-stack solutions and innovative data-driven applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#projects"
              className="group relative px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm"
            >
              <span className="relative z-10">Explore My Work</span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold border border-gray-700 hover:border-purple-500 hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full p-1">
          <div className="w-1.5 h-2 bg-linear-to-b from-blue-500 to-purple-500 rounded-full mx-auto animate-scroll"></div>
        </div>
      </a>
    </section>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Get to know me</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
            About Me
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-300 leading-relaxed">
                I'm a passionate MERN Stack Developer currently pursuing my BCA, dedicated to 
                creating impactful digital solutions that merge clean design with robust functionality.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-300 leading-relaxed">
                My journey in tech is driven by curiosity and a commitment to continuous learning. 
                I thrive on solving complex problems and bringing innovative ideas to life through code.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white mb-4">What I Bring</h3>
            
            {[
              { icon: '💻', title: 'Full-Stack Expertise', desc: 'End-to-end development with MERN stack' },
              { icon: '🎨', title: 'Design Sensibility', desc: 'Creating intuitive, beautiful user experiences' },
              { icon: '🚀', title: 'Performance Focus', desc: 'Building scalable, optimized solutions' },
              { icon: '🤝', title: 'Team Collaboration', desc: 'Effective communication and teamwork' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Component
const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
      gradient: "from-blue-500 to-cyan-500",
      icon: "🎨"
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "MySQL", "Python"],
      gradient: "from-green-500 to-emerald-500",
      icon: "⚙️"
    },
    {
      title: "Tools & Deployment",
      skills: ["Git & GitHub", "Render", "Vercel"],
      gradient: "from-purple-500 to-pink-500",
      icon: "🚀"
    },
    {
      title: "Soft Skills",
      skills: ["Communication", "Problem-Solving", "Teamwork", "Research", "Management"],
      gradient: "from-orange-500 to-red-500",
      icon: "🎯"
    }
  ];

  return (
    <section id="skills" className="py-16 bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">My Arsenal</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-gray-900 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-2 group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                <h3 className={`text-lg font-bold bg-linear-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-gray-800 text-gray-300 rounded-md text-xs font-medium hover:scale-105 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Component
const Projects = () => {
  const projects = [
    {
      title: "Consultancy Website",
      description: "Full MERN stack website with Admin Panel and Login system.",
      tech: ["React", "Bootstrap", "JavaScript"],
      githubUrl: "https://github.com/yash936936/Consultancy_Website",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Chatbot Web App",
      description: "Web-based chatbot using REST APIs and image input.",
      tech: ["HTML", "CSS", "JavaScript", "APIs"],
      githubUrl: "https://github.com/yash936936/ChatBot",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "E-Commerce Platform",
      description: "Complete shopping system with auth, product management, and live cart.",
      tech: ["React", "Express", "MongoDB"],
      githubUrl: "https://github.com/yash936936/MERN_ECOMMERCEE",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Chat Application",
      description: "Real-time messaging app using Socket.io and Tailwind CSS.",
      tech: ["React", "Socket.io", "Tailwind CSS"],
      githubUrl: "https://github.com/yash936936/Chat_APP",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Trend Analysis",
      description: "EDA project analyzing consumer shopping patterns.",
      tech: ["Python", "Pandas", "Matplotlib"],
      githubUrl: "https://github.com/yash936936/identifying-shopping-trends-using-data-analysis",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Stock Price Prediction",
      description: "ML model forecasting stock movements using historical data.",
      tech: ["Python", "TensorFlow"],
      githubUrl: "https://github.com/yash936936/Stock-Price-Prediction-Using-Time-Series-Regression",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section id="projects" className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">My Work</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative p-6">
                <div className={`inline-block px-2 py-1 bg-linear-to-r ${project.gradient} rounded-md mb-3`}>
                  <span className="text-white text-xs font-semibold">Featured</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-700 text-gray-200 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 py-2 bg-linear-to-r ${project.gradient} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm`}
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  const contactLinks = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "yashm15082005@gmail.com",
      href: "mailto:yashm15082005@gmail.com",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      title: "LinkedIn",
      value: "Connect with me",
      href: "https://www.linkedin.com/in/yashmalik-/",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      title: "GitHub",
      value: "View my repositories",
      href: "https://github.com/yash936936",
      gradient: "from-gray-700 to-gray-900"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Resume",
      value: "Download CV",
      href: "https://drive.google.com/file/d/1zvtE8aSTT6AGmfx_6WMEG5984xSZ8uj-/view?usp=sharing",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Let's Connect</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm">
            I'm currently seeking internship opportunities to contribute to innovative projects and grow as a developer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-900 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${link.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative flex items-center space-x-3">
                <div className={`p-2 bg-linear-to-br ${link.gradient} rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-1">{link.title}</h3>
                  <p className="text-gray-400 text-xs">{link.value}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-1">Ready to Start a Project?</h3>
              <p className="text-blue-100 text-sm">Looking for internship opportunities in MERN stack development</p>
            </div>
            <a
              href="mailto:yashm15082005@gmail.com"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs mb-3 md:mb-0">
            © 2025 Yash Malik. Crafted with passion and code.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/yash936936" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-xs">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/yashmalik-/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-xs">
              LinkedIn
            </a>
            <a href="mailto:yashm15082005@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-xs">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen transition-colors duration-300 dark">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes scroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-in;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
      
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}