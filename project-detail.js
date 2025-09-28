// Project Detail Page JavaScript
class ProjectDetailPage {
    constructor() {
        this.config = PORTFOLIO_CONFIG;
        this.currentProject = null;
        this.currentMediaIndex = 0;
        this.mediaItems = [];
        
        this.init();
    }

    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project');
        
        if (projectId) {
            this.loadProject(projectId);
        } else {
            window.location.href = 'index.html';
        }

        this.setupEventListeners();
    }

    loadProject(projectId) {
        this.currentProject = this.config.projects.find(p => p.id === projectId);
        
        if (!this.currentProject) {
            console.error('Project not found:', projectId);
            window.location.href = 'index.html';
            return;
        }

        this.populateProjectData();
        this.generateMediaGallery();
        this.updatePageMeta();
    }

    populateProjectData() {
        const project = this.currentProject;

        document.getElementById('page-title').textContent = `${project.title} - ACondeSalazar`;

        document.getElementById('project-title').textContent = project.title;
        document.getElementById('github-link').href = project.github;

        const heroImg = document.getElementById('hero-img');
        heroImg.src = project.thumbnail;
        heroImg.alt = project.title;

        const descriptionDiv = document.getElementById('project-description');
        descriptionDiv.innerHTML = `<p>${project.fullDescription}</p>`;

        const featuresList = document.getElementById('features-list');
        if (project.features) {
            featuresList.innerHTML = project.features
                .map(feature => `<li>${feature}</li>`)
                .join('');
        }

        const techStack = document.getElementById('tech-stack');
        techStack.innerHTML = project.technologies
            .map(tech => `<div class="tech-item">${tech}</div>`)
            .join('');

        this.renderCollaborators(project);
        
        this.renderReferences(project);
    }

    renderCollaborators(project) {
        const collaboratorsSection = document.getElementById('collaborators-section');
        const collaboratorsList = document.getElementById('collaborators-list');
        
        if (project.collaborators && project.collaborators.length > 0) {
            collaboratorsSection.style.display = 'block';
            
            collaboratorsList.innerHTML = project.collaborators
                .map(collaborator => this.createCollaboratorCard(collaborator))
                .join('');
        } else {
            collaboratorsSection.style.display = 'none';
        }
    }

    createCollaboratorCard(collaborator) {
        return `
            <a href="${collaborator.github}" target="_blank" class="collaborator-card">
                <div class="collaborator-avatar">
                    <i class="fab fa-github"></i>
                </div>
                <div class="collaborator-info">
                    <div class="collaborator-name">
                        ${collaborator.name}
                    </div>
                    <div class="collaborator-role">${collaborator.role}</div>
                </div>
            </a>
        `;
    }

    renderReferences(project) {
        const referencesSection = document.getElementById('references-section');
        const referencesList = document.getElementById('references-list');
        
        if (project.references && project.references.length > 0) {
            referencesSection.style.display = 'block';
            
            referencesList.innerHTML = project.references
                .map(reference => this.createReferenceItem(reference))
                .join('');
        } else {
            referencesSection.style.display = 'none';
        }
    }

    createReferenceItem(reference) {
        return `
            <a href="${reference.url}" target="_blank" class="reference-item">
                <div class="reference-header">
                    <div class="reference-title">${reference.title}</div>
                    <div class="reference-type">${reference.type}</div>
                </div>
                <i class="fas fa-external-link-alt external-link-icon"></i>
            </a>
        `;
    }

    generateMediaGallery() {
        const gallery = document.getElementById('media-gallery');
        const project = this.currentProject;

        if (!project.media || project.media.length === 0) {
            gallery.innerHTML = '<p class="no-media">No additional media available for this project.</p>';
            return;
        }

        this.mediaItems = project.media;
        gallery.innerHTML = '';

        project.media.forEach((mediaItem, index) => {
            const mediaElement = this.createMediaElement(mediaItem, index);
            gallery.appendChild(mediaElement);
        });
    }

    createMediaElement(mediaItem, index) {
        const div = document.createElement('div');
        div.className = 'media-item';
        div.setAttribute('data-index', index);

        const isVideo = mediaItem.type === 'video';
        const mediaTag = isVideo ? 'video' : 'img';
        const mediaAttrs = isVideo ? 'muted loop' : '';

        div.innerHTML = `
            <div class="media-content">
                <${mediaTag} src="${mediaItem.src}" alt="${mediaItem.caption}" ${mediaAttrs}>
                ${isVideo ? '<source src="' + mediaItem.src + '" type="video/mp4">' : ''}
                </${mediaTag}>
                <div class="media-overlay">
                    <button class="play-button">
                        <i class="fas fa-${isVideo ? 'play' : 'expand'}"></i>
                    </button>
                </div>
            </div>
            <div class="media-caption">${mediaItem.caption}</div>
        `;

        div.addEventListener('click', () => {
            this.openLightbox(index);
        });

        if (isVideo) {
            const video = div.querySelector('video');
            div.addEventListener('mouseenter', () => {
                video.play();
            });
            div.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }

        return div;
    }

    setupEventListeners() {
        const lightbox = document.getElementById('lightbox');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');

        lightboxClose.addEventListener('click', () => this.closeLightbox());
        lightboxPrev.addEventListener('click', () => this.navigateLightbox(-1));
        lightboxNext.addEventListener('click', () => this.navigateLightbox(1));

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.navigateLightbox(-1);
                        break;
                    case 'ArrowRight':
                        this.navigateLightbox(1);
                        break;
                }
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    openLightbox(index) {
        this.currentMediaIndex = index;
        const mediaItem = this.mediaItems[index];
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxVideo = document.getElementById('lightbox-video');
        const lightboxCaption = document.getElementById('lightbox-caption');

        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'none';

        if (mediaItem.type === 'video') {
            lightboxVideo.style.display = 'block';
            lightboxVideo.querySelector('source').src = mediaItem.src;
            lightboxVideo.load();
        } else {
            lightboxImg.style.display = 'block';
            lightboxImg.src = mediaItem.src;
            lightboxImg.alt = mediaItem.caption;
        }

        lightboxCaption.textContent = mediaItem.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        this.updateLightboxNavigation();
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxVideo = document.getElementById('lightbox-video');
        
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        if (!lightboxVideo.paused) {
            lightboxVideo.pause();
        }
    }

    navigateLightbox(direction) {
        const newIndex = this.currentMediaIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.mediaItems.length) {
            this.openLightbox(newIndex);
        }
    }

    updateLightboxNavigation() {
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        prevBtn.style.opacity = this.currentMediaIndex > 0 ? '1' : '0.3';
        nextBtn.style.opacity = this.currentMediaIndex < this.mediaItems.length - 1 ? '1' : '0.3';
        
        prevBtn.disabled = this.currentMediaIndex === 0;
        nextBtn.disabled = this.currentMediaIndex === this.mediaItems.length - 1;
    }

    updatePageMeta() {
        const project = this.currentProject;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', project.shortDescription);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = project.shortDescription;
            document.head.appendChild(meta);
        }

        this.updateMetaTag('og:title', `${project.title} - Arthur Conde Salazar`);
        this.updateMetaTag('og:description', project.shortDescription);
        this.updateMetaTag('og:image', project.thumbnail);
        this.updateMetaTag('og:url', window.location.href);
    }

    updateMetaTag(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

}


document.addEventListener('DOMContentLoaded', () => {
    new ProjectDetailPage();
});