# Personal Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and TailwindCSS. Perfect for Computer Science students and job seekers.

## Features

- 🎨 **Modern Design**: Clean, professional design with dark mode support
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast**: Built with React and TypeScript for optimal performance
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 🖼️ **Photo Gallery**: Interactive gallery with lightbox functionality
- 📧 **Contact Form**: Functional contact form with validation
- 🚀 **SEO Ready**: Optimized for search engines

## Pages

- **Home**: Professional introduction and skills overview
- **About Me**: Detailed information about education, skills, and career goals
- **Projects**: Showcase of technical projects with GitHub links
- **Gallery**: Personal photos with category filtering and lightbox
- **Contact**: Contact form and social media links

## Customization Guide

### 1. Personal Information

Update the following files with your personal information:

#### Home Page (`src/pages/Home.tsx`)
- Change "Your Name" to your actual name
- Update the introduction text
- Modify the skills and technologies listed

#### About Page (`src/pages/About.tsx`)
- Update your name and title
- Add your actual education details
- Replace the placeholder headshot with your professional photo
- Update technical skills and interests
- Customize the personal statement

#### Contact Page (`src/pages/Contact.tsx`)
- Update email address
- Add your phone number
- Update location
- Add your actual GitHub and LinkedIn URLs

### 2. Projects

Edit `src/pages/Projects.tsx` to showcase your actual projects:

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: 'Your Project Title',
    description: 'Brief description of your project',
    longDescription: 'Detailed description of your project',
    techStack: ['React', 'Node.js', 'MongoDB'],
    category: 'web',
    githubUrl: 'https://github.com/yourusername/your-project',
    demoUrl: 'https://your-demo-url.com',
    featured: true
  },
  // Add more projects...
];
```

### 3. Photo Gallery

Update `src/pages/Gallery.tsx` with your actual photos:

```typescript
const photos: Photo[] = [
  {
    id: 1,
    src: '/path/to/your/photo.jpg',
    alt: 'Description of your photo',
    caption: 'Caption for your photo',
    category: 'Work'
  },
  // Add more photos...
];
```

### 4. Styling

The website uses TailwindCSS for styling. You can customize:

- **Colors**: Update the color scheme in `tailwind.config.js`
- **Fonts**: Change fonts in `src/index.css`
- **Layout**: Modify component layouts in individual page files

### 5. Logo

Replace the placeholder logo in `src/components/Layout.tsx`:

```tsx
<div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-lg">P</span> {/* Replace with your logo */}
</div>
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript for better development experience
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **React Router**: Client-side routing for single-page application
- **Lucide React**: Beautiful, customizable SVG icons
- **Responsive Design**: Mobile-first approach with TailwindCSS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The website can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Zero-config deployment with excellent performance
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable cloud hosting

## Contributing

Feel free to fork this project and customize it for your own portfolio!

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding!** 🚀