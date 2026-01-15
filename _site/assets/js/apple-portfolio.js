/**
 * Apple iOS-Inspired Portfolio JavaScript
 * Handles smooth animations, scroll effects, and interactions
 */

// ==================
// Intersection Observer for Animations
// ==================

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.15
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add a staggered delay for multiple items
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);

      // Once animated, stop observing
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// ==================
// Initialize Animations
// ==================

function initAnimations() {
  // Animate section headers
  const sectionHeaders = document.querySelectorAll('.apple-section__header');
  sectionHeaders.forEach(header => {
    animateOnScroll.observe(header);
  });

  // Animate elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(element => {
    animateOnScroll.observe(element);
  });

  // Animate features
  const features = document.querySelectorAll('.apple-feature');
  features.forEach((feature, index) => {
    // Add delay based on index
    feature.style.transitionDelay = `${index * 0.1}s`;
    animateOnScroll.observe(feature);
  });

  // Animate gallery items
  const galleryItems = document.querySelectorAll('.apple-gallery-item');
  galleryItems.forEach((item, index) => {
    // Add delay based on index
    item.style.transitionDelay = `${index * 0.08}s`;
    animateOnScroll.observe(item);
  });

  // Animate cards
  const cards = document.querySelectorAll('.apple-card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    animateOnScroll.observe(card);
  });

  // Animate showcase items
  const showcaseItems = document.querySelectorAll('.apple-showcase-item');
  showcaseItems.forEach(item => {
    animateOnScroll.observe(item);
  });
}

// ==================
// Smooth Scroll for Navigation Links
// ==================

function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.apple-nav__link, a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Only handle internal links
      if (href && href.startsWith('#')) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navHeight = document.querySelector('.apple-nav')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ==================
// Parallax Effect for Hero
// ==================

function initParallax() {
  const hero = document.querySelector('.apple-hero');
  const heroBackground = document.querySelector('.apple-hero__background');

  if (hero && heroBackground) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;

      // Only apply parallax while hero is in view
      if (scrolled < heroHeight) {
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }
}

// ==================
// Navbar Background on Scroll
// ==================

function initNavbarScroll() {
  const nav = document.querySelector('.apple-nav');

  if (nav) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add shadow when scrolled
      if (currentScroll > 10) {
        nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    });
  }
}

// ==================
// Gallery Item Click Handler
// ==================

function initGalleryInteractions() {
  const galleryItems = document.querySelectorAll('.apple-gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('.apple-gallery-item__title')?.textContent;
      const description = item.querySelector('.apple-gallery-item__description')?.textContent;

      // You can add a modal or lightbox here
      console.log('Gallery item clicked:', { title, description });

      // Add a subtle scale effect
      item.style.transform = 'scale(0.98)';
      setTimeout(() => {
        item.style.transform = '';
      }, 150);
    });
  });
}

// ==================
// Lazy Load Images
// ==================

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ==================
// Reduced Motion Support
// ==================

function checkReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--apple-transition-fast', '0s');
    document.documentElement.style.setProperty('--apple-transition-base', '0s');
    document.documentElement.style.setProperty('--apple-transition-slow', '0s');
    document.documentElement.style.setProperty('--apple-transition-slowest', '0s');
  }
}

// ==================
// Performance Optimization
// ==================

// Throttle function for scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==================
// Initialize Everything
// ==================

function init() {
  // Check for reduced motion preferences
  checkReducedMotion();

  // Initialize all features
  initAnimations();
  initSmoothScroll();
  initParallax();
  initNavbarScroll();
  initGalleryInteractions();
  initLazyLoading();

  // Log that portfolio is ready
  console.log('🍎 Apple-inspired portfolio initialized');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ==================
// Export for potential module usage
// ==================

export { init, initAnimations, initSmoothScroll, initParallax };
