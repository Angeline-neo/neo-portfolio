// ===========================================
// Lightbox interaction: click a box to open, click X to close
// ===========================================

const galleryBoxes = document.querySelectorAll(".gallery-box");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

// ---- OPENING THE LIGHTBOX ----
galleryBoxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    const clickedBox = e.currentTarget;
    const imageSource = clickedBox.dataset.full;
    const captionText = clickedBox.dataset.caption;

    lightboxImg.src = imageSource;
    lightboxCaption.textContent = captionText;
    lightbox.classList.add("active");

    gsap.from(lightboxImg, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});

// ---- CLOSING THE LIGHTBOX ----
lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("active");
  }
});