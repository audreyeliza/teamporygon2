from flask import Flask, request, jsonify, render_template
import finance

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/finance", methods=["POST"])
def calculate_finance():
    try:
        user_data = request.get_json() or {}

        def safe_float(value):
            try:
                return float(value)
            except (ValueError, TypeError):
                return 0.0

        def safe_int(value):
            try:
                return int(value)
            except (ValueError, TypeError):
                return 0

        result = finance.lifeStyle(
            otherExpenses=safe_float(user_data.get("expenses")),
            income=safe_float(user_data.get("income")),
            mortgage=0,
            rent=safe_float(user_data.get("housing_cost")),
            creditScore=safe_int(user_data.get("credit_score")),
            loans=safe_float(user_data.get("loans")),
            downPayment=safe_float(user_data.get("down_payment")),
        )

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
