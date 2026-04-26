// DOM Elements
const nav = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const projectsContainer = document.getElementById('projects-container');

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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Load Projects
let allProjects = [];
let visibleProjectsCount = 3;

async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        allProjects = await response.json();
        
        if (allProjects.length === 0) {
            projectsContainer.innerHTML = `
                <div class="error-state">
                    <h3>No projects found</h3>
                    <p>Check back later for new projects!</p>
                </div>
            `;
            return;
        }
        
        displayProjects();
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsContainer.innerHTML = `
            <div class="error-state">
                <h3>Error loading projects</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Display Projects
function displayProjects() {
    const projectsToShow = allProjects.slice(0, visibleProjectsCount);
    const hasMoreProjects = allProjects.length > visibleProjectsCount;
    
    projectsContainer.innerHTML = projectsToShow.map((project, index) => {
        const featured = project.featured ? 'featured' : '';
        const featuredBadge = project.featured ? '<span class="featured-badge">Featured</span>' : '';
        
        return `
            <div class="project-card ${featured} fade-in" 
                 style="animation-delay: ${index * 0.1}s">
                ${featuredBadge}
                <div class="project-image">
                    ${project.image_path ? 
                        `<img src="${project.image_path.startsWith('http') ? project.image_path : '/static/uploads/' + project.image_path}" 
                             alt="${project.title}">` : 
                        '<div class="no-image">No Image</div>'
                    }
                </div>
                <div class="project-content">
                    <h3 class="project-title">
                        <a href="/project/${project.id}" class="project-title-link">${project.title}</a>
                    </h3>
                    <p class="project-description">${project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description}</p>
                    <div class="project-tech">
                        ${project.tech_stack.slice(0, 3).map(tech => 
                            `<span class="tech-tag">${tech.trim()}</span>`
                        ).join('')}
                        ${project.tech_stack.length > 3 ? `<span class="tech-tag">+${project.tech_stack.length - 3}</span>` : ''}
                    </div>
                    <div class="project-links">
                        ${project.github_link ? 
                            `<a href="${project.github_link}" target="_blank" rel="noopener noreferrer" class="project-link secondary">
                                <i class="fab fa-github"></i> View Code
                            </a>` : ''
                        }
                        ${project.demo_link ? 
                            `<a href="${project.demo_link}" target="_blank" rel="noopener noreferrer" class="project-link">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>` : ''
                        }
                    </div>
                    <button class="btn btn-outline show-more-btn" onclick="toggleProjectDetails(${index})">
                        <i class="fas fa-chevron-down"></i> Show More
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Add Load More button if there are more projects
    if (hasMoreProjects) {
        projectsContainer.innerHTML += `
            <div class="load-more-container">
                <button class="btn btn-primary load-more-btn" onclick="loadMoreProjects()">
                    Load More Projects
                </button>
            </div>
        `;
    }
    
    // Re-observe new elements
    const newElements = projectsContainer.querySelectorAll('.fade-in');
    newElements.forEach(el => observer.observe(el));
}

// Toggle Project Details
function toggleProjectDetails(index) {
    const projectCard = document.querySelectorAll('.project-card')[index];
    const projectContent = projectCard.querySelector('.project-content');
    const showMoreBtn = projectCard.querySelector('.show-more-btn');
    const techStack = projectCard.querySelector('.project-tech');
    
    if (projectContent.style.display === 'none' || !projectContent.style.display) {
        // Show full content
        projectContent.style.display = 'block';
        showMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
        
        // Show full tech stack
        const allTech = allProjects[index].tech_stack.map(tech => 
            `<span class="tech-tag">${tech.trim()}</span>`
        ).join('');
        techStack.innerHTML = allTech;
        
        // Show full description
        const description = projectCard.querySelector('.project-description');
        description.textContent = allProjects[index].description;
    } else {
        // Hide content
        projectContent.style.display = 'none';
        showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More';
        
        // Reset to truncated tech stack
        techStack.innerHTML = allProjects[index].tech_stack.slice(0, 3).map(tech => 
            `<span class="tech-tag">${tech.trim()}</span>`
        ).join('') + (allProjects[index].tech_stack.length > 3 ? `<span class="tech-tag">+${allProjects[index].tech_stack.length - 3}</span>` : '');
        
        // Truncate description
        const description = projectCard.querySelector('.project-description');
        description.textContent = allProjects[index].description.length > 100 ? 
            allProjects[index].description.substring(0, 100) + '...' : 
            allProjects[index].description;
    }
}

// Load More Projects
function loadMoreProjects() {
    visibleProjectsCount += 3;
    displayProjects();
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
    loadProjects();
    
    // Add initial animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

// Add hover effects to thumbnails
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.project-thumbnail')) {
        const thumbnail = e.target.closest('.project-thumbnail');
        thumbnail.style.transform = 'translateY(-12px) scale(1.02)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.project-thumbnail')) {
        const thumbnail = e.target.closest('.project-thumbnail');
        thumbnail.style.transform = 'translateY(0) scale(1)';
    }
});
