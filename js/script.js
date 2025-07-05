// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Typing Animation
    const typingText = document.querySelector('.dynamic-text');
    const words = ['CSIR NET', 'SLET', 'Life Sciences', 'Competitive Exams'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    let erasingDelay = 100;
    let newWordDelay = 2000;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = newWordDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, typingDelay);
    }

    // Start typing animation
    setTimeout(type, 1000);

    // Sticky Header
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;

    function toggleStickyHeader() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', toggleStickyHeader);
    toggleStickyHeader(); // Initial check

    // Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

// Create nav close button
const navClose = document.createElement('div');
navClose.className = 'nav-close';
navClose.innerHTML = '<span></span>';
navMenu.appendChild(navClose);

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
navClose.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target) &&
        !navClose.contains(e.target)) {
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    }
});

// Update menu state on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    }
});

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Add a small delay for better UX, especially on mobile
                setTimeout(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle initial hash in URL
    if (window.location.hash) {
        setTimeout(() => {
            const targetId = window.location.hash;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 500); // Delay to ensure page is fully loaded
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY;
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });

        // Handle case when at the top of the page
        if (scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial check

    // Initialize Swiper for testimonials
    const testimonialsSwiper = new Swiper('.testimonials-wrapper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // Very small mobile phones
            0: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // Small mobile phones
            375: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            // Mobile phones
            576: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // Tablets
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // Small laptops
            992: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            // Desktops
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            // Large desktops
            1921: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Gallery Image" class="lightbox-image">
            <div class="lightbox-caption"></div>
            <div class="lightbox-controls">
                <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const galleryImages = [];

    galleryItems.forEach((item, index) => {
        const image = item.querySelector('img');
        galleryImages.push({
            src: image.src,
            alt: image.alt
        });

        item.addEventListener('click', function() {
            currentImageIndex = index;
            showLightbox();
        });
    });

    function showLightbox() {
        const image = galleryImages[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = image.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showLightbox();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showLightbox();
    }

    lightboxClose.addEventListener('click', hideLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            hideLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');

    function toggleBackToTopBtn() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    }

    window.addEventListener('scroll', toggleBackToTopBtn);
    toggleBackToTopBtn(); // Initial check

    // Newsletter Modal
    const newsletterModal = document.querySelector('#newsletterModal');
    const modalClose = document.querySelector('.modal-close');

    // Show modal after 5 seconds
    setTimeout(function() {
        newsletterModal.classList.add('active');
    }, 5000);

    // Close modal
    modalClose.addEventListener('click', function() {
        newsletterModal.classList.remove('active');
    });

    // Close modal when clicking outside
    newsletterModal.addEventListener('click', function(e) {
        if (e.target === newsletterModal) {
            newsletterModal.classList.remove('active');
        }
    });

    // Form Submission - Only for newsletter forms (contact form uses FormSubmit)
    const newsletterForm = document.querySelector('#newsletterForm');
    const modalNewsletterForm = document.querySelector('#modalNewsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    if (modalNewsletterForm) {
        modalNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            modalNewsletterForm.reset();
            newsletterModal.classList.remove('active');
        });
    }

    // Add lightbox styles
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1002;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .lightbox.active {
            opacity: 1;
            visibility: visible;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
        }
        
        .lightbox-image {
            display: block;
            max-width: 100%;
            max-height: 80vh;
            border: 5px solid #fff;
            border-radius: 4px;
        }
        
        .lightbox-caption {
            position: absolute;
            bottom: -40px;
            left: 0;
            width: 100%;
            text-align: center;
            color: #fff;
            font-size: 1rem;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lightbox-close:hover {
            color: #6c5ce7;
        }
        
        .lightbox-controls {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            transform: translateY(-50%);
        }
        
        .lightbox-prev,
        .lightbox-next {
            background-color: rgba(255, 255, 255, 0.2);
            color: #fff;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lightbox-prev {
            margin-left: -60px;
        }
        
        .lightbox-next {
            margin-right: -60px;
        }
        
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background-color: rgba(108, 92, 231, 0.8);
        }
        
        @media (max-width: 768px) {
            .lightbox-content {
                max-width: 90%;
            }
            
            .lightbox-prev {
                margin-left: -20px;
            }
            
            .lightbox-next {
                margin-right: -20px;
            }
        }
        
        .no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(lightboxStyles);
});