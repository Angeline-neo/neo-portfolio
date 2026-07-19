// ===========================================
// GSAP Animation: About Me page entrance
// ===========================================

// Fade the bio text up into place
gsap.from(".about-content", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out"
});

// Pop in each photo box, one after another, slightly after the text
const photoBoxes = gsap.utils.toArray(".photo-box");

gsap.from(photoBoxes, {
  scale: 0.8,
  opacity: 0,
  duration: 0.5,
  ease: "power2.out",
  stagger: 0.08,    // each box starts 0.08s after the previous one
  delay: 0.3
});