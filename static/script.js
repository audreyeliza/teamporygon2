document.addEventListener("DOMContentLoaded", function () {
    console.log('Script loaded');

    // 🌟 Create twinkling stars
    const starsContainer = document.querySelector('.stars');
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        let size = Math.random() * 2 + 1;
        star.style.width = star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.background = 'white';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.position = 'absolute';
        star.style.borderRadius = '50%';
        star.style.boxShadow = `0 0 6px 2px #ffffff55`;
        star.style.animationDelay = (Math.random() * 2.5) + 's';
        starsContainer.appendChild(star);
    }

    // 🔮 Handle tarot card flipping (only once)
    const cards = document.querySelectorAll('.tarot-card');
    cards.forEach(card => {
        card.removeAttribute('onclick');

        card.addEventListener('click', function (e) {
            if (this.classList.contains('flipped')) return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
                e.stopPropagation();
                return;
            }
            this.classList.add('flipped');
        });

        const inputs = card.querySelectorAll('input, button');
        inputs.forEach(input => {
            input.addEventListener('click', e => e.stopPropagation());
            input.addEventListener('focus', e => e.stopPropagation());
        });
    });

    document.getElementById("submitBtn").onclick = async function (event) {
        event.preventDefault(); // Prevent default form behavior

        const data = {
            name: document.getElementById('name').value,
            income: document.getElementById('income').value,
            housing_cost: document.getElementById('housing_cost').value,
            loans: document.getElementById('loans').value,
            expenses: document.getElementById('expenses').value,
            credit_score: document.getElementById('credit_score').value,
            down_payment: document.getElementById('down_payment').value
        };

        try {
            const response = await fetch('/api/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            alert(result.result || "Calculation complete!");
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };

    document.getElementById("submitBtn").onclick = async function (event) {
        event.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            income: document.getElementById('income').value,
            housing_cost: document.getElementById('housing_cost').value,
            loans: document.getElementById('loans').value,
            expenses: document.getElementById('expenses').value,
            credit_score: document.getElementById('credit_score').value,
            down_payment: document.getElementById('down_payment').value
        };

        try {
            const response = await fetch('/api/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (result.able_to_finance) {
                alert(
                    `✨ You're eligible to finance!\n` +
                    `Estimated Monthly Payment: $${result.final_plan.monthly_payment_estimate.toFixed(2)}\n` +
                    `Estimated Interest: $${result.final_plan.interest_estimate.toFixed(2)}\n` +
                    `Risk Level: ${result.final_plan.risk_level}`
                );
            } else {
                alert("Sorry, based on your inputs, you're not eligible to finance at this time.");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };


});
