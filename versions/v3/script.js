// Scroll animations with Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in, .fade-left, .fade-right').forEach(el => observer.observe(el));

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (nav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Count-up animation
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const target = parseInt(entry.target.dataset.target);
      const duration = 1500;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(animate);
        else entry.target.textContent = target;
      };
      requestAnimationFrame(animate);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));

// Gantt Before/After Animation
(function() {
  const toggle = document.getElementById('ganttToggle');
  if (!toggle) return;
  const bars = document.querySelectorAll('.anim-bar');
  const effects = document.getElementById('ganttEffects');
  const effectBars = document.querySelectorAll('.effect-bar');
  let isAfter = false;

  // Initialize: set bars to "before" positions
  bars.forEach(bar => {
    bar.style.left = bar.dataset.beforeLeft + '%';
    bar.style.width = bar.dataset.beforeWidth + '%';
  });

  toggle.addEventListener('click', () => {
    isAfter = !isAfter;
    toggle.classList.toggle('active', isAfter);
    toggle.querySelector('.toggle-text').textContent = isAfter ? '◀ 導入前に戻す' : '▶ 導入後を見る';

    bars.forEach((bar, i) => {
      const state = isAfter ? 'after' : 'before';
      // Stagger the animation slightly per row
      const delay = Math.floor(i / 5) * 150;
      setTimeout(() => {
        bar.style.left = bar.dataset[state + 'Left'] + '%';
        bar.style.width = bar.dataset[state + 'Width'] + '%';
      }, delay);
    });

    // Show/hide QOL bars
    setTimeout(() => {
      effectBars.forEach(bar => {
        bar.classList.toggle('show', isAfter);
      });
    }, isAfter ? 600 : 0);

    // Show/hide effect annotations
    if (isAfter) {
      setTimeout(() => effects.classList.add('show'), 800);
    } else {
      effects.classList.remove('show');
    }
  });
})();

// Smooth scroll for anchor links (skip non-anchor hrefs like PDFs)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
