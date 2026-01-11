window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const y = window.scrollY;
  hero.style.transform = `translateY(${y * 0.2}px)`;
});

// footer year
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // typing effect
  const roles = [
    "Unity Developer",
    "Motion Graphics Editor",
    "OpenGL 3D Builder",
    "Computer Animation Learner",
    "Blender Workshop Creator",
  ];

  const el = document.getElementById("typeText");
  if (el) typeLoop(el, roles);

  // carousel
  initCarousel();

  // scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));
});

function typeLoop(el, items) {
  let i = 0, j = 0;
  let deleting = false;

  function tick(){
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

function initCarousel(){
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const dotsWrap = document.getElementById("dots");
  if (!slides.length || !dotsWrap) return;

  dotsWrap.innerHTML = "";
  slides.forEach((_, idx) => {
    const d = document.createElement("button");
    d.className = "dot" + (idx === 0 ? " active" : "");
    d.setAttribute("aria-label", "Go to slide " + (idx + 1));
    d.addEventListener("click", () => go(idx));
    dotsWrap.appendChild(d);
  });

  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
  let current = 0;
  let timer = setInterval(next, 3500);

  function go(idx){
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = idx;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    reset();
  }

  function next(){
    go((current + 1) % slides.length);
  }

  function reset(){
    clearInterval(timer);
    timer = setInterval(next, 3500);
  }

  // pause on hover
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", () => reset());
}

function initImageModal(){
  const modal = document.getElementById("imgModal");
  if (!modal) return;

  const modalImg = modal.querySelector(".modalImg");
  const caption = modal.querySelector("#modalCaption");
  const closeBtn = modal.querySelector("#modalClose");

  function open(src, alt){
    modalImg.src = src;
    modalImg.alt = alt || "preview";
    if (caption) caption.textContent = alt || src.split("/").pop();
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function close(){
    modal.classList.remove("show");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-modal='img']").forEach(img => {
    img.addEventListener("click", () => open(img.getAttribute("src"), img.getAttribute("alt")));
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  if (closeBtn) closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

document.addEventListener("mousemove", e => {
  const glow = document.getElementById("cursorGlow");
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

