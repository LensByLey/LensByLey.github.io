document.addEventListener('DOMContentLoaded', function () {
  const slidesContainer = document.querySelector('.slides');
  const imageCount = 13;
  const folderPath = './porfolio/'; // Ensure this matches your folder structure

  // Create fullscreen container
  const fullscreenContainer = document.createElement('div');
  fullscreenContainer.className = 'fullscreen-container';
  document.body.appendChild(fullscreenContainer);

  for (let i = 1; i <= imageCount; i++) {
    const slide = document.createElement('li');
    slide.className = 'slide';
    if (i === 1) slide.classList.add('active');
    
    // Add click event to each image
    const img = document.createElement('img');
    img.src = `${folderPath}${i}.jpg`;
    img.alt = `Portfolio Image ${i}`;
    img.className = 'portfolio-image';
    
    // Add click handler for fullscreen view
    img.addEventListener('click', function() {
      fullscreenContainer.innerHTML = `
        <div class="fullscreen-overlay">
          <img src="${this.src}" alt="${this.alt}">
        </div>
      `;
      fullscreenContainer.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling

      // Add click event to close fullscreen when clicking anywhere
      fullscreenContainer.addEventListener('click', () => {
        fullscreenContainer.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
      });
    });
    
    slide.appendChild(img);
    slidesContainer.appendChild(slide);
  }

  // Carousel Navigation Logic
  const buttons = document.querySelectorAll("[data-carousel-button]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      const slides = slidesContainer.querySelectorAll(".slide");
      const activeSlide = slidesContainer.querySelector(".active");

      if (!activeSlide) {
        console.error("No active slide found.");
        return;
      }

      let newIndex = [...slides].indexOf(activeSlide) + offset;

      // Loop back to start/end if out of bounds
      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;

      slides[newIndex].classList.add("active");
      activeSlide.classList.remove("active");
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Simplified parallax effect for hero section
  const hero = document.querySelector('.hero');
  let isScrolling = false;
});

document.querySelector('.footer-cta').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default anchor jump
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll effect
  });
});