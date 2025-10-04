import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Types for CMS data
export interface CMSData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    graduationYear: string;
    bio: string;
    intro: string;
    personalStatement: string;
  };
  projects: Array<{
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
  }>;
  gallery: Array<{
    id: number;
    src: string;
    alt: string;
    caption: string;
    category: string;
  }>;
  skills: {
    programmingLanguages: string[];
    webDevelopment: string[];
    databases: string[];
    tools: string[];
  };
  interests: string[];
}

// Default data structure
const defaultCMSData: CMSData = {
  personalInfo: {
    name: "Your Name",
    title: "Computer Science Student",
    location: "New York, NY",
    graduationYear: "2025",
    bio: "Passionate Computer Science student with a drive to create innovative solutions and make a positive impact through technology.",
    intro: "Computer Science Student at BMCC, aspiring to transfer to Columbia University",
    personalStatement: "As a Computer Science student, I believe in the power of technology to solve real-world problems. My journey in programming started with curiosity and has evolved into a passion for creating efficient, user-friendly applications. I'm committed to continuous learning and staying updated with the latest technologies while contributing to meaningful projects that make a difference in people's lives."
  },
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with user authentication, payment processing, and admin dashboard.",
      longDescription: "A comprehensive e-commerce platform built with React and Node.js, featuring user authentication, product management, shopping cart functionality, and integrated payment processing. Includes an admin dashboard for inventory management and order tracking.",
      techStack: ["React", "Node.js", "MongoDB", "Stripe API", "JWT", "TailwindCSS"],
      category: "web",
      githubUrl: "https://github.com/yourusername/ecommerce-platform",
      demoUrl: "https://your-ecommerce-demo.com",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      longDescription: "A modern task management application that allows teams to collaborate on projects with real-time updates, drag-and-drop functionality, and advanced filtering options. Built with a focus on user experience and performance.",
      techStack: ["React", "TypeScript", "Socket.io", "PostgreSQL", "Redis", "Docker"],
      category: "web",
      githubUrl: "https://github.com/yourusername/task-manager",
      demoUrl: "https://your-taskmanager-demo.com",
      featured: true
    }
  ],
  gallery: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      alt: "Coding workspace",
      caption: "My coding setup where I spend hours building projects and learning new technologies.",
      category: "Work"
    }
  ],
  skills: {
    programmingLanguages: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"],
    webDevelopment: ["React", "Node.js", "Express", "HTML5", "CSS3", "TailwindCSS"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    tools: ["Git", "Docker", "AWS", "Linux", "VS Code", "Figma"]
  },
  interests: [
    "Full-Stack Development",
    "Machine Learning",
    "Data Structures & Algorithms",
    "Mobile App Development",
    "Cloud Computing",
    "Open Source Contribution"
  ]
};

interface CMSContextType {
  data: CMSData;
  isEditMode: boolean;
  isAuthenticated: boolean;
  setData: (data: CMSData) => void;
  updatePersonalInfo: (updates: Partial<CMSData['personalInfo']>) => void;
  updateProject: (id: number, updates: Partial<CMSData['projects'][0]>) => void;
  addProject: (project: Omit<CMSData['projects'][0], 'id'>) => void;
  deleteProject: (id: number) => void;
  updateGalleryItem: (id: number, updates: Partial<CMSData['gallery'][0]>) => void;
  addGalleryItem: (item: Omit<CMSData['gallery'][0], 'id'>) => void;
  deleteGalleryItem: (id: number) => void;
  updateSkills: (category: keyof CMSData['skills'], skills: string[]) => void;
  updateInterests: (interests: string[]) => void;
  toggleEditMode: () => void;
  authenticate: (password: string) => boolean;
  saveData: () => void;
  loadData: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

interface CMSProviderProps {
  children: ReactNode;
}

export const CMSProvider: React.FC<CMSProviderProps> = ({ children }) => {
  const [data, setData] = useState<CMSData>(defaultCMSData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Admin password (you can change this)
  const ADMIN_PASSWORD = "admin123";

  // Load data from localStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const savedData = localStorage.getItem('cms-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Error loading CMS data:', error);
    }
  };

  const saveData = useCallback(() => {
    try {
      localStorage.setItem('cms-data', JSON.stringify(data));
      console.log('CMS data saved successfully');
    } catch (error) {
      console.error('Error saving CMS data:', error);
    }
  }, [data]);

  const authenticate = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const toggleEditMode = () => {
    if (!isAuthenticated) {
      const password = prompt('Enter admin password:');
      if (password && authenticate(password)) {
        setIsEditMode(true);
      }
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  const updatePersonalInfo = (updates: Partial<CMSData['personalInfo']>) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates }
    }));
  };

  const updateProject = (id: number, updates: Partial<CMSData['projects'][0]>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    }));
  };

  const addProject = (project: Omit<CMSData['projects'][0], 'id'>) => {
    const newId = Math.max(...data.projects.map(p => p.id), 0) + 1;
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: newId }]
    }));
  };

  const deleteProject = (id: number) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const updateGalleryItem = (id: number, updates: Partial<CMSData['gallery'][0]>) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const addGalleryItem = (item: Omit<CMSData['gallery'][0], 'id'>) => {
    const newId = Math.max(...data.gallery.map(i => i.id), 0) + 1;
    setData(prev => ({
      ...prev,
      gallery: [...prev.gallery, { ...item, id: newId }]
    }));
  };

  const deleteGalleryItem = (id: number) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(item => item.id !== id)
    }));
  };

  const updateSkills = (category: keyof CMSData['skills'], skills: string[]) => {
    setData(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: skills }
    }));
  };

  const updateInterests = (interests: string[]) => {
    setData(prev => ({
      ...prev,
      interests
    }));
  };

  // Auto-save when data changes
  useEffect(() => {
    if (isAuthenticated) {
      saveData();
    }
  }, [data, isAuthenticated, saveData]);

  const value: CMSContextType = {
    data,
    isEditMode,
    isAuthenticated,
    setData,
    updatePersonalInfo,
    updateProject,
    addProject,
    deleteProject,
    updateGalleryItem,
    addGalleryItem,
    deleteGalleryItem,
    updateSkills,
    updateInterests,
    toggleEditMode,
    authenticate,
    saveData,
    loadData
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
};
