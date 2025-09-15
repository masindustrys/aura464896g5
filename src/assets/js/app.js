import 'sweetalert2/dist/sweetalert2.min.css';
import 'fslightbox/index.css';
import 'lite-youtube-embed/src/lite-yt-embed.css';

// Import Salla Twilight
import Twilight from '@salla.sa/twilight';
import TwilightComponents from '@salla.sa/twilight-components';

// Import third-party libraries
import Swal from 'sweetalert2';
import { fsLightbox } from 'fslightbox';
import anime from 'animejs/lib/anime.es.js';
import { MmenuLight } from 'mmenu-light';
import 'lite-youtube-embed';

/**
 * Aura Theme JavaScript
 * Main application file for the Aura Salla theme
 */
class AuraTheme {
  constructor() {
    this.isRTL = document.documentElement.dir === 'rtl';
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }

  init() {
    this.initTwilight();
    this.initComponents();
    this.initAnimations();
    this.initEventListeners();
    this.initMobileMenu();
    this.initProductFeatures();
    this.initScrollEffects();
    console.log('🌟 Aura Theme initialized successfully!');
  }

  /**
   * Initialize Salla Twilight
   */
  initTwilight() {
    try {
      // Initialize Twilight with custom configuration
      Twilight.start({
        debug: process.env.NODE_ENV === 'development',
        currency: {
          auto_format: true
        },
        notification: {
          time: 3500,
          position: this.isRTL ? 'top-left' : 'top-right'
        }
      });

      // Initialize Twilight Components
      TwilightComponents.init();
      
      console.log('✅ Salla Twilight initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Twilight:', error);
    }
  }

  /**
   * Initialize theme components
   */
  initComponents() {
    this.initSliders();
    this.initLightbox();
    this.initLazyLoading();
    this.initTooltips();
    this.initDropdowns();
  }

  /**
   * Initialize sliders and carousels
   */
  initSliders() {
    // Enhanced slider animation
    const sliders = document.querySelectorAll('.enhanced-slider');
    sliders.forEach(slider => {
      this.initEnhancedSlider(slider);
    });

    // Product sliders
    const productSliders = document.querySelectorAll('.products-slider');
    productSliders.forEach(slider => {
      this.initProductSlider(slider);
    });
  }

  /**
   * Initialize enhanced slider with animations
   */
  initEnhancedSlider(slider) {
    const slides = slider.querySelectorAll('.slide');
    const indicators = slider.querySelectorAll('.indicator');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Auto-play functionality
    let autoplayInterval;
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        this.nextSlide(slider, currentSlide, totalSlides);
        currentSlide = (currentSlide + 1) % totalSlides;
      }, 5000);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    // Navigation event listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoplay();
        this.nextSlide(slider, currentSlide, totalSlides);
        currentSlide = (currentSlide + 1) % totalSlides;
        startAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoplay();
        this.prevSlide(slider, currentSlide, totalSlides);
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        startAutoplay();
      });
    }

    // Indicator navigation
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        stopAutoplay();
        this.goToSlide(slider, index);
        currentSlide = index;
        startAutoplay();
      });
    });

    // Start autoplay
    startAutoplay();

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Initialize first slide
    this.goToSlide(slider, 0);
  }

  /**
   * Slide navigation methods
   */
  nextSlide(slider, current, total) {
    const next = (current + 1) % total;
    this.goToSlide(slider, next);
  }

  prevSlide(slider, current, total) {
    const prev = (current - 1 + total) % total;
    this.goToSlide(slider, prev);
  }

  goToSlide(slider, index) {
    const slides = slider.querySelectorAll('.slide');
    const indicators = slider.querySelectorAll('.indicator');

    // Remove active classes
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide
    if (slides[index]) {
      slides[index].classList.add('active');
      
      // Animate slide content
      const slideContent = slides[index].querySelectorAll('.slide-content > *');
      anime({
        targets: slideContent,
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutQuad'
      });
    }

    if (indicators[index]) {
      indicators[index].classList.add('active');
    }
  }

  /**
   * Initialize product slider
   */
  initProductSlider(slider) {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.product-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const slidesToShow = this.isMobile ? 1 : 4;
    const maxIndex = Math.max(0, slides.length - slidesToShow);

    const updateSlider = () => {
      const translateX = -(currentIndex * (100 / slidesToShow));
      track.style.transform = `translateX(${translateX}%)`;
      
      // Update button states
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.classList.toggle('opacity-50', currentIndex === 0);
      }
      if (nextBtn) {
        nextBtn.disabled = currentIndex >= maxIndex;
        nextBtn.classList.toggle('opacity-50', currentIndex >= maxIndex);
      }
    };

    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateSlider();
        }
      });
    }

    // Touch/swipe support
    this.initTouchSlider(track, () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    }, () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    updateSlider();
  }

  /**
   * Touch/swipe slider support
   */
  initTouchSlider(element, onSwipeLeft, onSwipeRight) {
    let startX = null;
    let startY = null;

    element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }

      startX = null;
      startY = null;
    }, { passive: true });
  }

  /**
   * Initialize lightbox for images
   */
  initLightbox() {
    const lightboxTriggers = document.querySelectorAll('[data-fslightbox]');
    
    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const src = trigger.getAttribute('href') || trigger.getAttribute('data-src');
        if (src) {
          fsLightbox.open(0, src);
        }
      });
    });
  }

  /**
   * Initialize lazy loading for images
   */
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Initialize tooltips
   */
  initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target);
      });
      
      element.addEventListener('mouseleave', (e) => {
        this.hideTooltip(e.target);
      });
    });
  }

  showTooltip(element) {
    const text = element.getAttribute('data-tooltip');
    if (!text) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'aura-tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

    requestAnimationFrame(() => {
      tooltip.classList.add('visible');
    });
  }

  hideTooltip(element) {
    const tooltip = document.querySelector('.aura-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  /**
   * Initialize dropdown menus
   */
  initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (!trigger || !menu) return;

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown.active').forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('active');
          }
        });
        
        dropdown.classList.toggle('active');
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    });
  }

  /**
   * Initialize animations
   */
  initAnimations() {
    // Scroll animations
    this.initScrollAnimations();
    
    // Page load animations
    this.initPageLoadAnimations();
    
    // Hover animations
    this.initHoverAnimations();
  }

  /**
   * Initialize scroll-triggered animations
   */
  initScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.dataset.animation;
            
            switch (animationType) {
              case 'fade-in':
                this.animateFadeIn(element);
                break;
              case 'slide-up':
                this.animateSlideUp(element);
                break;
              case 'slide-in':
                this.animateSlideIn(element);
                break;
              case 'zoom-in':
                this.animateZoomIn(element);
                break;
              case 'stagger':
                this.animateStagger(element);
                break;
              default:
                this.animateFadeIn(element);
            }
            
            animationObserver.unobserve(element);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('[data-animation]').forEach(element => {
        animationObserver.observe(element);
      });
    }
  }

  /**
   * Animation methods
   */
  animateFadeIn(element) {
    anime({
      targets: element,
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad'
    });
  }

  animateSlideUp(element) {
    anime({
      targets: element,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad'
    });
  }

  animateSlideIn(element) {
    const direction = this.isRTL ? -50 : 50;
    anime({
      targets: element,
      translateX: [direction, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad'
    });
  }

  animateZoomIn(element) {
    anime({
      targets: element,
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutBack'
    });
  }

  animateStagger(element) {
    const children = element.children;
    anime({
      targets: children,
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutQuad'
    });
  }

  /**
   * Initialize page load animations
   */
  initPageLoadAnimations() {
    // Animate page elements on load
    anime({
      targets: '.animate-on-load',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutQuad'
    });
  }

  /**
   * Initialize hover animations
   */
  initHoverAnimations() {
    const hoverElements = document.querySelectorAll('.hover-animate');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        anime({
          targets: element,
          scale: 1.05,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
      
      element.addEventListener('mouseleave', () => {
        anime({
          targets: element,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
  }

  /**
   * Initialize mobile menu
   */
  initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
      // Initialize mmenu-light
      const menu = new MmenuLight(mobileMenu, 'all');
      const drawer = menu.navigation();
      
      menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        drawer.open();
      });
    }
  }

  /**
   * Initialize product features
   */
  initProductFeatures() {
    this.initProductImageZoom();
    this.initProductOptions();
    this.initQuickView();
    this.initWishlist();
    this.initCompare();
  }

  /**
   * Initialize product image zoom
   */
  initProductImageZoom() {
    const zoomContainers = document.querySelectorAll('.product-image-zoom');
    
    zoomContainers.forEach(container => {
      const img = container.querySelector('img');
      if (!img) return;

      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(2)';
      });

      container.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    });
  }

  /**
   * Initialize product options
   */
  initProductOptions() {
    const optionGroups = document.querySelectorAll('.product-options-group');
    
    optionGroups.forEach(group => {
      const options = group.querySelectorAll('.option-item');
      
      options.forEach(option => {
        option.addEventListener('click', () => {
          // Remove active class from siblings
          options.forEach(sibling => sibling.classList.remove('active'));
          // Add active class to clicked option
          option.classList.add('active');
          
          // Trigger animation
          anime({
            targets: option,
            scale: [0.95, 1],
            duration: 200,
            easing: 'easeOutQuad'
          });
        });
      });
    });
  }

  /**
   * Initialize quick view
   */
  initQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.productId;
        if (productId) {
          this.openQuickView(productId);
        }
      });
    });
  }

  /**
   * Open product quick view
   */
  openQuickView(productId) {
    // This would typically make an AJAX request to get product details
    // For now, we'll show a placeholder modal
    Swal.fire({
      title: 'Quick View',
      html: '<div class="text-center p-4">Loading product details...</div>',
      showConfirmButton: false,
      width: '90%',
      customClass: {
        container: 'quick-view-modal'
      }
    });
  }

  /**
   * Initialize wishlist functionality
   */
  initWishlist() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        btn.classList.toggle('active');
        
        // Animate heart
        anime({
          targets: btn.querySelector('.heart-icon'),
          scale: [1, 1.3, 1],
          duration: 400,
          easing: 'easeOutQuad'
        });
        
        // Show notification
        const message = btn.classList.contains('active') 
          ? 'Added to wishlist' 
          : 'Removed from wishlist';
          
        this.showNotification(message);
      });
    });
  }

  /**
   * Initialize compare functionality
   */
  initCompare() {
    const compareBtns = document.querySelectorAll('.compare-btn');
    
    compareBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        btn.classList.toggle('active');
        this.showNotification('Product added to compare');
      });
    });
  }

  /**
   * Initialize scroll effects
   */
  initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Header scroll effect
      if (header) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down
          header.classList.add('header-hidden');
        } else {
          // Scrolling up
          header.classList.remove('header-hidden');
        }
        
        // Add background on scroll
        if (scrollTop > 50) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }
      
      lastScrollTop = scrollTop;
    });

    // Parallax effect for hero sections
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
          const speed = element.dataset.speed || 0.5;
          const yPos = -(window.scrollY * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
      });
    }
  }

  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Search toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    
    if (searchToggle && searchForm) {
      searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        searchForm.classList.toggle('active');
        
        if (searchForm.classList.contains('active')) {
          const input = searchForm.querySelector('input');
          if (input) input.focus();
        }
      });
    }

    // Cart sidebar toggle
    const cartToggle = document.querySelector('.cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    if (cartToggle && cartSidebar) {
      cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
      });
    }

    if (cartOverlay) {
      cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
      });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });

      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
      // Reinitialize components that depend on screen size
      this.initSliders();
    });
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'success') {
    Swal.fire({
      toast: true,
      position: this.isRTL ? 'top-left' : 'top-right',
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  /**
   * Utility methods
   */
  debounce(func, wait) {
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

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// Initialize theme when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.AuraTheme = new AuraTheme();
});

// Export for module systems
export default AuraTheme;