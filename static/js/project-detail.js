// DOM Elements
const nav = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const projectContent = document.getElementById('project-content');
const pageTitle = document.getElementById('page-title');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll Effects
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Get project ID from URL
function getProjectId() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}

// Load Project Details
async function loadProjectDetails() {
    const projectId = getProjectId();
    
    try {
        // First, get all projects to find the one we need
        const response = await fetch('/api/projects');
        const projects = await response.json();
        
        const project = projects.find(p => p.id.toString() === projectId);
        
        if (!project) {
            projectContent.innerHTML = `
                <div class="error-state">
                    <h3>Project not found</h3>
                    <p>The project you're looking for doesn't exist.</p>
                    <a href="/projects" class="btn btn-primary">← Back to Projects</a>
                </div>
            `;
            return;
        }
        
        // Update page title
        pageTitle.textContent = `${project.title} - Navadeep's Portfolio`;
        
        // Render project details
        projectContent.innerHTML = `
            <div class="project-detail-header fade-in">
                <div class="project-banner">
                    ${project.image_path ? 
                        `<img src="${project.image_path.startsWith('http') ? project.image_path : '/static/uploads/' + project.image_path}" 
                             alt="${project.title}">` : 
                        '<div class="no-image">No Image Available</div>'
                    }
                </div>
                <div class="project-info-section">
                    <div class="project-header-info">
                        ${project.featured ? '<div class="featured-badge">Featured Project</div>' : ''}
                        <h1 class="project-title">${project.title}</h1>
                        <p class="project-description">${project.description}</p>
                    </div>
                </div>
            </div>
            
            <div class="project-tech-section fade-in" style="animation-delay: 0.2s">
                <h2 class="section-title">
                    <i class="fas fa-tools"></i>
                    Technologies Used
                </h2>
                <div class="tech-grid">
                    ${project.tech_stack.map(tech => `
                        <div class="tech-item">
                            <div class="tech-icon">
                                ${getTechIcon(tech.trim())}
                            </div>
                            <span class="tech-name">${tech.trim()}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="project-links-section fade-in" style="animation-delay: 0.4s">
                <h2 class="section-title">
                    <i class="fas fa-external-link-alt"></i>
                    Project Links
                </h2>
                <div class="project-links">
                    ${project.github_link ? 
                        `<a href="${project.github_link}" target="_blank" rel="noopener noreferrer" class="project-link secondary">
                            <i class="fab fa-github"></i>
                            View Source Code
                        </a>` : ''
                    }
                    ${project.demo_link ? 
                        `<a href="${project.demo_link}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <i class="fas fa-play"></i>
                            View Live Demo
                        </a>` : ''
                    }
                </div>
            </div>
        `;
        
        // Add animations after content is loaded
        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
        
    } catch (error) {
        console.error('Error loading project details:', error);
        projectContent.innerHTML = `
            <div class="error-state">
                <h3>Error loading project</h3>
                <p>Please try again later.</p>
                <a href="/projects" class="btn btn-primary">← Back to Projects</a>
            </div>
        `;
    }
}

// Get appropriate icon for technology
function getTechIcon(tech) {
    const techLower = tech.toLowerCase();
    
    // Map technologies to Font Awesome icons
    const iconMap = {
        'react': '<i class="fab fa-react"></i>',
        'javascript': '<i class="fab fa-js"></i>',
        'html': '<i class="fab fa-html5"></i>',
        'css': '<i class="fab fa-css3-alt"></i>',
        'python': '<i class="fab fa-python"></i>',
        'flask': '<i class="fas fa-flask"></i>',
        'node.js': '<i class="fab fa-node-js"></i>',
        'nodejs': '<i class="fab fa-node-js"></i>',
        'mongodb': '<i class="fas fa-database"></i>',
        'mysql': '<i class="fas fa-database"></i>',
        'git': '<i class="fab fa-git-alt"></i>',
        'docker': '<i class="fab fa-docker"></i>',
        'firebase': '<i class="fas fa-fire"></i>',
        'angular': '<i class="fab fa-angular"></i>',
        'vue': '<i class="fab fa-vuejs"></i>',
        'bootstrap': '<i class="fab fa-bootstrap"></i>',
        'tailwind': '<i class="fas fa-wind"></i>',
        'sass': '<i class="fab fa-sass"></i>',
        'webpack': '<i class="fas fa-cube"></i>',
        'express': '<i class="fas fa-server"></i>',
        'django': '<i class="fas fa-server"></i>',
        'postgresql': '<i class="fas fa-database"></i>',
        'redis': '<i class="fas fa-database"></i>',
        'aws': '<i class="fab fa-aws"></i>',
        'google cloud': '<i class="fab fa-google"></i>',
        'azure': '<i class="fab fa-microsoft"></i>',
        'heroku': '<i class="fab fa-heroku"></i>',
        'netlify': '<i class="fas fa-globe"></i>',
        'vercel': '<i class="fas fa-bolt"></i>'
    };
    
    return iconMap[techLower] || '<i class="fas fa-code"></i>';
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetails();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.location.href = '/projects';
    }
});
