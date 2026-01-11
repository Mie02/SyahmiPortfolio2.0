// -------------------------
// Helpers
// -------------------------
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

// -------------------------
// Parallax (SAFE)
// -------------------------
window.addEventListener("scroll", () => {
  const hero = $(".hero");
  if (!hero) return;
  const y = window.scrollY || 0;
  hero.style.transform = `translateY(${y * 0.2}px)`;
});

// -------------------------
// DOM Ready
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  // footer year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // typing effect
  const roles = [
    "Unity Developer",
    "Motion Graphics Editor",
    "OpenGL 3D Builder",
    "Computer Animation Learner",
    "Blender Workshop Creator",
  ];
  const el = $("#typeText");
  if (el) typeLoop(el, roles);

  // carousel
  initCarousel();

  // scroll reveal (FIXED: uses 'active' to match your CSS)
  initReveal();

  // cursor glow safe
  initCursorGlow();
});

// -------------------------
// Typing loop
// -------------------------
function typeLoop(el, items) {
  let i = 0, j = 0, deleting = false;

  function tick() {
    const word = items[i];
    el.textContent = word.slice(0, j);

    if (!deleting) {
      j++;
      if (j > word.length) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
    } else {
      j--;
      if (j === 0) {
        deleting = false;
        i = (i + 1) % items.length;
      }
    }

    setTimeout(tick, deleting ? 40 : 55);
  }

  tick();
}

// -------------------------
// Reveal
// -------------------------
function initReveal() {
  const reveals = $$(".reveal");
  if (!reveals.length) return;

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((r) => r.classList.add("active"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((r) => io.observe(r));
}

// -------------------------
// Carousel
// -------------------------
function initCarousel() {
  const carousel = $("#carousel");
  const dotsWrap = $("#dots");
  if (!carousel || !dotsWrap) return;

  const slides = Array.from(carousel.querySelectorAll(".slide"));
  if (!slides.length) return;

  dotsWrap.innerHTML = "";

  slides.forEach((_, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dot" + (idx === 0 ? " active" : "");
    b.addEventListener("click", () => go(idx));
    dotsWrap.appendChild(b);
  });

  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
  let current = 0;
  let timer = setInterval(next, 3500);

  function go(idx) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = idx;

    slides[current].classList.add("active");
    dots[current].classList.add("active");

    reset();
  }

  function next() {
    go((current + 1) % slides.length);
  }

  function reset() {
    clearInterval(timer);
    timer = setInterval(next, 3500);
  }

  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", reset);
}

// -------------------------
// Cursor glow (SAFE)
// -------------------------
function initCursorGlow() {
  const glow = $("#cursorGlow");
  if (!glow) return;

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}
