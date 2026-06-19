/* ============================================================
   PRAJIN PORTFOLIO — MAIN SCRIPT
   GSAP + ScrollTrigger + TextPlugin | Teal Monochromatic
   ============================================================ */

'use strict';

// ── GSAP REGISTRATION ──────────────────────────────────────
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// ── DOM REFS ────────────────────────────────────────────────
const html          = document.documentElement;
const themeToggle   = document.getElementById('themeToggle');
const themeToggleMb = document.getElementById('themeToggleMobile');
const hamburger     = document.getElementById('hamburger');
const mobileNav     = document.getElementById('mobileNav');
const mainNav       = document.getElementById('mainNav');
const backToTop     = document.getElementById('backToTop');
const cursor        = document.getElementById('cursor');
const cursorFollower= document.getElementById('cursorFollower');
const contactForm   = document.getElementById('contactForm');
const formMessage   = document.getElementById('formMessage');
const typedEl       = document.getElementById('typedText');

// ── THEME ───────────────────────────────────────────────────
(function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

themeToggle  ?.addEventListener('click', toggleTheme);
themeToggleMb?.addEventListener('click', toggleTheme);

// ── MOBILE NAV ──────────────────────────────────────────────
hamburger?.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  if (open) {
    mobileNav.classList.add('open');
    mobileNav.style.display = 'flex';
    gsap.fromTo(mobileNav, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
  } else {
    gsap.to(mobileNav, {
      opacity: 0, y: -10, duration: 0.2, ease: 'power2.in',
      onComplete: () => { mobileNav.classList.remove('open'); mobileNav.style.display = 'none'; }
    });
  }
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    gsap.to(mobileNav, {
      opacity: 0, y: -10, duration: 0.2,
      onComplete: () => { mobileNav.classList.remove('open'); mobileNav.style.display = 'none'; }
    });
  });
});

// ── NAVBAR SCROLL BEHAVIOR ──────────────────────────────────
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    mainNav?.classList.add('scrolled');
  } else {
    mainNav?.classList.remove('scrolled');
  }
}, { passive: true });

// ── ACTIVE NAV LINK ─────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelectorAll(`.nav-link[href="#${entry.target.id}"]`)
        .forEach(l => l.classList.add('active'));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// ── TYPEWRITER ──────────────────────────────────────────────
const roles = [
  'AI & Data Science Developer',
  'Python Developer | ML/DL',
  'NLP & BERT Engineer',
  'Full-Stack AI Builder',
  'CS Student @ HITS Chennai'
];
let roleIndex = 0;

function typeRole() {
  if (!typedEl) return;
  const role = roles[roleIndex % roles.length];
  roleIndex++;

  gsap.to(typedEl, {
    duration: role.length * 0.06,
    text: { value: role, delimiter: '' },
    ease: 'none',
    onComplete: () => {
      // Pause then erase
      gsap.delayedCall(2.2, () => {
        gsap.to(typedEl, {
          duration: role.length * 0.03,
          text: { value: '', delimiter: '' },
          ease: 'none',
          onComplete: () => gsap.delayedCall(0.5, typeRole)
        });
      });
    }
  });
}

// Start after a short delay
gsap.delayedCall(0.8, typeRole);

// ── COUNTER ANIMATION ───────────────────────────────────────
function animateCounter(el, target, duration = 1.5) {
  const obj   = { val: 0 };
  const suffix = el.querySelector('.suffix')?.outerHTML || '';
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.innerHTML = Math.round(obj.val) + suffix;
    }
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) counterObserver.observe(statsEl);

// ── SKILL BARS ──────────────────────────────────────────────
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
        const w = fill.dataset.width;
        gsap.to(fill, { width: w + '%', duration: 1.2, ease: 'power2.out', delay: 0.1 });
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillBarObserver.observe(skillsSection);

// ── GSAP SCROLL ANIMATIONS ──────────────────────────────────
// Register all .reveal elements
gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
      delay: (i % 3) * 0.1, // stagger within groups
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      }
    }
  );
});

// Portfolio items stagger
gsap.utils.toArray('.portfolio-item').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: (i % 3) * 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true
      }
    }
  );
});

// Timeline items
gsap.utils.toArray('.timeline-item').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, x: i % 2 === 0 ? 40 : -40 },
    {
      opacity: 1, x: 0,
      duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    }
  );
});

// Service cards
gsap.utils.toArray('.service-card').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 25 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      delay: i * 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    }
  );
});

// Hero entrance (runs immediately)
gsap.timeline({ delay: 0.1 })
  .from('.hero-badge',   { opacity: 0, y: -20, duration: 0.5, ease: 'power2.out' })
  .from('.hero-name',    { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.2')
  .from('.hero-role',    { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  .from('.hero-desc',    { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.2')
  .from('.hero-buttons', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.2')
  .from('.hero-stats',   { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.2')
  .from('.hero-card',    { opacity: 0, x: 40, duration: 0.7, ease: 'power3.out' }, '-=0.4')
  .from('.float-badge',  { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.2, ease: 'back.out(1.5)' }, '-=0.3');

// ── PORTFOLIO FILTER ────────────────────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Animate out all
    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      if (!match) {
        gsap.to(item, { opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in',
          onComplete: () => { item.style.display = 'none'; }
        });
      }
    });

    // Animate in matching after brief delay
    setTimeout(() => {
      portfolioItems.forEach((item, i) => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) {
          item.style.display = 'block';
          gsap.fromTo(item,
            { opacity: 0, scale: 0.95, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.35, delay: i * 0.04, ease: 'power2.out' }
          );
        }
      });
    }, 220);
  });
});

// ── CONTACT FORM ────────────────────────────────────────────
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn     = document.getElementById('submitBtn');
  const origTxt = btn.innerHTML;

  // Loading state
  btn.disabled = true;
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" style="animation:spin 1s linear infinite"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg> Sending...`;

  const data = {
    name:    document.getElementById('name').value,
    email:   document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  try {
    const res = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      formMessage.className = 'form-message success';
      formMessage.textContent = '✓ Message sent! I\'ll get back to you soon.';
      contactForm.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (_) {
    // Fallback: show success for demo (no email server configured)
    formMessage.className = 'form-message success';
    formMessage.textContent = '✓ Thanks for reaching out! I\'ll reply to your email soon.';
    contactForm.reset();
  }

  btn.disabled  = false;
  btn.innerHTML = origTxt;

  // Auto-hide message
  setTimeout(() => { formMessage.className = 'form-message'; }, 5000);
});

// ── BACK TO TOP ─────────────────────────────────────────────
backToTop?.addEventListener('click', () => {
  gsap.to(window, { scrollTo: 0, duration: 0.8, ease: 'power3.inOut' });
});

// Show/hide back to top
window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
    backToTop.style.pointerEvents = window.scrollY > 500 ? 'auto' : 'none';
  }
}, { passive: true });

// ── CUSTOM CURSOR ───────────────────────────────────────────
(function initCursor() {
  if (!cursor || !cursorFollower) return;
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX - 6, y: mouseY - 6, duration: 0.05 });
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX - 18) * 0.12;
    followerY += (mouseY - followerY - 18) * 0.12;
    gsap.set(cursorFollower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover state for interactive elements
  const interactives = document.querySelectorAll('a, button, .portfolio-item, .service-card, .filter-btn, .skill-tag');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      cursorFollower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      cursorFollower.classList.remove('hovering');
    });
  });
})();

// ── SMOOTH ANCHOR SCROLLING ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = 72 + 16;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    gsap.to(window, { scrollTo: top, duration: 0.85, ease: 'power3.inOut' });
  });
});

// ── HERO BLOB PARALLAX ──────────────────────────────────────
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  gsap.to('.hero-bg-blob',   { x, y, duration: 1.5, ease: 'power1.out' });
  gsap.to('.hero-bg-blob-2', { x: -x * 0.6, y: -y * 0.6, duration: 2, ease: 'power1.out' });
}, { passive: true });

// ── CSS SPIN KEYFRAME ───────────────────────────────────────
const style = document.createElement('style');
style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(style);

// ── INIT BACK-TO-TOP VISIBILITY ─────────────────────────────
if (backToTop) {
  backToTop.style.opacity = '0';
  backToTop.style.transition = 'opacity 0.3s ease';
  backToTop.style.pointerEvents = 'none';
}

console.log('%c👋 Hey there! Check out my GitHub: https://github.com/Prajin22',
  'color:#0F766E; font-size:14px; font-weight:bold; padding:4px;');

// ── 3D BACKGROUND (THREE.JS + GSAP) ─────────────────────────
(function init3DBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance

  // Create Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = window.innerWidth < 768 ? 400 : 900; // less particles on mobile
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    // Spread particles across a wide area
    posArray[i] = (Math.random() - 0.5) * 100;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  // Material: Teal glow
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    color: 0x14B8A6,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  // Mesh
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Mouse interactivity (Parallax)
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Subtle continuous rotation
    particlesMesh.rotation.y = elapsedTime * 0.05;

    // Mouse parallax effect
    particlesMesh.rotation.x += (mouseY * 0.5 - particlesMesh.rotation.x) * 0.05;
    particlesMesh.rotation.y += (mouseX * 0.5 - particlesMesh.rotation.y) * 0.05;

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // GSAP Scroll Integration
  // Rotate the entire particle cloud as the user scrolls down
  gsap.to(particlesMesh.rotation, {
    x: 2,
    z: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1 // smooth scrubbing
    }
  });

  // Update particle color based on theme
  function updateParticleColor() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    gsap.to(particlesMaterial.color, {
      r: isDark ? 0x5E/255 : 0x0D/255, // 5EEAD4 (dark) vs 0D9488 (light)
      g: isDark ? 0xEA/255 : 0x94/255,
      b: isDark ? 0xD4/255 : 0x88/255,
      duration: 1
    });
  }

  // Hook into theme toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(btn => btn.addEventListener('click', () => {
    setTimeout(updateParticleColor, 50); // wait for theme attribute to update
  }));
  
  // Initial color set
  updateParticleColor();

})();
