// ===========================================
// GSAP Animation: Case study page entrance
// ===========================================

gsap.from(".case-header", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out"
});

gsap.from(".hero-image-section", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 0.2,
  ease: "power2.out"
});

const sections = gsap.utils.toArray(".case-section");

gsap.from(sections, {
  y: 20,
  opacity: 0,
  duration: 0.6,
  stagger: 0.05,
  delay: 0.4,
  ease: "power2.out"
});

// ===========================================
// Sidebar scrollspy: highlights the active section link
// ===========================================
// Watches each id="..." wrapper and adds "active" to the matching
// sidebar link when that section is in the main viewing area.

const sectionGroups = document.querySelectorAll("#intro, #challenge, #process, #result, #reflection");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;

      sidebarLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const matchingLink = document.querySelector(`.sidebar-link[href="#${sectionId}"]`);
      if (matchingLink) {
        matchingLink.classList.add("active");
      }
    }
  });
}, {
  rootMargin: "-40% 0px -40% 0px"
});

sectionGroups.forEach((section) => {
  observer.observe(section);
});

// ===========================================
// Card stack: scroll wheel advances slides
// ===========================================
const carousel = document.querySelector('.outcome-carousel');

if (carousel) {
  const slides = carousel.querySelectorAll('.outcome-slide');
  let current = 0;
  let isAnimating = false;

  function goTo(index) {
    if (isAnimating) return;
    isAnimating = true;

    const prev = current;
    current = index;

    // Exit current slide upward
    slides[prev].classList.add('exit');
    slides[prev].classList.remove('active');

    // Enter new slide from below
    slides[current].classList.add('active');

    setTimeout(() => {
      slides[prev].classList.remove('exit');
      isAnimating = false;
    }, 500);
  }

  carousel.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (e.deltaY > 0 && current < slides.length - 1) {
      // Scroll down — next card
      goTo(current + 1);
    } else if (e.deltaY < 0 && current > 0) {
      // Scroll up — previous card
      goTo(current - 1);
    }
  }, { passive: false });
}