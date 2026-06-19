// =============================================
// FUTURISTIC PORTFOLIO â€” script.js v3.0
// =============================================

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

// â”€â”€â”€ DOM Ready â”€â”€â”€
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  setYear();
  initHudClock();
  initNav();
  initHamburger();
  initTyping();
  initCarousel();
  initReveal();
  initCursorGlow();
  initLightbox();
  initImageFallback();
  init3DCardTilt();
  initScrollProgress();
  initParticleCanvas();
  initHudStatusBar();
});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PAGE LOADER
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initLoader() {
  const loader = $('#pageLoader');
  if (!loader) return;

  const texts = ['Initializing...', 'Loading assets...', 'Rendering scene...', 'Online.'];
  let idx = 0;
  const textEl = loader.querySelector('.loader-text');

  const cycle = setInterval(() => {
    idx++;
    if (textEl && texts[idx]) textEl.textContent = texts[idx];
    if (idx >= texts.length - 1) {
      clearInterval(cycle);
      setTimeout(() => {
        loader.classList.add('hidden');
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      }, 300);
    }
  }, 400);
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// FOOTER YEAR
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function setYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// HUD CLOCK (live time display)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initHudClock() {
  const clockEls = [document.getElementById('hudTime'), document.getElementById('hudTimeBar')];

  function tick() {
    const now = new Date();
    const str = now.toLocaleTimeString('en-GB', { hour12: false });
    clockEls.forEach(el => { if (el) el.textContent = str; });
  }

  tick();
  setInterval(tick, 1000);
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// STICKY NAV
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initNav() {
  const nav = $('#navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// HAMBURGER / MOBILE MENU
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initHamburger() {
  const btn  = $('#hamburger');
  const menu = $('#mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  });

  $$('a', menu).forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
      menu.setAttribute('aria-hidden', true);
    });
  });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TYPEWRITER
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initTyping() {
  const el = $('#typeText');
  if (!el) return;

  const roles = [
    'Unity Developer',
    'Motion Graphics Editor',
    'OpenGL 3D Builder',
    'Computer Animator',
    'Blender Workshop Creator',
    'Creative Technologist',
  ];

  let i = 0, j = 0, deleting = false;

  function tick() {
    const word = roles[i];
    el.textContent = word.slice(0, j);

    if (!deleting) {
      j++;
      if (j > word.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      j--;
      if (j === 0) {
        deleting = false;
        i = (i + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CAROUSEL
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initCarousel() {
  const carousel = $('#carousel');
  const dotsWrap = $('#dots');
  if (!carousel || !dotsWrap) return;

  const slides = $$('.slide', carousel);
  if (!slides.length) return;

  dotsWrap.innerHTML = '';
  slides.forEach((_, idx) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dot' + (idx === 0 ? ' active' : '');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Slide ${idx + 1}`);
    b.addEventListener('click', () => go(idx));
    dotsWrap.appendChild(b);
  });

  const dots = $$('.dot', dotsWrap);
  let current = 0;
  let timer = setInterval(next, 4500);

  function go(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    reset();
  }

  function next() { go((current + 1) % slides.length); }
  function prev() { go((current - 1 + slides.length) % slides.length); }
  function reset() { clearInterval(timer); timer = setInterval(next, 4500); }

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', reset);

  const btnNext = $('#carouselNext');
  const btnPrev = $('#carouselPrev');
  if (btnNext) { btnNext.addEventListener('click', () => { next(); reset(); }); }
  if (btnPrev) { btnPrev.addEventListener('click', () => { prev(); reset(); }); }

  // Touch
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); reset(); }
  });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SCROLL REVEAL
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initReveal() {
  const elements = $$('.reveal');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('active'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('active'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  elements.forEach(el => io.observe(el));
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CURSOR GLOW + DOT
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initCursorGlow() {
  const glow = $('#cursorGlow');
  const dot  = $('#cursorDot');
  if (!glow) return;

  if (window.matchMedia('(pointer: coarse)').matches) {
    glow.style.display = 'none';
    if (dot) dot.style.display = 'none';
    return;
  }

  let mx = 0, my = 0;
  let gx = 0, gy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (dot) {
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    }
  }, { passive: true });

  // Smooth glow follow
  function animGlow() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(animGlow);
  }
  animGlow();

  // Dot scale on click
  document.addEventListener('mousedown', () => {
    if (dot) dot.style.transform = 'translate(-50%,-50%) scale(2)';
  });
  document.addEventListener('mouseup', () => {
    if (dot) dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });

  // Expand glow on interactive elements
  const interactives = 'a, button, .project-card, .stat, .skill-tags span, .chip, .skill-ring-item, .bio-info-item';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      glow.style.width  = '600px';
      glow.style.height = '600px';
      if (dot) {
        dot.style.width  = '16px';
        dot.style.height = '16px';
        dot.style.background = 'transparent';
        dot.style.border = '1.5px solid var(--blue)';
      }
    } else {
      glow.style.width  = '400px';
      glow.style.height = '400px';
      if (dot) {
        dot.style.width  = '8px';
        dot.style.height = '8px';
        dot.style.background = 'var(--blue)';
        dot.style.border = 'none';
      }
    }
  }, { passive: true });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 3D CARD TILT
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function init3DCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

  const cards = $$('.project-card-wrap');

  cards.forEach(wrap => {
    const card = wrap.querySelector('.project-card');
    if (!card) return;

    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;

      const tiltX = -dy * 10;
      const tiltY = dx * 10;

      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
      card.style.boxShadow = `
        ${-tiltY * 2}px ${tiltX * 2}px 40px rgba(0,0,0,.5),
        0 0 30px rgba(0,255,255,${Math.abs(dx) * .15 + .05})
      `;
    });

    wrap.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SCROLL PROGRESS (HUD bar)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initScrollProgress() {
  const el = document.getElementById('hudScroll');
  if (!el) return;

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = Math.round((window.scrollY / (h.scrollHeight - h.clientHeight)) * 100) || 0;
    el.textContent = `SCROLL: ${pct}%`;
  }, { passive: true });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// HUD STATUS BAR update (already handled by clock)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initHudStatusBar() {
  // Handled by initHudClock() and initScrollProgress()
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PARTICLE CANVAS â€” cyberpunk Ã— space background
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initParticleCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], frameId;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Cyberpunk color hues: magenta=300, purple=280, cyan=185, pink=330
  const HUES = [210, 195, 185, 200, 220]; // Electric blue hues

  const COUNT = Math.min(140, Math.floor(W * H / 12000));

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.4 + 0.3,
      vx:    (Math.random() - 0.5) * 0.2,
      vy:    (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      hue: HUES[Math.floor(Math.random() * HUES.length)],
    });
  }

  let mouseX = W / 2, mouseY = H / 2;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function draw() {
    // Deep cyberpunk space BG
    ctx.fillStyle = '#05020f';
    ctx.fillRect(0, 0, W, H);

    // Central deep space nebula glow
    const grad = ctx.createRadialGradient(W * .5, H * .3, 0, W * .5, H * .3, W * 0.6);
    grad.addColorStop(0,   'rgba(0,60,120,.08)');
    grad.addColorStop(0.5, 'rgba(0,30,80,.05)');
    grad.addColorStop(1,   'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Mouse magenta glow
    const mGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
    mGrad.addColorStop(0, 'rgba(0,170,255,.06)');
    mGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = mGrad;
    ctx.fillRect(0, 0, W, H);

    // Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, ${p.alpha})`;
      ctx.fill();
    });

    // Connect lines â€” magenta/cyan tones
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = 110;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          const hue = (particles[i].hue + particles[j].hue) / 2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    frameId = requestAnimationFrame(draw);
  }

  draw();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frameId);
    else draw();
  });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// LIGHTBOX
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initLightbox() {
  let lb      = $('#lightbox');
  let lbImg   = $('#lightboxImg');
  let lbClose = $('#lightboxClose');

  if (!lb) {
    const div = document.createElement('div');
    div.innerHTML = `
      <div id="lightbox" class="lightbox" aria-hidden="true" role="dialog" aria-modal="true">
        <button class="lightboxClose" id="lightboxClose" aria-label="Close (Esc)">&times;</button>
        <img id="lightboxImg" alt="Zoomed image" />
        <div class="lightboxHint">Click outside or press Esc to close</div>
      </div>`;
    document.body.appendChild(div.firstElementChild);
    lb      = $('#lightbox');
    lbImg   = $('#lightboxImg');
    lbClose = $('#lightboxClose');
  }

  function open(src, alt) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || 'Zoomed image';
    lb.style.display = 'flex';
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('noScroll');
    lbClose && lbClose.focus();
  }

  function close() {
    if (!lb) return;
    lb.style.display = 'none';
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('noScroll');
    if (lbImg) lbImg.src = '';
  }

  document.addEventListener('click', e => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.classList.contains('zoomable') || t.getAttribute('data-modal') === 'img') {
      const src = (t instanceof HTMLImageElement)
        ? (t.dataset.zoom || t.currentSrc || t.src)
        : '';
      if (src) open(src, t.alt);
    }
  });

  lb?.addEventListener('click', e => { if (e.target === lb) close(); });
  lbImg?.addEventListener('click', e => e.stopPropagation());
  lbClose?.addEventListener('click', e => { e.preventDefault(); close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// IMAGE FALLBACK
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initImageFallback() {
  $$('img').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      img.src = img.src.includes('images/')
        ? img.src.replace(/images\/[^/]+$/, 'images/placeholder.png')
        : 'images/placeholder.png';
    });
  });
}

