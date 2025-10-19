# Manifest My Toyota
Hello! Welcome to Manifest My Toyota, a quiz that allows people to find a car financial plan that's right for them!

# Background
We're creating a quiz-style questionnaire that asks question's about the user's financial status to recommend a unique financing or leasing plan that works for them.

# Setup
1. Features

    **Input monthly income, expenses, mortgage/rent, loans, credit score, and down payment.**

    _- Calculates if you can afford a car and recommends financing or leasing._

    _- Estimates monthly car payments and financing risk levels._

    _- Written in Python using Flask._

--------------

2. Setup the app

    **Clone this repository and navigate to the project directory.**

    **Install dependencies using pip:**

    Type into the Terminal:
    
    **pip install -r requirements.txt**

    (see requirements.txt for details)


# Running the App

Run the Flask server

 Type into the Terminal: python app.py

By default, the app launches in debug mode. Open your browser and go to http://127.0.0.1:5000/ to use the UI.
--------------

# File Overview
1. app.py: _Flask app entry point; serves the UI and connects your logic._

2. finance.py: _Contains functions for financial calculations, decision logic for car payment, and finance/lease suggestions._

    requirements.txt: _List of Python package dependencies._

    README.md: _Project documentation._

---------------

#  Usage

**Enter your personal financial info in the web form.**

**Submit to see results: the app calculates if you can afford a car, showing financing/leasing advice and estimated payments.**
    
The plan is based on your financial risk, credit score, and down payment.
--------------

# Dependencies
Flask, Jinja2, Werkzeug, Click, Blinker, Itsdangerous, MarkupSafe

(Full version details in requirements.txt)