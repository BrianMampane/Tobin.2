const pages = document.querySelectorAll('.page');
const nextButton = document.getElementById('nextButton');
const pageSound = document.getElementById('pageSound');
let currentPage = 0;

nextButton.addEventListener('click', () => {
  pages[currentPage].style.display = 'none';
  currentPage++;

  if (currentPage < pages.length) {
    pages[currentPage].style.display = 'block';
    pageSound.play();
  } else {
    nextButton.style.display = 'none';
    launchConfetti();
  }
});

// Floating hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤️';
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
  document.getElementById('floating-hearts').appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 300);

// Confetti explosion
function launchConfetti() {
  const confetti = document.getElementById('confetti');
  const ctx = confetti.getContext('2d');
  confetti.width = window.innerWidth;
  confetti.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 250; i++) {
    particles.push({
      x: Math.random() * confetti.width,
      y: Math.random() * confetti.height,
      size: Math.random() * 5 + 2,
      speedY: Math.random() * 4 - 2,
      speedX: Math.random() * 4 - 2,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, confetti.width, confetti.height);
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
    });
    requestAnimationFrame(drawParticles);
  }

  drawParticles();
}
