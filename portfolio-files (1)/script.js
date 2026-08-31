// ============ LOADER ============
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 500);
});

// ============ NAVBAR ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ============ ANIMATED SKILL BARS ============
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.dataset.level;
      const fill = entry.target.querySelector('.skill-fill');
      fill.style.width = level + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ============ PROJECT CARD TILT ============
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============ HERO PARTICLE NETWORK (subtle) ============
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function initParticles() {
  const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 22000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.strokeStyle = `rgba(124,111,240,${1 - dist / 130})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    ctx.fillStyle = 'rgba(41,214,200,0.8)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  });

  animationId = requestAnimationFrame(drawParticles);
}

function setupParticles() {
  resizeCanvas();
  initParticles();
  cancelAnimationFrame(animationId);
  drawParticles();
}

setupParticles();
window.addEventListener('resize', setupParticles);

// ============ HERO PHOTO PARALLAX TILT ============
const heroPhoto = document.getElementById('heroPhoto');
const heroPhotoFrame = heroPhoto ? heroPhoto.querySelector('.hero-photo-frame') : null;
if (heroPhoto && heroPhotoFrame) {
  heroPhoto.addEventListener('mousemove', (e) => {
    const rect = heroPhoto.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroPhotoFrame.style.animation = 'none';
    heroPhotoFrame.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
  });
  heroPhoto.addEventListener('mouseleave', () => {
    heroPhotoFrame.style.transform = '';
    heroPhotoFrame.style.animation = 'float 5s ease-in-out infinite';
  });
}

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // No backend connected — this simply confirms receipt in the UI.
  // Wire this up to an email service (e.g. Formspree, EmailJS) to make it functional.
  formSuccess.classList.add('show');
  contactForm.reset();
  setTimeout(() => formSuccess.classList.remove('show'), 5000);
});

// ============ RESUME BUTTON PLACEHOLDER ============
document.getElementById('resumeBtn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Add your resume PDF and update this button\'s href to point to it.');
});
