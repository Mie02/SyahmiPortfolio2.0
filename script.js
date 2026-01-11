// ============================
// Safe helpers
// ============================
function $(sel) {
  return document.querySelector(sel);
}
function $all(sel) {
  return Array.from(document.querySelectorAll(sel));
}

// ============================
// Parallax (safe)
// ============================
window.addEventListener("scroll", () => {
  const hero = $(".hero");
  if (!hero) return; // prevents crash on pages without .hero
  const y = window.scrollY || 0;
  hero.style.transform = `translateY(${y * 0.2}px)`;
});

// ============================
// DOM Ready
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // typing effect
  const roles = [
    "Unity Developer",
    "Motion Graphics Editor",
    "OpenGL 3D Builder",
    "Computer Animation Learner",
    "Blender Workshop Creator",
  ];

  const typeEl = $("#typeText");
  if (typeEl) typeLoop(typeEl, roles);

  // carousel
  initCarousel();

  // image modal (only if your page has it)
  initImageModal();

  // scroll reveal (FIXED: uses 'active' to match your CSS)
  initReveal();
});

// ============================
// Typing loop
// ============================
function typeLoop(el, items) {
  let i = 0, j = 0;
  let deleting = false;

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

// ============================
// Carousel
// ============================
function initCarousel() {
  const carousel = $("#carousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const dotsWrap = $("#dots");
  if (!slides.length || !dotsWrap) return;

  dotsWrap.innerHTML = "";
  slides.forEach((_, idx) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "dot" + (idx === 0 ? " active" : "");
    d.setAttribute("aria-label", "Go to slide " + (idx + 1));
    d.addEventListener("click", () => go(idx));
    dotsWrap.appendChild(d);
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

  // pause on hover
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", reset);
}

// ============================
// Scroll reveal (FIXED)
// ============================
function initReveal() {
  const reveals = $all(".reveal");
  if (!reveals.length) return;

  // If browser doesn't support IntersectionObserver, just show all
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(el => el.classList.add("active"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("active"); // <-- matches CSS
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));
}

// ============================
// Image modal (optional)
// ============================
function initImageModal() {
  const modal = $("#imgModal");
  if (!modal) return;

  const modalImg = modal.querySelector(".modalImg");
  const caption = modal.querySelector("#modalCaption");
  const closeBtn = modal.querySelector("#modalClose");
  if (!modalImg) return;

  function open(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || "preview";
    if (caption) caption.textContent = alt || src.split("/").pop();
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function close() {
    modal.classList.remove("show");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-modal='img']").forEach(img => {
    img.addEventListener("click", () =>
      open(img.getAttribute("src"), img.getAttribute("alt"))
    );
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  if (closeBtn) closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// ============================
// Cursor glow (safe)
// ============================
document.addEventListener("mousemove", (e) => {
  const glow = $("#cursorGlow");
  if (!glow) return; // prevents crash if missing on other pages
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
