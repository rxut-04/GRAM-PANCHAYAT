// Gallery functionality
class GalleryManager {
    constructor() {
        this.images = [];
        this.currentImageIndex = 0;
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.galleryGrid = document.getElementById('galleryGrid');
        
        this.init();
    }

    init() {
        this.loadImages();
        this.setupEventListeners();
    }

    async loadImages() {
        // Show loading state
        this.showLoading();

        try {
            // In a real implementation, you would fetch images from a server
            // For now, we'll create sample images
            this.images = await this.getSampleImages();
            this.renderGallery();
        } catch (error) {
            console.error('Error loading images:', error);
            this.showError();
        }
    }

    async getSampleImages() {
        // Load actual images from GRAM-MEETING-IMAGES folder
        return [
            {
                src: '../GRAM-MEETING-IMAGES/image.png',
                title: 'ग्रामसभा बैठक - जानेवारी २०२४',
                description: 'मासिक ग्रामसभेची बैठक ज्यामध्ये विकास कामांची चर्चा झाली'
            },
            {
                src: '../GRAM-MEETING-IMAGES/IMG-20250904-WA0014.jpg',
                title: 'बजेट चर्चा सभा',
                description: 'वार्षिक बजेटच्या चर्चेसाठी आयोजित विशेष सभा'
            },
            {
                src: '../GRAM-MEETING-IMAGES/IMG-20250904-WA0015.jpg',
                title: 'पाणी पुरवठा योजना बैठक',
                description: 'गावातील पाणी पुरवठा सुधारणेसाठी आयोजित बैठक'
            },
            {
                src: '../GRAM-MEETING-IMAGES/IMG-20250904-WA0016.jpg',
                title: 'रस्ते विकास चर्चा',
                description: 'गावातील रस्त्यांच्या दुरुस्तीसाठी नियोजन बैठक'
            },
            {
                src: '../GRAM-MEETING-IMAGES/IMG-20250904-WA0017.jpg',
                title: 'शिक्षण समिती बैठक',
                description: 'गावातील शाळांच्या सुविधा सुधारणेसाठी चर्चा'
            },
            {
                src: '../GRAM-MEETING-IMAGES/IMG-20250904-WA0018.jpg',
                title: 'आरोग्य योजना सभा',
                description: 'ग्रामीण आरोग्य सेवा सुधारणेसाठी विशेष बैठक'
            }
        ];
    }

    showLoading() {
        this.galleryGrid.innerHTML = `
            <div class="gallery-loading">
                <div class="loading-spinner"></div>
                <p>छायाचित्रे लोड होत आहेत...</p>
            </div>
        `;
    }

    showError() {
        this.galleryGrid.innerHTML = `
            <div class="gallery-loading">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e74c3c; margin-bottom: 1rem;"></i>
                <p>छायाचित्रे लोड करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.</p>
            </div>
        `;
    }

    renderGallery() {
        this.galleryGrid.innerHTML = '';
        
        this.images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => this.openLightbox(index));
            this.galleryGrid.appendChild(galleryItem);
        });
    }

    setupEventListeners() {
        // Lightbox close button
        document.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });

        // Close lightbox when clicking outside image
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Navigation buttons
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousImage();
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextImage();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        const image = this.images[index];
        
        this.lightboxImg.src = image.src;
        this.lightboxImg.alt = image.title;
        this.lightboxCaption.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.description}</p>
        `;
        
        this.lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        this.updateNavigationButtons();
    }

    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.openLightbox(this.currentImageIndex - 1);
        }
    }

    nextImage() {
        if (this.currentImageIndex < this.images.length - 1) {
            this.openLightbox(this.currentImageIndex + 1);
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.disabled = this.currentImageIndex === 0;
        nextBtn.disabled = this.currentImageIndex === this.images.length - 1;
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryManager();
});