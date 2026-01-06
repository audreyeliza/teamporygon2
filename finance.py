def lifeStyle(otherExpenses, income, mortgage, rent, creditScore, loans, downPayment):
    """
    income is ANNUAL income
    otherExpenses, loans, mortgage, rent are MONTHLY amounts
    downPayment is a one-time amount (not treated as income)
    """

    finalPlan = None

    # 1. Compute monthly income and leftover after major expenses
    monthly_income = income / 12.0
    housing = mortgage if mortgage > 0 else rent
    totalExpenses = otherExpenses + loans + housing
    incomeLeft = max(monthly_income - totalExpenses, 0)
    percentageIncomeLeft = incomeLeft / monthly_income if monthly_income > 0 else 0


    # Avoid divide-by-zero
    if monthly_income <= 0:
        return {
            "able_to_finance": False,
            "monthly_car_payment": 0,
            "income_left": incomeLeft,
            "final_plan": None,
        }

    # 2. Eligibility: must have some buffer and OK credit
    if percentageIncomeLeft >= 0.1 and creditScore >= 650:
        ableToFinance = True

        # risk: 0 = higher risk, 1 = mid, 2 = low risk
        if creditScore >= 720:
            risk = 2
        elif creditScore >= 680:
            risk = 1
        else:
            risk = 0

        monthlyCost, interestEstimate = financePlan(
            risk=risk,
            monthly_income=monthly_income,
            income_left=incomeLeft,
        )

        finalPlan = {
            "monthly_payment_estimate": monthlyCost,
            "interest_estimate": interestEstimate,
            "risk_level": risk,
        }
        monthlyCarPayment = monthlyCost
    else:
        ableToFinance = False
        monthlyCarPayment = 0

    return {
        "able_to_finance": ableToFinance,
        "monthly_car_payment": monthlyCarPayment,
        "income_left": incomeLeft,
        "final_plan": finalPlan,
    }



def financePlan(risk, monthly_income, income_left):
    """
    risk: 0,1,2 (0 = higher risk, 2 = lower risk)
    monthly_income: monthly income
    income_left: income after other major expenses (monthly)
    """

    # Base target: 10% of monthly income
    base_payment = monthly_income * 0.10

    # Make sure we don't consume all of the leftover income
    # Cap at, say, 60% of income_left
    max_by_leftover = income_left * 0.60
    target_payment = min(base_payment, max_by_leftover)

    # Adjust slightly by risk:
    # higher risk → lower recommended payment, lower risk → slightly higher
    if risk == 2:
        # low risk: can stretch a bit, but still reasonable
        target_payment *= 1.1
        apr = 0.045  # 4.5%
    elif risk == 1:
        target_payment *= 1.0
        apr = 0.06   # 6%
    else:
        target_payment *= 0.9
        apr = 0.09   # 9%

    # Rough interest estimate over 3 years just to show a number (not exact loan math)
    years = 3
    interest_estimate = target_payment * 12 * years * (apr / 2.0)

    return round(target_payment, 2), round(interest_estimate, 2)

