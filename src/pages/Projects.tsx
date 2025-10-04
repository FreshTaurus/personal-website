import React from 'react';
import { ExternalLink, Github, Code, Database, Smartphone, Globe } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: 'web' | 'mobile' | 'data' | 'other';
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with user authentication, payment processing, and admin dashboard.',
      longDescription: 'A comprehensive e-commerce platform built with React and Node.js, featuring user authentication, product management, shopping cart functionality, and integrated payment processing. Includes an admin dashboard for inventory management and order tracking.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'JWT', 'TailwindCSS'],
      category: 'web',
      githubUrl: 'https://github.com/yourusername/ecommerce-platform',
      demoUrl: 'https://your-ecommerce-demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team collaboration features.',
      longDescription: 'A modern task management application that allows teams to collaborate on projects with real-time updates, drag-and-drop functionality, and advanced filtering options. Built with a focus on user experience and performance.',
      techStack: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Redis', 'Docker'],
      category: 'web',
      githubUrl: 'https://github.com/yourusername/task-manager',
      demoUrl: 'https://your-taskmanager-demo.com',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Forecast Mobile App',
      description: 'Cross-platform mobile application providing detailed weather forecasts and location-based alerts.',
      longDescription: 'A React Native mobile application that provides accurate weather forecasts, location-based alerts, and beautiful weather visualizations. Features include 7-day forecasts, hourly predictions, and severe weather notifications.',
      techStack: ['React Native', 'TypeScript', 'Weather API', 'Redux', 'AsyncStorage'],
      category: 'mobile',
      githubUrl: 'https://github.com/yourusername/weather-app',
      featured: true
    },
    {
      id: 4,
      title: 'Data Analysis Dashboard',
      description: 'Interactive dashboard for analyzing sales data with customizable charts and real-time insights.',
      longDescription: 'A powerful data visualization dashboard that processes large datasets and presents insights through interactive charts and graphs. Features include real-time data updates, custom filtering, and exportable reports.',
      techStack: ['Python', 'Pandas', 'Plotly', 'Flask', 'SQLite', 'Bootstrap'],
      category: 'data',
      githubUrl: 'https://github.com/yourusername/data-dashboard',
      demoUrl: 'https://your-dashboard-demo.com',
      featured: false
    },
    {
      id: 5,
      title: 'Social Media API',
      description: 'RESTful API for social media platform with user management, posts, and real-time messaging.',
      longDescription: 'A scalable RESTful API built with Node.js and Express, featuring user authentication, post management, real-time messaging, and file upload capabilities. Includes comprehensive API documentation and testing suite.',
      techStack: ['Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Multer'],
      category: 'web',
      githubUrl: 'https://github.com/yourusername/social-api',
      featured: false
    },
    {
      id: 6,
      title: 'Algorithm Visualizer',
      description: 'Interactive web application for visualizing sorting and searching algorithms with step-by-step animations.',
      longDescription: 'An educational web application that helps students understand algorithms through interactive visualizations. Features include step-by-step animations, speed controls, and explanations for various sorting and searching algorithms.',
      techStack: ['React', 'JavaScript', 'D3.js', 'CSS3', 'HTML5'],
      category: 'web',
      githubUrl: 'https://github.com/yourusername/algorithm-visualizer',
      demoUrl: 'https://your-algorithm-demo.com',
      featured: false
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <Globe className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'data':
        return <Database className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'mobile':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'data':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of projects showcasing my skills in full-stack development, 
            mobile applications, and data analysis.
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                  <div className="text-6xl text-primary-400">💻</div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(project.category)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <div className="text-4xl text-gray-400">📱</div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(project.category)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded transition-colors duration-200"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Interested in Collaborating?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I'm always open to discussing new projects and opportunities.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
