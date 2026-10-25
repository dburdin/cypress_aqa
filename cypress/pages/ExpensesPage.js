class ExpensesPage {
  get addExpenseButton() {
    return cy.get('app-fuel-expenses .panel-page_heading .btn-primary');
  }

  get mileageInput() {
    return cy.get('#addExpenseMileage');
  }

  get litersInput() {
    return cy.get('#addExpenseLiters');
  }

  get totalCostInput() {
    return cy.get('#addExpenseTotalCost');
  }

  get submitButton() {
    return cy.get('app-add-expense-modal .modal-footer .btn-primary');
  }

  open() {
    cy.contains('a', 'Fuel expenses').first().click();
    cy.url().should('include', '/panel/expenses');
  }

  addExpense(mileage, liters, cost) {
    this.addExpenseButton.click();
    this.mileageInput.clear().type(mileage);
    this.litersInput.clear().type(liters);
    this.totalCostInput.clear().type(cost);
    this.submitButton.click();
  }
}

export default new ExpensesPage();
