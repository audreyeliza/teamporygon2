document.addEventListener("DOMContentLoaded", function () {
    console.log('Script loaded');

    // 🌟 Twinkling Stars Creation
    const starsContainer = document.querySelector('.stars');
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.background = 'white';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.position = 'absolute';
        star.style.borderRadius = '50%';
        star.style.boxShadow = '0 0 6px 2px #ffffff55';
        star.style.animationDelay = `${Math.random() * 2.5}s`;
        starsContainer.appendChild(star);
    }

    // 🔮 Tarot Card Flipping (once per card)
    document.querySelectorAll('.tarot-card').forEach(card => {
        card.removeAttribute('onclick');
        card.addEventListener('click', function (e) {
            // Prevent multiple flips
            if (this.classList.contains('flipped')) return;
            // Inputs/buttons should not trigger flip
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
                e.stopPropagation();
                return;
            }
            this.classList.add('flipped');
        });
        // Block card click propagation for form elements
        card.querySelectorAll('input, button').forEach(input => {
            ['click', 'focus'].forEach(ev => input.addEventListener(ev, e => e.stopPropagation()));
        });
    });

    function interpretMonthlyPayment(payment) {
        if (payment < 200) {
            return "That’s about what you’d spend on a few streaming subscriptions or weekly takeout. It’s totally manageable if you’re keeping things minimal.";
        } else if (payment < 400) {
            return "That’s like one nice dinner out each week or a concert every month. This is a solid entry-level payment for building credit and independence.";
        } else if (payment < 700) {
            return "This is your ‘smart splurge’ zone, similar to budgeting for skincare, gym memberships, and travel combined. A balanced choice for comfort and confidence.";
        } else if (payment < 1000) {
            return "That’s an investment move — about the cost of a weekend getaway each month.";
        } else {
            return "This is luxury territory and kind of equivalent to designer shopping or frequent travel. Make sure it aligns with your financial goals and keeps you feeling secure.";
        }
    }


    // 🚗 Finance API submission
    document.getElementById("submitBtn").onclick = async function (event) {
        event.preventDefault();
        // Gather all user input values
        const fields = [
            'name', 'income', 'housing_cost', 'loans',
            'expenses', 'credit_score', 'down_payment'
        ];
        const data = {};
        fields.forEach(f => data[f] = document.getElementById(f).value);

        try {
            const response = await fetch('/api/finance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.able_to_finance && result.final_plan) {
                const payment = result.final_plan.monthly_payment_estimate;
                const interpretation = interpretMonthlyPayment(payment);

                alert(
                    `✨ You're eligible to finance! ✨\n` +
                    `Estimated Monthly Payment: $${payment.toFixed(2)}\n` +
                    `Estimated Interest: $${result.final_plan.interest_estimate.toFixed(2)}\n` +
                    `Risk Level: ${result.final_plan.risk_level}\n\n` +
                    `💫 Lifestyle Insight:\n${interpretation}`
                );

            } else {
                alert("Sorry, based on your inputs, you're not eligible to finance at this time.");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };
});
