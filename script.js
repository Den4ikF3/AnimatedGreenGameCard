  document.addEventListener('DOMContentLoaded', () => {

  const svg = document.querySelector('.lightning-svg');
  const card = document.querySelector('.main-card');

  if (!svg || !card) {
    console.error("Необхідні елементи (SVG або картка) не знайдені!");
    return;
  }

  const cardWidth = card.clientWidth;
  const cardHeight = card.clientHeight;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createBolt() {
    const startX = random(cardWidth * 0.2, cardWidth * 0.8);
    const startY = 0;
    let points = `${startX},${startY} `;

    let currentX = startX;
    let currentY = startY;
    
    const segments = 15;
    const segmentHeight = cardHeight / segments;
    const jitter = 35;

    for (let i = 1; i <= segments; i++) {
      currentY += segmentHeight;
      currentX += random(-jitter, jitter);

      currentX = Math.max(10, Math.min(cardWidth - 10, currentX));

      points += `${currentX},${currentY} `;
    }

    const bolt = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    bolt.setAttribute('points', points);
    bolt.classList.add('lightning-bolt');

    svg.appendChild(bolt);

    requestAnimationFrame(() => {
      bolt.style.opacity = random(0.4, 1);

      setTimeout(() => {
        bolt.style.opacity = 0;

        setTimeout(() => {
          if (svg.contains(bolt)) {
            svg.removeChild(bolt);
          }
        }, 200);
      }, random(50, 200));
    });
  }

  setInterval(createBolt, random(300, 1500));
  setInterval(createBolt, random(500, 2000));
});

