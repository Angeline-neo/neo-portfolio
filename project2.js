// ===========================================
// GSAP Animation: Case study page entrance
// ===========================================

// Fade the header in first
gsap.from(".case-header", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out"
});

// Fade in the hero image just after
gsap.from(".hero-image-section", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 0.2,
  ease: "power2.out"
});

// Fade in each case study section as the page loads
// (a simple version for now — scroll-triggered reveal could be added later)
const sections = gsap.utils.toArray(".case-section");

gsap.from(sections, {
  y: 20,
  opacity: 0,
  duration: 0.6,
  stagger: 0.05,
  delay: 0.4,
  ease: "power2.out"
});