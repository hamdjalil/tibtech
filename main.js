// Utility function to load components with error handling
async function loadComponent(containerId, fragmentPath) {
  const host = document.getElementById(containerId);
  if (!host) return; // Page doesn't need this component
  
  try {
    const resp = await fetch(fragmentPath);
    if (!resp.ok) throw new Error(`Failed to load ${fragmentPath}: ${resp.statusText}`);
    host.innerHTML = await resp.text();
    
    // Force a reflow to ensure proper rendering
    if (containerId === 'footer-container') {
      host.style.display = 'none';
      host.offsetHeight; // Trigger reflow
      host.style.display = '';
      
      // Ensure footer is always visible
      setTimeout(() => {
        const footer = host.querySelector('footer');
        if (footer) {
          footer.style.visibility = 'visible';
          footer.style.opacity = '1';
          
          // Force layout recalculation on mobile
          if (window.innerWidth <= 768) {
            footer.style.minHeight = 'auto';
            footer.style.height = 'auto';
            footer.style.paddingBottom = '3rem';
          }
        }
      }, 100);
    }
  } catch (err) {
    console.error(`Couldn't load ${fragmentPath}:`, err);
  }
}

// Force footer visibility after DOM is fully loaded
function ensureFooterVisibility() {
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    const footer = footerContainer.querySelector('footer');
    if (footer) {
      // Force visibility
      footer.style.visibility = 'visible';
      footer.style.opacity = '1';
      footer.style.position = 'static';
      footer.style.bottom = 'auto';
      
      // Mobile-specific fixes
      if (window.innerWidth <= 768) {
        footer.style.paddingBottom = '3rem';
        footer.style.marginTop = '1rem';
        
        // Ensure container is properly sized
        footerContainer.style.width = '100%';
        footerContainer.style.display = 'block';
        footerContainer.style.visibility = 'visible';
      }
    }
  }
}

// Main initialization
document.addEventListener('DOMContentLoaded', async function() {
  // Load all possible components (will skip if containers don't exist)
  await Promise.all([
    loadComponent('header-container', '/components/header.html'),
    loadComponent('hero-container', '/components/hero.html'),
    loadComponent('featured-research-container', '/components/featured-research.html'),
    loadComponent('impact-section-container', '/components/impact-section.html'),
    loadComponent('our-work-container', '/components/our-work.html'),
    loadComponent('partner-section-container', '/components/partner-section.html'),
    loadComponent('join-section-container', '/components/join-section.html'),
    loadComponent('footer-container', '/components/footer.html'),
    loadComponent('accessibility-container', '/components/accessibility.html')
  ]);

  // Ensure footer is visible after all components are loaded
  setTimeout(ensureFooterVisibility, 200);

  // Initialize core functionality
  initHeaderScroll();
  initNavbarScroll();
  initMobileMenu();
  initScrollAnimations();
  
  // Initialize video animations only if video exists
  const video = document.getElementById('background-video');
  if (video) {
    initVideoAnimations();
    // Uncomment if you want auto-scroll: autoScroller();
  }
  
  // Initialize progress bar if it exists (for blog pages)
  initProgressBar();
});

// Listen for window resize to re-ensure footer visibility
window.addEventListener('resize', function() {
  setTimeout(ensureFooterVisibility, 100);
});

// Listen for orientation change on mobile devices
window.addEventListener('orientationchange', function() {
  setTimeout(ensureFooterVisibility, 300);
});

// Header scroll behavior with null checks
export function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  
  const toggle = () => {
    header.classList.toggle('bg-deepmind-darker', window.scrollY > 100);
    header.classList.toggle('shadow-md', window.scrollY > 100);
    header.classList.toggle('bg-transparent', window.scrollY <= 100);
  };
  
  toggle(); // Set initial state
  window.addEventListener('scroll', toggle);
}

// Navbar scroll effect with background opacity and shadow
export function initNavbarScroll() {
  const navbar = document.querySelector('header');
  if (!navbar) return;
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  const updateNavbar = () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY);
    
    // Add/remove background and shadow based on scroll position
    if (currentScrollY > 50) {
      navbar.classList.add('bg-deepmind-dark/95', 'backdrop-blur-md', 'shadow-lg');
      navbar.classList.remove('bg-deepmind-dark');
    } else {
      navbar.classList.remove('bg-deepmind-dark/95', 'backdrop-blur-md', 'shadow-lg');
      navbar.classList.add('bg-deepmind-dark');
    }
    
    // Hide/show navbar based on scroll direction (optional)
    if (scrollDifference > 5) { // Only update if scroll difference is significant
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up - show navbar
        navbar.style.transform = 'translateY(0)';
      }
      lastScrollY = currentScrollY;
    }
    
    ticking = false;
  };
  
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  };
  
  // Add smooth transition to navbar
  navbar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  
  // Set initial state
  updateNavbar();
  
  // Listen for scroll events
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile menu functionality with null checks
export function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('hidden');
  });
}

// Global function for mobile submenu
window.toggleMobileSubmenu = function(id) {
  const submenu = document.getElementById(id);
  if (submenu) {
    submenu.classList.toggle('hidden');
  }
};

// Scroll animations for any page
export function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in, .slide-up');
  if (els.length === 0) return;
  
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        e.target.style.opacity = 1;
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  
  els.forEach(el => { 
    el.style.opacity = 0; 
    el.style.animationPlayState = 'paused'; 
    io.observe(el); 
  });
}

// Video animations (for homepage)
export function initVideoAnimations() {
  const video = document.getElementById('background-video');
  if (!video) return;
  
  // Check if text elements exist
  const textElements = [
    { 
      el: document.getElementById('text-1'), 
      startTime: 0, 
      endTime: 5,
      animateIn: (el) => {
        el.classList.add('opacity-100');
        el.classList.remove('translate-y-8');
      },
      animateOut: (el) => {
        el.classList.remove('opacity-100');
        el.classList.add('translate-y-8');
      }
    },
    { 
      el: document.getElementById('text-2'), 
      startTime: 6, 
      endTime: 24,
      animateIn: (el) => {
        el.classList.add('opacity-100');
        el.classList.remove('translate-y-8');
      },
      animateOut: (el) => {
        el.classList.remove('opacity-100');
        el.classList.add('translate-y-8');
      }
    },
    { 
      el: document.getElementById('text-3'), 
      startTime: 25, 
      endTime: 32,
      animateIn: (el) => {
        el.classList.add('opacity-100');
        el.classList.remove('translate-y-8');
      },
      animateOut: (el) => {
        el.classList.remove('opacity-100');
        el.classList.add('translate-y-8');
      }
    }
  ];
  
  // Filter out null elements
  const validTextElements = textElements.filter(item => item.el !== null);
  if (validTextElements.length === 0) return;
  
  // Update animations based on video time
  video.addEventListener('timeupdate', function() {
    validTextElements.forEach(item => {
      if (video.currentTime >= item.startTime && video.currentTime < item.endTime) {
        item.animateIn(item.el);
      } else {
        item.animateOut(item.el);
      }
    });
  });
  
  // Reset animations when video loops
  video.addEventListener('seeked', function() {
    if (video.currentTime < 0.1) {
      validTextElements.forEach(item => {
        item.animateOut(item.el);
      });
    }
  });
}

// Auto scroller (optional)
export function autoScroller() {
  const video = document.getElementById('background-video');
  const nextSection = document.getElementById('featured-research-container');
  
  if (!video || !nextSection) return;
  
  // Remove loop attribute to ensure the video ends
  video.removeAttribute('loop');
  
  // Add event listener for when the video ends
  video.addEventListener('ended', function() {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  });

  video.setAttribute('loop', '');
}

// Progress bar for blog pages
export function initProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;
  
  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    progressBar.style.width = Math.min(Math.max(scrollPercent, 0), 100) + '%';
  };
  
  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
  updateProgress(); // Initial update
}

// Debug function to check footer status
window.debugFooter = function() {
  const footerContainer = document.getElementById('footer-container');
  const footer = footerContainer?.querySelector('footer');
  
  console.log('Footer Container:', footerContainer);
  console.log('Footer Element:', footer);
  console.log('Footer Computed Style:', footer ? window.getComputedStyle(footer) : 'N/A');
  console.log('Viewport:', { width: window.innerWidth, height: window.innerHeight });
  
  if (footer) {
    const rect = footer.getBoundingClientRect();
    console.log('Footer Position:', rect);
    console.log('Footer Visible:', rect.bottom <= window.innerHeight);
  }
};