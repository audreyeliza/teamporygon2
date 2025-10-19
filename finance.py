def lifeStyle(otherExpenses, income, mortgage, rent, creditScore, loans, downPayment):
    risk = 0
    finalPlan = None

    if downPayment > 0:
        income += downPayment

    monthlyCarPayment = income / 12 * 0.1
    totalExpenses = otherExpenses + loans + (mortgage if mortgage > 0 else rent)
    incomeLeft = income - totalExpenses
    percentageIncome = incomeLeft / income

    # Loosen the eligibility logic
    if percentageIncome >= 0.1 and creditScore >= 650:
        ableToFinance = True
        risk = 2 if creditScore >= 720 else 1
        monthlyCost, interestEstimate = financePlan(risk, True, monthlyCarPayment, creditScore)
        finalPlan = {
            "monthly_payment_estimate": monthlyCost,
            "interest_estimate": interestEstimate,
            "risk_level": risk
        }
    else:
        ableToFinance = False

    return {
        "able_to_finance": ableToFinance,
        "monthly_car_payment": monthlyCarPayment,
        "income_left": incomeLeft,
        "final_plan": finalPlan
    }



def financePlan(risk, preference, monthlyCarPayment, creditScore):
    if preference:
        if risk == 2:
            monthlyCarPayment *= 5
            monthlyCarInterest = 3.5
        elif risk == 1:
            monthlyCarPayment *= 5
            monthlyCarInterest = 2
    else:
        monthlyCarPayment *= 3
        monthlyCarInterest = 0.005 * 2400 if risk == 2 else 0.0025 * 2400

    return monthlyCarPayment, monthlyCarInterest * 3
