// ===========================================
// GSAP Animation: Project page entrance
// ===========================================
// This fades and scales the phone image in when the page loads.
// Same idea as the icon animation on the home page, just applied
// to this one image instead.

gsap.from(".phone-img", {
  scale: 0.8,         // starts slightly smaller than its normal size
  opacity: 0,          // starts invisible
  duration: 0.8,       // takes 0.8 seconds
  ease: "power2.out"   // starts fast, eases to a gentle stop
});

// Fade in the caption text just after the image, so it feels sequenced
gsap.from(".project-caption-wrap", {
  y: 20,               // starts 20px lower than normal position
  opacity: 0,
  duration: 0.8,
  delay: 0.3,           // waits 0.3s so it appears just after the image
  ease: "power2.out"
});

