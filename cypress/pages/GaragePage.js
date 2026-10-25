class GaragePage {
  get addCarButton() {
    return cy.get('app-garage .panel-page_heading .btn-primary');
  }

  get brandSelect() {
    return cy.get('#addCarBrand');
  }

  get modelSelect() {
    return cy.get('#addCarModel');
  }

  get mileageInput() {
    return cy.get('#addCarMileage');
  }

  get submitAddCarButton() {
    return cy.get('app-add-car-modal .modal-footer .btn-primary');
  }

  addCar(brand, model, mileage) {
    this.addCarButton.click();
    this.brandSelect.select(brand);
    this.modelSelect.select(model);
    this.mileageInput.clear().type(mileage);
    this.submitAddCarButton.click();
  }
}

export default new GaragePage();
