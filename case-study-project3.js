// ===========================================
// GSAP Animation: Case study page entrance
// ===========================================

gsap.from(".case-header", {
  y: 20, opacity: 0, duration: 0.8, ease: "power2.out"
});

gsap.from(".hero-image-section", {
  y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: "power2.out"
});

const sections = gsap.utils.toArray(".case-section");
gsap.from(sections, {
  y: 20, opacity: 0, duration: 0.6, stagger: 0.05, delay: 0.4, ease: "power2.out"
});

// ===========================================
// Sidebar scrollspy
// ===========================================
const sectionGroups = document.querySelectorAll("#intro, #mission, #scope, #concept, #final-product, #results");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebarLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      sidebarLinks.forEach((link) => link.classList.remove("active"));
      const matchingLink = document.querySelector(`.sidebar-link[href="#${sectionId}"]`);
      if (matchingLink) matchingLink.classList.add("active");
    }
  });
}, {
  rootMargin: "-20% 0px -20% 0px"
});

sectionGroups.forEach((section) => observer.observe(section));

// ===========================================
// News slider: dot navigation + drag/swipe
// ===========================================
const newsSlider = document.querySelector('.news-slider');

if (newsSlider) {
  const track = newsSlider.querySelector('.news-track');
  const slides = newsSlider.querySelectorAll('.news-slide');
  const dots = newsSlider.querySelectorAll('.news-dot');
  const visibleCount = 1;
  const maxIndex = slides.length - visibleCount;
  let currentIndex = 0;
  let isAnimating = false;

  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    // Clamp to valid range
    if (index > maxIndex) currentIndex = 0;
    else if (index < 0) currentIndex = maxIndex;
    else currentIndex = index;

    const slideWidth = slides[0].offsetWidth;
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));

    setTimeout(() => { isAnimating = false; }, 520);
  }

  // Dot clicks
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
    });
  });

  // Mouse wheel — scroll down goes right, scroll up goes left
  newsSlider.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY > 30) goToSlide(currentIndex + 1);
    else if (e.deltaY < -30) goToSlide(currentIndex - 1);
  }, { passive: false });
}