def lifeStyle(otherExpenses, income, mortgage, rent, creditScore, loans, downPayment, highMilesDriven):
    risk = 0
    ableToFinance = false
    #If: there is a downpayment
    if(downPayment > 0):
       income+=downPayment 
    #How much is your income monthly to where you can spend on your car
    monthlyCarPayment = (income)/12 * 0.1
    #What are your total expenses
    totalExpenses = otherExpenses + loans
    #If: you pay rent, add that 
    if(mortgage > 0):
        totalExpenses+=mortgage
        homeExpensePercent = mortgage/(totalExpenses)
    else:
        totalExpenses+=rent
        homeExpensePercent = rent/(totalExpenses)
 
    incomeLeft =   (income + downPayment) - totalExpenses
    percentageIncome  = (incomeLeft)/(income)
    
    if(homeExpensePercent >= 0.3 and percentageIncome >= monthlyCarPayment):
        if(creditScore >= 720 and creditScore <= 850):
            risk = 2

        elif(creditScore >= 670 and creditScore <= 850):
            risk = 1
      
    else:
        ableToFinance = false
    
    
    if(ableToFinance):
        finalPlan = financePlan(risk, monthlyCarPayment)
        
    
    return ableToFinance
    
    #Preference : Financing - true , lease - false
    
       
def financePlan(risk, preference, monthlyCarPayment, creditScore):
 #Preference : Financing - true , lease - false

    preference = true 
    
    if(preference):
        if(risk == 2):
            monthlyCarPayment = (monthlyCarPayment*5)
            monthlyCarInterest =  3.5
            
        if(risk == 1):
            monthlyCarPayment = (monthlyCarPayment*5)
            monthlyCarInterest =  2
    else:
        if(risk == 2):
            baselineMonthly = (monthlyCarPayments*3)
            monthlyCarInterest = 0.005*2400
            mileage = 12,000
        if(risk == 1):
            baselineMonthly = 0
            mileage = 12,000
            monthlyCarInterest = 0.0025*2400
    return monthlyCarPayment, (monthlyCarInterest*3)
    
    

     
       
       


