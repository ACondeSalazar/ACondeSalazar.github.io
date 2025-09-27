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
                        <i class="fas fa-eye"></i> View Details
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
        
        article.addEventListener('mouseenter', () => {
            this.animateCardHover(article, true);
        });
        
        article.addEventListener('mouseleave', () => {
            this.animateCardHover(article, false);
        });
        
        return article;
    }

    updateAboutSection() {
        // Update profile JSON
        const codeBlock = document.querySelector('.code-block pre code');
        if (codeBlock) {
            const profileJson = JSON.stringify(this.config.personal.profile, null, 2);
            codeBlock.textContent = profileJson;
            // Removed typewriter effect to prevent corruption when switching tabs quickly
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
            contactGrid.appendChild(this.createContactCard('fas fa-envelope', 'Email', 'Get in touch', `mailto:${this.config.personal.email}`));
        }
        
        // Resume
        if (this.config.personal.resume) {
            contactGrid.appendChild(this.createContactCard('fas fa-file-pdf', 'Resume', 'Download CV', this.config.personal.resume));
        }
        
        // Optional social links
        if (this.config.social.artstation) {
            contactGrid.appendChild(this.createContactCard('fab fa-artstation', 'ArtStation', 'View my art', this.config.social.artstation));
        }
        
        if (this.config.social.youtube) {
            contactGrid.appendChild(this.createContactCard('fab fa-youtube', 'YouTube', 'Watch tutorials', this.config.social.youtube));
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
        root.style.setProperty('--matrix-green', colors.matrixGreen);
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

        // Project card hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });
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
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Code block animation removed to prevent text corruption when switching tabs quickly

    animateContactCards() {
        const cards = document.querySelectorAll('.about-text .contact-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8) rotateY(20deg)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'scale(1) rotateY(0deg)';
            }, index * 150);
        });
    }

    animateCardHover(card, isHover) {
        const overlay = card.querySelector('.project-overlay');
        const image = card.querySelector('.project-image img');
        const info = card.querySelector('.project-info');
        
        if (isHover) {
            // Smooth glow effect instead of glitch
            card.style.filter = 'drop-shadow(0 0 20px rgba(0, 255, 65, 0.4))';
            info.style.transform = 'translateY(-2px)';
        } else {
            card.style.filter = '';
            info.style.transform = 'translateY(0)';
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
        
        // Animate terminal window appearance
        terminalWindow.style.opacity = '0';
        terminalWindow.style.transform = 'scale(0.8) translateY(-50px)';
        
        setTimeout(() => {
            terminalWindow.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            terminalWindow.style.opacity = '1';
            terminalWindow.style.transform = 'scale(1) translateY(0)';
        }, 200);

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
    
    // Add smooth hover effects
    const style = document.createElement('style');
    style.textContent = `
        .project-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-card:hover {
            filter: drop-shadow(0 0 25px rgba(0, 255, 65, 0.3));
        }
        
        .project-info {
            transition: all 0.3s ease;
        }
        
        .nav-item:hover {
            text-shadow: 0 0 10px currentColor;
        }
        
        .contact-card:hover {
            background: linear-gradient(135deg, var(--secondary-bg), rgba(0, 255, 65, 0.05));
        }
        
        .btn-view:hover {
            transform: scale(1.05) translateY(-1px);
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.3);
        }
        
        .project-overlay {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

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