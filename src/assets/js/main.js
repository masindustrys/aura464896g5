/**
 * ARURA THEME - MAIN JAVASCRIPT
 * Modern, performance-optimized JavaScript for the Arura theme
 */

(function() {
    'use strict';

    // Theme configuration
    const ARURA = {
        config: {
            breakpoints: {
                xs: 480,
                sm: 768,
                md: 1024,
                lg: 1200
            },
            animation: {
                duration: 300,
                easing: 'ease-in-out'
            }
        },
        
        // Initialize all components
        init: function() {
            this.mobileMenu.init();
            this.search.init();
            this.cart.init();
            this.productActions.init();
            this.modals.init();
            this.scroll.init();
            this.forms.init();
            this.lazyLoading.init();
            
            // Initialize after DOM is fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.carousel.init();
                    this.animations.init();
                });
            } else {
                this.carousel.init();
                this.animations.init();
            }
        },

        // Mobile Menu Component
        mobileMenu: {
            isOpen: false,
            
            init: function() {
                const toggle = document.getElementById('mobileMenuToggle');
                const close = document.getElementById('mobileMenuClose');
                const menu = document.getElementById('mobileMenu');
                const overlay = document.getElementById('mobileMenuOverlay');
                
                if (toggle) {
                    toggle.addEventListener('click', this.toggle.bind(this));
                }
                
                if (close) {
                    close.addEventListener('click', this.close.bind(this));
                }
                
                if (overlay) {
                    overlay.addEventListener('click', this.close.bind(this));
                }
                
                // Handle submenu toggles
                const subMenuToggles = document.querySelectorAll('.mobile-nav__item.has-children > .mobile-nav__link');
                subMenuToggles.forEach(toggle => {
                    toggle.addEventListener('click', this.toggleSubmenu.bind(this));
                });
                
                // Close menu on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.isOpen) {
                        this.close();
                    }
                });
            },
            
            toggle: function() {
                if (this.isOpen) {
                    this.close();
                } else {
                    this.open();
                }
            },
            
            open: function() {
                const menu = document.getElementById('mobileMenu');
                const overlay = document.getElementById('mobileMenuOverlay');
                
                if (menu && overlay) {
                    menu.classList.add('active');
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    this.isOpen = true;
                }
            },
            
            close: function() {
                const menu = document.getElementById('mobileMenu');
                const overlay = document.getElementById('mobileMenuOverlay');
                
                if (menu && overlay) {
                    menu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    this.isOpen = false;
                }
            },
            
            toggleSubmenu: function(e) {
                e.preventDefault();
                const submenu = e.target.nextElementSibling;
                if (submenu && submenu.classList.contains('mobile-nav__submenu')) {
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                }
            }
        },

        // Search Component
        search: {
            init: function() {
                const searchForms = document.querySelectorAll('.search-form');
                const searchInputs = document.querySelectorAll('.search-input');
                
                searchInputs.forEach(input => {
                    input.addEventListener('input', this.handleInput.bind(this));
                    input.addEventListener('focus', this.handleFocus.bind(this));
                    input.addEventListener('blur', this.handleBlur.bind(this));
                });
                
                // Auto-suggest functionality
                this.initAutoSuggest();
            },
            
            handleInput: function(e) {
                const query = e.target.value.trim();
                if (query.length >= 2) {
                    this.showSuggestions(e.target, query);
                } else {
                    this.hideSuggestions(e.target);
                }
            },
            
            handleFocus: function(e) {
                e.target.parentElement.classList.add('focused');
            },
            
            handleBlur: function(e) {
                setTimeout(() => {
                    e.target.parentElement.classList.remove('focused');
                    this.hideSuggestions(e.target);
                }, 200);
            },
            
            showSuggestions: function(input, query) {
                // Implementation for search suggestions
                // This would typically make an AJAX request to get suggestions
                console.log('Showing suggestions for:', query);
            },
            
            hideSuggestions: function(input) {
                // Hide suggestion dropdown
                const suggestions = input.parentElement.querySelector('.search-suggestions');
                if (suggestions) {
                    suggestions.style.display = 'none';
                }
            },
            
            initAutoSuggest: function() {
                // Initialize auto-suggest functionality
                // This would connect to Salla's search API
            }
        },

        // Cart Component
        cart: {
            init: function() {
                const cartToggle = document.getElementById('cartToggle');
                const cartSidebar = document.getElementById('cartSidebar');
                
                if (cartToggle) {
                    cartToggle.addEventListener('click', this.toggleSidebar.bind(this));
                }
                
                // Add to cart buttons
                const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', this.addToCart.bind(this));
                });
                
                // Cart quantity controls
                this.initQuantityControls();
            },
            
            toggleSidebar: function() {
                const sidebar = document.getElementById('cartSidebar');
                if (sidebar) {
                    sidebar.classList.toggle('active');
                }
            },
            
            addToCart: function(e) {
                e.preventDefault();
                const button = e.target.closest('.add-to-cart-btn');
                const productId = button.getAttribute('data-product-id');
                
                this.showLoading(button);
                
                // Simulate API call
                setTimeout(() => {
                    this.hideLoading(button);
                    this.showSuccess(button);
                    this.updateCartCount();
                }, 1000);
            },
            
            showLoading: function(button) {
                button.disabled = true;
                button.innerHTML = '<div class="spinner"></div> Adding...';
            },
            
            hideLoading: function(button) {
                button.disabled = false;
                button.innerHTML = '<i class="icon-cart"></i> Add to Cart';
            },
            
            showSuccess: function(button) {
                button.innerHTML = '<i class="icon-check"></i> Added!';
                button.classList.add('success');
                
                setTimeout(() => {
                    button.innerHTML = '<i class="icon-cart"></i> Add to Cart';
                    button.classList.remove('success');
                }, 2000);
            },
            
            updateCartCount: function() {
                const countElements = document.querySelectorAll('.header-action__count');
                countElements.forEach(element => {
                    const currentCount = parseInt(element.textContent) || 0;
                    element.textContent = currentCount + 1;
                });
            },
            
            initQuantityControls: function() {
                const quantityInputs = document.querySelectorAll('.quantity-input');
                quantityInputs.forEach(input => {
                    const decreaseBtn = input.parentElement.querySelector('.quantity-decrease');
                    const increaseBtn = input.parentElement.querySelector('.quantity-increase');
                    
                    if (decreaseBtn) {
                        decreaseBtn.addEventListener('click', () => this.decreaseQuantity(input));
                    }
                    
                    if (increaseBtn) {
                        increaseBtn.addEventListener('click', () => this.increaseQuantity(input));
                    }
                });
            },
            
            decreaseQuantity: function(input) {
                const currentValue = parseInt(input.value) || 1;
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    input.dispatchEvent(new Event('change'));
                }
            },
            
            increaseQuantity: function(input) {
                const currentValue = parseInt(input.value) || 1;
                const maxValue = parseInt(input.getAttribute('max')) || 999;
                if (currentValue < maxValue) {
                    input.value = currentValue + 1;
                    input.dispatchEvent(new Event('change'));
                }
            }
        },

        // Product Actions Component
        productActions: {
            init: function() {
                this.initWishlist();
                this.initCompare();
                this.initQuickView();
                this.initProductVariants();
            },
            
            initWishlist: function() {
                const wishlistButtons = document.querySelectorAll('.wishlist-btn');
                wishlistButtons.forEach(button => {
                    button.addEventListener('click', this.toggleWishlist.bind(this));
                });
            },
            
            initCompare: function() {
                const compareButtons = document.querySelectorAll('.compare-btn');
                compareButtons.forEach(button => {
                    button.addEventListener('click', this.toggleCompare.bind(this));
                });
            },
            
            initQuickView: function() {
                const quickViewButtons = document.querySelectorAll('.quick-view-btn');
                quickViewButtons.forEach(button => {
                    button.addEventListener('click', this.openQuickView.bind(this));
                });
            },
            
            toggleWishlist: function(e) {
                e.preventDefault();
                const button = e.target.closest('.wishlist-btn');
                const productId = button.getAttribute('data-product-id');
                
                button.classList.toggle('active');
                
                // Update wishlist count
                const wishlistCount = document.querySelector('.header-action--wishlist .header-action__count');
                if (wishlistCount) {
                    const currentCount = parseInt(wishlistCount.textContent) || 0;
                    wishlistCount.textContent = button.classList.contains('active') ? 
                        currentCount + 1 : Math.max(0, currentCount - 1);
                }
            },
            
            toggleCompare: function(e) {
                e.preventDefault();
                const button = e.target.closest('.compare-btn');
                const productId = button.getAttribute('data-product-id');
                
                button.classList.toggle('active');
                
                // Update compare count
                const compareCount = document.querySelector('.header-action--compare .header-action__count');
                if (compareCount) {
                    const currentCount = parseInt(compareCount.textContent) || 0;
                    compareCount.textContent = button.classList.contains('active') ? 
                        currentCount + 1 : Math.max(0, currentCount - 1);
                }
            },
            
            openQuickView: function(e) {
                e.preventDefault();
                const button = e.target.closest('.quick-view-btn');
                const productId = button.getAttribute('data-product-id');
                
                // Show loading
                ARURA.modals.showLoading();
                
                // Simulate loading product data
                setTimeout(() => {
                    ARURA.modals.hideLoading();
                    ARURA.modals.show('quickViewModal');
                }, 1000);
            },
            
            initProductVariants: function() {
                const variantSelectors = document.querySelectorAll('.variant-selector');
                variantSelectors.forEach(selector => {
                    selector.addEventListener('change', this.handleVariantChange.bind(this));
                });
                
                const colorOptions = document.querySelectorAll('.color-option');
                colorOptions.forEach(option => {
                    option.addEventListener('click', this.selectColorVariant.bind(this));
                });
            },
            
            handleVariantChange: function(e) {
                const selector = e.target;
                const productCard = selector.closest('.product-card');
                
                // Update product data based on variant selection
                this.updateProductData(productCard, selector.value);
            },
            
            selectColorVariant: function(e) {
                const option = e.target;
                const variantOptions = option.parentElement;
                
                // Remove active class from siblings
                variantOptions.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // Add active class to selected option
                option.classList.add('active');
            },
            
            updateProductData: function(productCard, variantId) {
                // Update price, image, availability based on variant
                console.log('Updating product data for variant:', variantId);
            }
        },

        // Modals Component
        modals: {
            init: function() {
                // Close modal on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.closeAll();
                    }
                });
                
                // Close modal on backdrop click
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            this.hide(modal.id);
                        }
                    });
                });
                
                // Close buttons
                const closeButtons = document.querySelectorAll('.modal-close');
                closeButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const modal = e.target.closest('.modal');
                        if (modal) {
                            this.hide(modal.id);
                        }
                    });
                });
            },
            
            show: function(modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            },
            
            hide: function(modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            },
            
            closeAll: function() {
                const activeModals = document.querySelectorAll('.modal.active');
                activeModals.forEach(modal => {
                    this.hide(modal.id);
                });
            },
            
            showLoading: function() {
                const loadingSpinner = document.getElementById('loadingSpinner');
                if (loadingSpinner) {
                    loadingSpinner.classList.add('show');
                }
            },
            
            hideLoading: function() {
                const loadingSpinner = document.getElementById('loadingSpinner');
                if (loadingSpinner) {
                    loadingSpinner.classList.remove('show');
                }
            }
        },

        // Scroll Component
        scroll: {
            init: function() {
                this.initBackToTop();
                this.initStickyHeader();
                this.initScrollAnimations();
            },
            
            initBackToTop: function() {
                const backToTopBtn = document.getElementById('backToTop');
                if (!backToTopBtn) return;
                
                window.addEventListener('scroll', () => {
                    if (window.pageYOffset > 300) {
                        backToTopBtn.classList.add('visible');
                    } else {
                        backToTopBtn.classList.remove('visible');
                    }
                });
                
                backToTopBtn.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            },
            
            initStickyHeader: function() {
                const header = document.querySelector('.header');
                if (!header) return;
                
                let lastScrollTop = 0;
                
                window.addEventListener('scroll', () => {
                    const scrollTop = window.pageYOffset;
                    
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                        // Scrolling down
                        header.classList.add('header--hidden');
                    } else {
                        // Scrolling up
                        header.classList.remove('header--hidden');
                    }
                    
                    lastScrollTop = scrollTop;
                });
            },
            
            initScrollAnimations: function() {
                // Intersection Observer for scroll animations
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
                
                const animateElements = document.querySelectorAll('.animate-on-scroll');
                animateElements.forEach(element => {
                    observer.observe(element);
                });
            }
        },

        // Forms Component
        forms: {
            init: function() {
                this.initValidation();
                this.initNewsletterSubscription();
                this.initFormSubmissions();
            },
            
            initValidation: function() {
                const forms = document.querySelectorAll('form[data-validate]');
                forms.forEach(form => {
                    form.addEventListener('submit', this.validateForm.bind(this));
                });
                
                // Real-time validation
                const inputs = document.querySelectorAll('input[required], textarea[required]');
                inputs.forEach(input => {
                    input.addEventListener('blur', this.validateField.bind(this));
                    input.addEventListener('input', this.clearFieldError.bind(this));
                });
            },
            
            validateForm: function(e) {
                const form = e.target;
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!this.validateField({ target: field })) {
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                }
                
                return isValid;
            },
            
            validateField: function(e) {
                const field = e.target;
                const value = field.value.trim();
                const fieldType = field.type;
                let isValid = true;
                let errorMessage = '';
                
                // Required validation
                if (field.hasAttribute('required') && !value) {
                    isValid = false;
                    errorMessage = 'This field is required';
                }
                
                // Email validation
                if (fieldType === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                }
                
                // Phone validation
                if (fieldType === 'tel' && value) {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                }
                
                this.showFieldError(field, isValid ? '' : errorMessage);
                return isValid;
            },
            
            showFieldError: function(field, message) {
                const errorElement = field.parentElement.querySelector('.field-error');
                
                if (message) {
                    field.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = message;
                    } else {
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'field-error';
                        errorDiv.textContent = message;
                        field.parentElement.appendChild(errorDiv);
                    }
                } else {
                    field.classList.remove('error');
                    if (errorElement) {
                        errorElement.remove();
                    }
                }
            },
            
            clearFieldError: function(e) {
                const field = e.target;
                field.classList.remove('error');
                const errorElement = field.parentElement.querySelector('.field-error');
                if (errorElement) {
                    errorElement.remove();
                }
            },
            
            initNewsletterSubscription: function() {
                const newsletterForms = document.querySelectorAll('.newsletter__form, .newsletter-form');
                newsletterForms.forEach(form => {
                    form.addEventListener('submit', this.handleNewsletterSubmission.bind(this));
                });
            },
            
            handleNewsletterSubmission: function(e) {
                e.preventDefault();
                const form = e.target;
                const emailInput = form.querySelector('input[type="email"]');
                const submitButton = form.querySelector('button[type="submit"]');
                
                if (!this.validateField({ target: emailInput })) {
                    return;
                }
                
                // Show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = 'Subscribing...';
                
                // Simulate API call
                setTimeout(() => {
                    submitButton.innerHTML = 'Subscribed!';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = 'Subscribe';
                    }, 2000);
                }, 1000);
            },
            
            initFormSubmissions: function() {
                // Handle AJAX form submissions
                const ajaxForms = document.querySelectorAll('form[data-ajax]');
                ajaxForms.forEach(form => {
                    form.addEventListener('submit', this.handleAjaxSubmission.bind(this));
                });
            },
            
            handleAjaxSubmission: function(e) {
                e.preventDefault();
                const form = e.target;
                const formData = new FormData(form);
                const submitButton = form.querySelector('button[type="submit"]');
                
                // Show loading state
                const originalText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = 'Please wait...';
                
                // Simulate AJAX request
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                    
                    // Show success message
                    this.showFormMessage(form, 'Form submitted successfully!', 'success');
                }, 2000);
            },
            
            showFormMessage: function(form, message, type) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `form-message form-message--${type}`;
                messageDiv.textContent = message;
                
                form.insertBefore(messageDiv, form.firstChild);
                
                setTimeout(() => {
                    messageDiv.remove();
                }, 5000);
            }
        },

        // Lazy Loading Component
        lazyLoading: {
            init: function() {
                if ('IntersectionObserver' in window) {
                    this.initIntersectionObserver();
                } else {
                    // Fallback for older browsers
                    this.loadAllImages();
                }
            },
            
            initIntersectionObserver: function() {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            this.loadImage(img);
                            observer.unobserve(img);
                        }
                    });
                });
                
                const lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => {
                    imageObserver.observe(img);
                });
            },
            
            loadImage: function(img) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                
                img.onload = function() {
                    img.classList.add('fade-in');
                };
            },
            
            loadAllImages: function() {
                const lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => {
                    this.loadImage(img);
                });
            }
        },

        // Carousel/Slider Component
        carousel: {
            init: function() {
                const carousels = document.querySelectorAll('.carousel, .slider');
                carousels.forEach(carousel => {
                    this.initCarousel(carousel);
                });
            },
            
            initCarousel: function(carousel) {
                const slides = carousel.querySelectorAll('.slide, .carousel-slide');
                const prevBtn = carousel.querySelector('.carousel-prev, .slider-prev');
                const nextBtn = carousel.querySelector('.carousel-next, .slider-next');
                const indicators = carousel.querySelectorAll('.carousel-indicator');
                
                if (slides.length <= 1) return;
                
                let currentSlide = 0;
                let autoPlayInterval;
                
                const showSlide = (index) => {
                    slides[currentSlide].classList.remove('active');
                    if (indicators[currentSlide]) {
                        indicators[currentSlide].classList.remove('active');
                    }
                    
                    currentSlide = (index + slides.length) % slides.length;
                    
                    slides[currentSlide].classList.add('active');
                    if (indicators[currentSlide]) {
                        indicators[currentSlide].classList.add('active');
                    }
                };
                
                const nextSlide = () => showSlide(currentSlide + 1);
                const prevSlide = () => showSlide(currentSlide - 1);
                
                // Event listeners
                if (nextBtn) nextBtn.addEventListener('click', nextSlide);
                if (prevBtn) prevBtn.addEventListener('click', prevSlide);
                
                indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => showSlide(index));
                });
                
                // Auto-play
                const startAutoPlay = () => {
                    autoPlayInterval = setInterval(nextSlide, 5000);
                };
                
                const stopAutoPlay = () => {
                    clearInterval(autoPlayInterval);
                };
                
                // Start auto-play
                startAutoPlay();
                
                // Pause on hover
                carousel.addEventListener('mouseenter', stopAutoPlay);
                carousel.addEventListener('mouseleave', startAutoPlay);
                
                // Touch/swipe support
                this.addTouchSupport(carousel, nextSlide, prevSlide);
            },
            
            addTouchSupport: function(carousel, nextSlide, prevSlide) {
                let startX = 0;
                let endX = 0;
                
                carousel.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                carousel.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            nextSlide();
                        } else {
                            prevSlide();
                        }
                    }
                });
            }
        },

        // Animations Component
        animations: {
            init: function() {
                this.initScrollAnimations();
                this.initHoverAnimations();
            },
            
            initScrollAnimations: function() {
                const animatedElements = document.querySelectorAll('[data-animate]');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const element = entry.target;
                            const animationType = element.dataset.animate;
                            const delay = element.dataset.delay || 0;
                            
                            setTimeout(() => {
                                element.classList.add('animate-' + animationType);
                            }, delay);
                        }
                    });
                }, { threshold: 0.1 });
                
                animatedElements.forEach(element => {
                    observer.observe(element);
                });
            },
            
            initHoverAnimations: function() {
                const hoverElements = document.querySelectorAll('[data-hover]');
                
                hoverElements.forEach(element => {
                    const hoverClass = element.dataset.hover;
                    
                    element.addEventListener('mouseenter', () => {
                        element.classList.add(hoverClass);
                    });
                    
                    element.addEventListener('mouseleave', () => {
                        element.classList.remove(hoverClass);
                    });
                });
            }
        },

        // Utility functions
        utils: {
            debounce: function(func, wait, immediate) {
                let timeout;
                return function executedFunction() {
                    const context = this;
                    const args = arguments;
                    const later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    const callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            },
            
            throttle: function(func, limit) {
                let inThrottle;
                return function() {
                    const args = arguments;
                    const context = this;
                    if (!inThrottle) {
                        func.apply(context, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                };
            },
            
            getViewportWidth: function() {
                return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            },
            
            isMobile: function() {
                return this.getViewportWidth() < ARURA.config.breakpoints.md;
            },
            
            animate: function(element, keyframes, options) {
                if (element.animate) {
                    return element.animate(keyframes, options);
                }
            }
        }
    };

    // Initialize the theme
    ARURA.init();

    // Make ARURA available globally
    window.ARURA = ARURA;

})();