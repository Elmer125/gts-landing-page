// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const carousel = document.querySelector('.carousel');

// Touch/swipe variables
let startX = 0;
let endX = 0;
let isDragging = false;

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((ind) => ind.classList.remove("active"));
  // Show current slide
  slides[index].classList.add("active");
  indicators[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Touch/swipe event handlers
function handleTouchStart(e) {
  startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  isDragging = true;
}

function handleTouchMove(e) {
  if (!isDragging) return;
  e.preventDefault();
}

function handleTouchEnd(e) {
  if (!isDragging) return;

  endX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
  const diffX = startX - endX;
  const threshold = 50; // Minimum distance for swipe

  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      // Swipe left - next slide
      nextSlide();
    } else {
      // Swipe right - previous slide
      prevSlide();
    }
  }

  isDragging = false;
}

// Add event listeners for touch and mouse events
carousel.addEventListener('mousedown', handleTouchStart);
carousel.addEventListener('mousemove', handleTouchMove);
carousel.addEventListener('mouseup', handleTouchEnd);
carousel.addEventListener('mouseleave', handleTouchEnd);

carousel.addEventListener('touchstart', handleTouchStart);
carousel.addEventListener('touchmove', handleTouchMove);
carousel.addEventListener('touchend', handleTouchEnd);

// Indicator clicks
indicators.forEach((ind, idx) => {
  ind.addEventListener("click", () => {
    currentSlide = idx;
    showSlide(currentSlide);
  });
});

// Auto-play carousel
setInterval(nextSlide, 8000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
  }
});

// Fade-in observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".benefit-card, .about-highlight, .service-card")
  .forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

// Button click animation
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
});

// Keyboard nav
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  else if (e.key === "ArrowRight") nextSlide();
});

// Service hover effect
document.querySelectorAll(".feature").forEach((f) => {
  f.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(10px)";
    this.style.background = "rgba(255,255,255,0.2)";
  });
  f.addEventListener("mouseleave", function () {
    this.style.transform = "translateX(0)";
    this.style.background = "rgba(255,255,255,0.1)";
  });
});

// Init
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
  setTimeout(() => {
    const hero = document.querySelector(".hero-content");
    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";
  }, 300);
});
