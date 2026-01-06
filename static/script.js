document.addEventListener("DOMContentLoaded", function () {
    console.log('Script loaded');

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

    document.querySelectorAll('.tarot-card').forEach(card => {
        card.removeAttribute('onclick');

        card.addEventListener('click', function (e) {
            if (this.classList.contains('flipped')) return;

            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
                e.stopPropagation();
                return;
            }

            this.classList.add('flipped');
        });

        card.querySelectorAll('input, button').forEach(input => {
            ['click', 'focus'].forEach(ev =>
                input.addEventListener(ev, e => e.stopPropagation())
            );
        });
    });

    function interpretMonthlyPayment(payment) {
        if (payment < 150) {
            return "That’s basically a couple of Target trips or a few iced coffees and snacks a week. Super low‑lift and very starter‑friendly.";
        } else if (payment < 250) {
            return "That’s about what you’d spend on a few streaming subscriptions or weekly takeout. It’s totally manageable if you’re keeping things minimal.";
        } else if (payment < 400) {
            return "That’s like one nice dinner out each week or a concert every month. This is a solid entry‑level payment for building credit and independence.";
        } else if (payment < 550) {
            return "This is your ‘smart splurge’ zone, similar to budgeting for skincare, gym memberships, and small trips combined. A balanced choice if your budget’s organized.";
        } else if (payment < 750) {
            return "This is around what many people pay for a typical car payment today, so it’s normal but not tiny. You’ll want to be intentional with your other spending.";
        } else if (payment < 1200) {
            return "That’s a big‑girl purchase level, like trading a couple of nights out, concert tickets, or shopping hauls each month for reliable transportation.";
        } else if (payment < 2000) {
            return "That’s an investment move — about the cost of a weekend getaway or short trip each month. Make sure your income and emergency fund can comfortably support it.";
        } else {
            return "This is luxury territory and kind of equivalent to designer shopping or frequent travel. Make sure it aligns with your financial goals and keeps you feeling secure.";
        }
    }

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
            const response = await fetch("/api/finance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Server error ${response.status}: ${text}`);
            }

            const result = await response.json();

            if (result.able_to_finance && result.final_plan) {
                alert(
                    `✨ You're eligible to finance! ✨\n` +
                    `Estimated Monthly Payment: $${result.final_plan.monthly_payment_estimate.toFixed(2)}\n` +
                    `Estimated Interest: $${result.final_plan.interest_estimate.toFixed(2)}\n` +
                    `${interpretMonthlyPayment(result.final_plan.monthly_payment_estimate)}\n`
                );
            } else {
                alert("Sorry, based on your inputs, you're not eligible to finance at this time.");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };
});