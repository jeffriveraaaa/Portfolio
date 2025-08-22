// ======================
// Slideshow (auto)
// ======================
let slideIndex = 0;
function showSlides() {
  const slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }
  setTimeout(showSlides, 4000);
}
showSlides();

// ======================
// Sticky Navbar
// ======================
const header = document.querySelector("header");
const navbar = document.getElementById("main-nav");
if (navbar) {
  let navPos = navbar.getBoundingClientRect().top;

  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY;
    if (scrollPos > navPos) {
      navbar.classList.add("sticky");
      if (header) header.classList.add("navbarOffsetMargin");
    } else {
      navbar.classList.remove("sticky");
      if (header) header.classList.remove("navbarOffsetMargin");
    }
  });
}

// ======================
// Anime.js Text Animations
// ======================
let textWrapper2 = document.querySelector(".ml2");
if (textWrapper2) {
  textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline({ loop: true })
    .add({
      targets: ".ml2 .letter",
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 950,
      delay: (el, i) => 70 * i
    }).add({
      targets: ".ml2",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
}

let textWrapper12 = document.querySelector(".ml12");
if (textWrapper12) {
  textWrapper12.innerHTML = textWrapper12.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline({ loop: true })
    .add({
      targets: ".ml12 .letter",
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i
    }).add({
      targets: ".ml12 .letter",
      translateX: [0, -30],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1100,
      delay: (el, i) => 100 + 30 * i
    });
}

// ======================
// Canvas Background Animation
// ======================
const canvas = document.getElementById("myCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const boundaryX = canvas.width = window.innerWidth;
  const boundaryY = canvas.height = window.innerHeight;

  const velocity2 = 0.5;
  const points = [];

  function init() {
    for (let i = 0; i < 100; i++) {
      createPoint();
    }
    requestAnimationFrame(update);
  }

  function createPoint() {
    let point = {};
    point.x = Math.random() * boundaryX;
    point.y = Math.random() * boundaryY;
    point.vx = (Math.random() * 2 - 1); // fixed random velocity
    let vx2 = Math.pow(point.vx, 2);
    let vy2 = velocity2 - vx2;
    point.vy = Math.sqrt(Math.abs(vy2)) * (Math.random() * 2 - 1);
    points.push(point);
  }

  function update() {
    ctx.clearRect(0, 0, boundaryX, boundaryY);
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < 0 || point.x > boundaryX) point.vx *= -1;
      if (point.y < 0 || point.y > boundaryY) point.vy *= -1;

      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = "#999";
      ctx.fill();
    }
    requestAnimationFrame(update);
  }

  init();
}

// ======================
// Dropdown Menu
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const dropdownBtn = document.getElementById("dropdownBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener("click", e => {
      e.preventDefault();
      dropdownMenu.classList.toggle("show");
    });

    document.addEventListener("click", e => {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("show");
      }
    });
  }
});
