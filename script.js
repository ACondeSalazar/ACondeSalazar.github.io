// Portfolio JavaScript - Interactive Features
class Portfolio {
    constructor() {
        this.config = PORTFOLIO_CONFIG;
        this.init();
        this.setupEventListeners();
        // Typewriter effect removed for cleaner design
        this.setupParallax();
        this.loadConfigurableContent();
    }

    init() {
        this.currentSection = 'projects';
        
        // Initialize loading animation
        this.animatePageLoad();
        
        // Apply theme configuration
        this.applyThemeConfig();
    }

    loadConfigurableContent() {
        // Update page title and meta
        document.title = this.config.meta.title;
        
        // Update personal info in terminal
        const nameElement = document.querySelector('.output h1');
        const subtitleElement = document.querySelector('.subtitle');
        if (nameElement) nameElement.textContent = this.config.personal.name;
        if (subtitleElement) subtitleElement.textContent = this.config.personal.title;
        
        // Update internship banner
        this.updateInternshipBanner();
        
        // Generate projects dynamically
        this.generateProjects();
        
        // Update about section
        this.updateAboutSection();
        
        // Update contact links
        this.updateContactSection();
    }

    updateInternshipBanner() {
        const internshipBanner = document.getElementById('internship-banner');
        const internshipText = document.getElementById('internship-text');
        
        if (this.config.personal.internshipMessage && this.config.personal.internshipMessage.show) {
            if (internshipBanner && internshipText) {
                internshipText.textContent = this.config.personal.internshipMessage.text;
                internshipBanner.style.display = 'flex';
            }
        } else if (internshipBanner) {
            internshipBanner.style.display = 'none';
        }
    }

    generateProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = '';
        
        this.config.projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });
    }

    createProjectCard(project, index) {
        const article = document.createElement('article');
        article.className = 'project-card';
        article.setAttribute('data-tech', project.technologies[0]);
        
        article.innerHTML = `
            <div class="project-image">
                <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <button class="btn-view" data-project="${project.id}">
                        View Details
                    </button>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.shortDescription}</p>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        // Add event listeners for the new card
        const btnView = article.querySelector('.btn-view');
        btnView.addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigateToProject(project.id);
        });
        
        // Make entire card clickable
        article.addEventListener('click', (e) => {
            // Don't trigger if clicking on the button (handled separately above)
            if (!e.target.closest('.btn-view')) {
                this.navigateToProject(project.id);
            }
        });
        
        // Hover animations completely disabled for clean design
        
        return article;
    }

    updateAboutSection() {
        // Update profile information in professional layout
        const profile = this.config.personal.profile;
        
        // Update name
        const nameElement = document.getElementById('profile-name');
        if (nameElement) nameElement.textContent = this.config.personal.name;
        
        // Update interests
        const interestsElement = document.getElementById('profile-interests');
        if (interestsElement && profile.interests) {
            interestsElement.innerHTML = profile.interests
                .map(interest => `<li>${interest}</li>`)
                .join('');
        }
        
        // Update languages
        const languagesElement = document.getElementById('profile-languages');
        if (languagesElement && profile.skills.languages) {
            languagesElement.innerHTML = profile.skills.languages
                .map(lang => `<li>${lang}</li>`)
                .join('');
        }
        
        // Update tools
        const toolsElement = document.getElementById('profile-tools');
        if (toolsElement && profile.skills.tools) {
            toolsElement.innerHTML = profile.skills.tools
                .map(tool => `<li>${tool}</li>`)
                .join('');
        }
        
        // Update education
        const educationElement = document.getElementById('profile-education');
        if (educationElement && profile.education) {
            educationElement.innerHTML = `
                <p><strong>${profile.education.degree}</strong></p>
                <p>${profile.education.at}</p>
                <p><em>${profile.education.status}</em></p>
            `;
        }
        
        // Update about text
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            const greeting = aboutText.querySelector('h3');
            if (greeting) greeting.textContent = this.config.personal.bio.greeting;
            
            // Remove existing paragraphs
            const existingPs = aboutText.querySelectorAll('p');
            existingPs.forEach(p => p.remove());
            
            // Add new paragraphs
            this.config.personal.bio.description.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                aboutText.appendChild(p);
            });
        }
    }

    updateContactSection() {
        const contactGrid = document.querySelector('.contact-grid');
        if (!contactGrid) return;
        
        contactGrid.innerHTML = '';
        
        // GitHub
        if (this.config.social.github) {
            contactGrid.appendChild(this.createContactCard('fab fa-github', 'GitHub', 'Check out my code', this.config.social.github));
        }
        
        // LinkedIn
        if (this.config.social.linkedin) {
            contactGrid.appendChild(this.createContactCard('fab fa-linkedin', 'LinkedIn', 'Professional network', this.config.social.linkedin));
        }
        
        // Email
        if (this.config.personal.email) {
            contactGrid.appendChild(this.createContactCard('fas fa-envelope', 'Email', 'Contact me !', `mailto:${this.config.personal.email}`));
        }
        
        if (this.config.personal.resume) {
            contactGrid.appendChild(this.createContactCard('fas fa-file-pdf', 'Resume', 'Download', this.config.personal.resume));
        }

    }

    createContactCard(iconClass, title, description, href) {
        const card = document.createElement('a');
        card.className = 'contact-card';
        card.href = href;
        if (href.startsWith('http')) {
            card.target = '_blank';
        }
        
        card.innerHTML = `
            <i class="${iconClass}"></i>
            <h3>${title}</h3>
            <p>${description}</p>
        `;
        
        return card;
    }

    applyThemeConfig() {
        if (!this.config.theme.effects.matrixRain) {
            // Disable matrix rain effect
            const matrixBg = document.querySelector('.matrix-bg');
            if (matrixBg) matrixBg.style.display = 'none';
        }
        
        if (!this.config.theme.effects.smoothScrolling) {
            document.documentElement.style.scrollBehavior = 'auto';
        }
        
        // Apply custom colors if needed
        this.applyCustomColors();
    }

    applyCustomColors() {
        const root = document.documentElement;
        const colors = this.config.theme.colors;
        
        root.style.setProperty('--primary-bg', colors.primary);
        root.style.setProperty('--secondary-bg', colors.secondary);
        root.style.setProperty('--accent-bg', colors.accent);
        root.style.setProperty('--terminal-bg', colors.terminal);
        root.style.setProperty('--matrix-green', '#666666');
        root.style.setProperty('--neon-blue', colors.neonBlue);
        root.style.setProperty('--neon-purple', colors.neonPurple);
        root.style.setProperty('--text-primary', colors.textPrimary);
        root.style.setProperty('--text-secondary', colors.textSecondary);
        root.style.setProperty('--text-muted', colors.textMuted);
        root.style.setProperty('--border-color', colors.border);
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        // Project cards
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = e.currentTarget.dataset.project;
                this.navigateToProject(projectId);
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Project card hover effects completely disabled for clean design
    }

    switchSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        this.currentSection = sectionId;
        
        // Trigger section-specific animations
        this.animateSection(sectionId);
    }

    animateSection(sectionId) {
        const section = document.getElementById(sectionId);
        
        switch(sectionId) {
            case 'projects':
                this.animateProjectsGrid();
                break;
            case 'about':
                // Code block animation removed to prevent corruption when switching tabs quickly
                this.animateContactCards(); // Now part of about section
                break;
        }
    }

    animateProjectsGrid() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            // All cards appear instantly - no staggered animation
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    // Code block animation removed to prevent text corruption when switching tabs quickly

    animateContactCards() {
        const cards = document.querySelectorAll('.about-text .contact-card');
        cards.forEach((card, index) => {
            // All contact cards appear instantly - no staggered animation
            card.style.opacity = '1';
            card.style.transform = 'scale(1) rotateY(0deg)';
        });
    }

    animateCardHover(card, isHover) {
        const overlay = card.querySelector('.project-overlay');
        const image = card.querySelector('.project-image img');
        const info = card.querySelector('.project-info');
        
        if (isHover) {
            // No effects - completely clean hover
        } else {
            // No effects needed
        }
    }

    // Removed glitch effect functions - replaced with smooth animations

    navigateToProject(projectId) {
        window.location.href = `project-detail.html?project=${projectId}`;
    }

    // Removed old modal methods - now using dedicated project pages

    // Typewriter effect removed for cleaner design

    typeWriter(element, text, speed) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(type, 500);
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.matrix-bg');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    animatePageLoad() {
        // Loading sequence
        const loadingBar = document.querySelector('.loading-progress');
        const terminalWindow = document.querySelector('.terminal-window');
        
        // Start loading animation
        if (loadingBar) {
            loadingBar.classList.add('animate');
            
            // Complete loading animation
            setTimeout(() => {
                loadingBar.classList.remove('animate');
                loadingBar.classList.add('complete');
            }, 2500);
        }
        
        // Terminal window loads instantly - no animation
        terminalWindow.style.opacity = '1';
        terminalWindow.style.transform = 'scale(1) translateY(0)';

        // Matrix background effect removed for cleaner design
    }

    // Matrix rain effect removed for cleaner design

    // Removed old getProjectData method - now using config system
}

// Matrix effect removed for cleaner design

// Particle system for interactive effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.setupMouseTracking();
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Create particles on mouse move
            if (Math.random() > 0.9) {
                this.createParticle(this.mouse.x, this.mouse.y);
            }
        });
    }

    createParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            decay: 0.02,
            size: Math.random() * 3 + 1
        };
        
        this.particles.push(particle);
        
        // Limit particle count
        if (this.particles.length > 50) {
            this.particles.shift();
        }
    }

    update() {
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    
    // Add some extra interactive effects - matrix effect removed for cleaner design
    const particleSystem = new ParticleSystem();
    
    // Update particle system
    setInterval(() => {
        particleSystem.update();
    }, 16);
    
    // All hover effects removed for instant, snappy response
    const style = document.createElement('style');
    style.textContent = `
        /* All transitions and animations removed for instant response */
        *, *::before, *::after {
            transition: none !important;
            animation: none !important;
            transform: none !important;
        }
    `;
    document.head.appendChild(style);
});

// Instant scrolling for snappy response
document.documentElement.style.scrollBehavior = 'auto';

// Enhanced intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .contact-card, .code-block');
    animatedElements.forEach(el => observer.observe(el));
});