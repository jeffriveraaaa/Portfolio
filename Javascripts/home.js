// ======================
// Flip Panel
// ======================
$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideToggle("slow");
  });
});

// ======================
// Carousel
// ======================
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 4000);
}

// ======================
// Anime.js Text Animations
// ======================
anime.timeline({loop: true})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.ml15',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// ml2 text
var textWrapper = document.querySelector('.ml2');
if (textWrapper) {
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline({loop: true})
    .add({
      targets: '.ml2 .letter',
      scale: [4,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 950,
      delay: (el, i) => 70*i
    }).add({
      targets: '.ml2',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 50000
    });
}

// ml12 text
var textWrapper = document.querySelector('.ml12');
if (textWrapper) {
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline({loop: true})
    .add({
      targets: '.ml12 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 2000 + 30 * i
    }).add({
      targets: '.ml12 .letter',
      translateX: [0,-30],
      opacity: [1,0],
      easing: "easeInExpo",
      duration: 1100,
      delay: (el, i) => 50000 + 30 * i
    });
}

// ======================
// Filtered Projects
// ======================
filterSelection("all");

function filterSelection(c) {
  var x = document.getElementsByClassName("column2");
  if (c == "all") c = "";
  for (var i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var arr1 = element.className.split(" ");
  var arr2 = name.split(" ");
  for (var i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) element.className += " " + arr2[i];
  }
}

function w3RemoveClass(element, name) {
  var arr1 = element.className.split(" ");
  var arr2 = name.split(" ");
  for (var i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) arr1.splice(arr1.indexOf(arr2[i]), 1);
  }
  element.className = arr1.join(" ");
}

// Add active class to buttons
var btnContainer = document.getElementById("myBtnContainer");
if (btnContainer) {
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("active2");
      if(current[0]) current[0].className = current[0].className.replace(" active2", "");
      this.className += " active2";
    });
  }
}

// ======================
// Navbar Sticky + Section Highlight
// ======================
let navbar = document.getElementById("main-nav");
let header = document.querySelector("header");

if (navbar) {
  let navPos = navbar.getBoundingClientRect().top;
  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY;
    if (scrollPos > navPos) {
      navbar.classList.add('sticky');
      if(header) header.classList.add('navbarOffsetMargin');
    } else {
      navbar.classList.remove('sticky');
      if(header) header.classList.remove('navbarOffsetMargin');
    }
  });
}

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".container ul li");
window.onscroll = () => {
  var current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) current = section.getAttribute("id");
  });
  navLi.forEach(li => {
    li.classList.remove("active");
    if (li.classList.contains(current)) li.classList.add("active");
  });
};

// ======================
// Scroll Reveal
// ======================
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);

// ======================
// Canvas Background Animation
// ======================
var canvas = document.getElementById('moving');
if(canvas){
    var context = canvas.getContext('2d'),
        points = [],
        velocity2 = 5,
        radius = 5,
        boundaryX = 200,
        boundaryY = 200,
        numberOfPoints = 30;

    init();

    function init() {
        for (var i = 0; i < numberOfPoints; i++) createPoint();
        for (var i = 0; i < points.length; i++) {
            points[i].buddy = i === 0 ? points[points.length-1] : points[i-1];
        }
        animate();
    }

    function createPoint() {
        var point = {}, vx2, vy2;
        point.x = Math.random()*boundaryX;
        point.y = Math.random()*boundaryY;
        point.vx = (Math.floor(Math.random())*2-1)*Math.random();
        vx2 = Math.pow(point.vx, 2);
        vy2 = velocity2 - vx2;
        point.vy = Math.sqrt(vy2) * (Math.random()*2-1);
        points.push(point);
    }

    function resetVelocity(point, axis, dir) {
        var vx2, vy2;
        if(axis == 'x') {
            point.vx = dir*Math.random();
            vx2 = Math.pow(point.vx, 2);
            vy2 = velocity2 - vx2;
            point.vy = Math.sqrt(vy2) * (Math.random()*2-1);
        } else {
            point.vy = dir*Math.random();
            vy2 = Math.pow(point.vy, 2);
            vx2 = velocity2 - vy2;
            point.vx = Math.sqrt(vx2) * (Math.random()*2-1);
        }
    }

    function drawCircle(x, y) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#97badc';
        context.fill();
    }

    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = '#8ab2d8';
        context.stroke();
    }

    function draw() {
        for(var i =0; i<points.length; i++){
            var point = points[i];
            point.x += point.vx;
            point.y += point.vy;
            drawCircle(point.x, point.y);
            drawLine(point.x, point.y, point.buddy.x, point.buddy.y);
            if(point.x < radius) resetVelocity(point, 'x', 1);
            else if(point.x > boundaryX-radius) resetVelocity(point, 'x', -1);
            if(point.y < radius) resetVelocity(point, 'y', 1);
            else if(point.y > boundaryY-radius) resetVelocity(point, 'y', -1);
        }
    }

    function animate() {
        context.clearRect(0, 0, 200, 200);
        draw();
        requestAnimationFrame(animate);
    }
}

// ======================
// Dropdown Menu
// ======================
document.addEventListener("DOMContentLoaded", () => {
    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if(dropdownBtn && dropdownMenu){
        dropdownBtn.addEventListener("click", (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
            if(!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)){
                dropdownMenu.classList.remove("show");
            }
        });
    }
});
