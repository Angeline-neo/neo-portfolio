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
// Sidebar scrollspy
// ===========================================
const sectionGroups = document.querySelectorAll("#intro, #mission, #research, #solution, #reflection");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

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
  rootMargin: "-40% 0px -40% 0px"
});

sectionGroups.forEach((section) => observer.observe(section));

// ===========================================
// Image slider: dot navigation + drag/swipe
// ===========================================
document.querySelectorAll(".img-slider").forEach((slider) => {
   const track = slider.querySelector(".slider-track");
  const slides = slider.querySelectorAll(".slider-slide");
  const prevBtn = slider.querySelector(".slider-prev");
  const nextBtn = slider.querySelector(".slider-next");
  let currentIndex = 0;

  function updateArrows() {
    prevBtn.classList.toggle("hidden", currentIndex === 0);
    nextBtn.classList.toggle("hidden", currentIndex === slides.length - 1);
  }

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateArrows();
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
  });

  // Drag support
  let startX = 0;
  let isDragging = false;

  track.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
    track.classList.add("dragging");
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove("dragging");
    const diff = e.clientX - startX;
    if (diff < -60 && currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
    else if (diff > 60 && currentIndex > 0) goToSlide(currentIndex - 1);
    else goToSlide(currentIndex);
  });

  // Touch support
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -60 && currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
    else if (diff > 60 && currentIndex > 0) goToSlide(currentIndex - 1);
  });

  // Initialize — hide prev arrow on first load
  updateArrows();
});
