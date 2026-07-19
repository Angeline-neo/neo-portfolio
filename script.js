// ===========================================
// GSAP Animation: Homepage entrance animation
// ===========================================
// gsap.from(...) means: "start the element looking like THIS,
// then animate it to its normal CSS state."

// ============================================
// WAVE BACKGROUND
// ============================================
const canvas = document.getElementById('wave-canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resizeCanvas() {
  width = canvas.width = canvas.offsetWidth;
  height = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let time = 0;

function drawWaves() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(208, 206, 203, 0.45)';
  ctx.lineWidth = 0.8;

  const gap = height / 12;

  for (let i = 1; i <= 18; i++) {
    const baseY = gap * i;
    const phaseOffset = i * 0.6;
    ctx.beginPath();

    for (let x = 0; x <= width; x += 2) {
      const y = baseY + 25 * Math.sin(x * 0.008 + time + phaseOffset);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  time += 0.010;
  requestAnimationFrame(drawWaves);
}

drawWaves();

// ============================================
// ENTRANCE ANIMATIONS
// ============================================
// Typing effect removed — headlines now simply fade in, same as
// the rest of the hero elements below.

gsap.to('.site-name-label', { opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.2 });

gsap.to('.hero-headline', {
  opacity: 1,
  duration: 0.8,
  ease: 'power2.out',
  delay: 0.5
});

gsap.to('.footer-left', { opacity: 0.6, duration: 0.7, ease: 'power2.out', delay: 1.2 });
gsap.to('.footer-right', { opacity: 0.6, duration: 0.7, ease: 'power2.out', delay: 1.2 });
gsap.to('.footer-arrow', { opacity: 0.5, duration: 0.7, ease: 'power2.out', delay: 1.4 });
gsap.to('.footer-arrow', { y: 6, repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut', delay: 2.2 });

// 2. Fade and pop in each icon, one after another
//    gsap.utils.toArray grabs every element with class "icon" as a list
const icons = gsap.utils.toArray(".icon");

gsap.from(icons, {
  scale: 0,          // each icon starts at 0 size (invisible)
  opacity: 0,
  duration: 0.6,
  ease: "back.out(1.7)", // slight "pop" overshoot, like a bounce
  stagger: 0.1,           // each icon starts 0.1s after the previous one
  delay: 0.3              // wait 0.3s after page load before starting
});


// tooltip

const projectCards = document.querySelectorAll(".project-section-1, .project-section-2, .project-section-3");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    // getBoundingClientRect tells us where this card sits on the page,
    // so we can calculate the mouse position RELATIVE to the card itself,
    // rather than relative to the whole browser window.
    const cardBounds = card.getBoundingClientRect();
    const x = event.clientX - cardBounds.left;
    const y = event.clientY - cardBounds.top;
 
    // Set the CSS variables that .hover-hint's top/left use
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// ===========================================
// GSAP Animation: Photo card follows cursor on hero text hover
// ===========================================

const heroText = document.querySelector(".hero-text");
const photoCard = document.querySelector(".photo-card");


// Show the card when mouse enters the headline
heroText.addEventListener("mouseenter", () => {
  gsap.to(photoCard, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: "power2.out"
  });
});

// Hide the card when mouse leaves the headline
heroText.addEventListener("mouseleave", () => {
  gsap.to(photoCard, {
    opacity: 0,
    scale: 0.9,
    duration: 0.2,
    ease: "power2.in"
  });
});

// ============================================
// HERO CARD: full screen on load, zoom out on scroll
// ============================================
const heroCard = document.querySelector('.hero-card');

// Start full screen
gsap.set(heroCard, {
  borderRadius: 0,
  marginLeft: 0,
  marginRight: 0,
  maxWidth: '100%',
});

// Zoom out to original card size on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const progress = Math.min(scrollY / 400, 1); // 400px of scroll = full transition

  gsap.to(heroCard, {
    borderRadius: progress * 4,
    marginLeft: progress * 80,
    marginRight: progress * 80,
    duration: 0.1,
    ease: 'none'
  });
});

