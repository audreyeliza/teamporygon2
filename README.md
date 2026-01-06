# Manifest My Toyota

Manifest My Toyota is a quiz-style web app that uses your financial info and “girl math” style explanations to suggest a rough car payment you could aim for. The app is deployed on Render at https://manifestmytoyota.onrender.com/.

## What it does

- Collects:
  - Annual income
  - Monthly housing, loans, and other expenses
  - Credit score
  - Optional down payment
- Checks if you likely have enough leftover income and a strong enough credit score to reasonably finance a car.
- Suggests an estimated monthly payment using simple rules of thumb (around 10% of monthly income, capped by leftover income) plus a rough interest estimate.
- Explains the payment in everyday spending terms (Target trips, concerts, takeout, etc.).

## Tech and files

- **Stack:** Python, Flask, HTML/CSS, JavaScript
- **Key files:**
  - `app.py` – Flask app entry point; serves the UI and exposes the `/api/finance` endpoint.
  - `finance.py` – affordability and payment logic (`lifeStyle` and `financePlan`).
  - `script.js` – front-end behavior, animations, and API calls.
  - `requirements.txt` – Python dependencies (Flask and supporting packages).

## Run it locally

```bash
git clone https://github.com/audreyeliza/teamporygon2.git
cd teamporygon2
pip install -r requirements.txt
python app.py
```
Then open http://127.0.0.1:5000/ in your browser to use the app.