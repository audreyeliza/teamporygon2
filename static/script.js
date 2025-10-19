/*document.addEventListener("DOMContentLoaded", function () {
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

   document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');
    
    document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.tarot-card');
    
    cards.forEach(card => {
        // Remove the inline onclick first
        card.removeAttribute('onclick');
        
        card.addEventListener('click', function(e) {
            // If already flipped, do nothing
            if (this.classList.contains('flipped')) {
                return;
            }
            
            // If clicking on input, don't flip
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            // Flip the card once
            this.classList.add('flipped');
        });
    });
    });
});
});
*/

document.addEventListener("DOMContentLoaded", function () {
    console.log('Script loaded');
    
    // Create stars
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
    
    // Handle card flipping
    const cards = document.querySelectorAll('.tarot-card');
    
    cards.forEach(card => {
        // Remove the inline onclick first
        card.removeAttribute('onclick');
        
        card.addEventListener('click', function(e) {
            // If already flipped, do nothing
            if (this.classList.contains('flipped')) {
                return;
            }
            
            // If clicking on input or button, don't flip
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
                e.stopPropagation();
                return;
            }
            
            // Flip the card once
            this.classList.add('flipped');
        });
        
        // Prevent input clicks from bubbling to the card
        const inputs = card.querySelectorAll('input, button');
        inputs.forEach(input => {
            input.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            input.addEventListener('focus', function(e) {
                e.stopPropagation();
            });
        });
    });
});