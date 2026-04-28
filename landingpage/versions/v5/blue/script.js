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

// Gantt Before/After Auto-Loop Animation
(function() {
  const section = document.getElementById('ganttSection');
  if (!section) return;
  const bars = document.querySelectorAll('.anim-bar');
  const effects = document.getElementById('ganttEffects');
  const effectBars = document.querySelectorAll('.effect-bar');
  const label = document.getElementById('ganttLabel');
  const vitalBars = document.querySelectorAll('.anim-bar.vital');
  let loopTimer = null;
  let isRunning = false;

  // Initialize: set bars to "before" positions
  function setBefore() {
    bars.forEach(bar => {
      bar.style.left = bar.dataset.beforeLeft + '%';
      bar.style.width = bar.dataset.beforeWidth + '%';
      bar.classList.remove('is-after');
    });
    // Restore vital bar text
    vitalBars.forEach(bar => {
      bar.innerHTML = 'バイタルサイン<br>測定';
    });
    effectBars.forEach(bar => bar.classList.remove('show'));
    effects.classList.remove('show');
    label.className = 'gantt-label gantt-label-before';
    label.textContent = '❌ 導入前';
  }

  function setAfter() {
    // Animate bars to "after" positions with stagger per row
    bars.forEach((bar, i) => {
      const delay = Math.floor(i / 5) * 150;
      setTimeout(() => {
        bar.style.left = bar.dataset.afterLeft + '%';
        bar.style.width = bar.dataset.afterWidth + '%';
        if (bar.classList.contains('vital')) {
          bar.classList.add('is-after');
          bar.innerHTML = '<img src="images/logo/VitalDXrPPG-02.png" alt="Vital DX rPPG" style="height:38px;width:auto;">';
        }
      }, delay);
    });
    // Update label
    setTimeout(() => {
      label.className = 'gantt-label gantt-label-after';
      label.textContent = '✅ 導入後';
    }, 300);
    // Show QOL bars
    setTimeout(() => {
      effectBars.forEach(bar => bar.classList.add('show'));
    }, 600);
    // Show effect annotations
    setTimeout(() => effects.classList.add('show'), 800);
  }

  function startLoop() {
    if (isRunning) return;
    isRunning = true;
    setBefore();

    function cycle() {
      // Wait 2s showing "before", then animate to "after"
      loopTimer = setTimeout(() => {
        setAfter();
        // Stay "after" for 10s (enough to read all effects), then reset
        loopTimer = setTimeout(() => {
          setBefore();
          // Wait 1.5s then restart cycle
          loopTimer = setTimeout(cycle, 1500);
        }, 10000);
      }, 2000);
    }
    cycle();
  }

  function stopLoop() {
    isRunning = false;
    clearTimeout(loopTimer);
  }

  // Start animation when section scrolls into view
  const ganttObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startLoop();
      } else {
        stopLoop();
        setBefore();
      }
    });
  }, { threshold: 0.3 });

  ganttObserver.observe(section);
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
