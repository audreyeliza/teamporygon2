document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.querySelector('.stars');
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        let size = Math.random() * 2 + 1; // 1px to 3px
        star.style.width = star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.background = 'white';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.position = 'absolute';
        star.style.borderRadius = '50%';
        // Add a faint glow
        star.style.boxShadow = `0 0 6px 2px #ffffff55`;
        star.style.animationDelay = (Math.random() * 2.5) + 's';
        starsContainer.appendChild(star);
    }
});
