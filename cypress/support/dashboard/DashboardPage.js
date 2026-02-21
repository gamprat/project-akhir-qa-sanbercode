class DashboardPage {
  url = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  visit() {
    cy.visit(this.url, {
      timeout: 80000,
      failOnStatusCode: false,
    });
  }

  clearCache() {
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.clearBrowserCache",
      }),
    );
  }

  interceptFunction(method, url, alias) {
    cy.intercept(method, url).as(alias);
  }

  intercepts = {
    dashboardPage: "**/api/v2/dashboard/employees/locations",
    directoryMessages: "**/core/i18n/messages",
    employeeLimit: "**/api/v2/directory/employees?limit=14&offset=0",
    viewDirectory: "**/directory/viewDirectory",
  };

  waitResponse(alias, statusCode = 200) {
    if (Array.isArray(statusCode)) {
      cy.wait(alias).its("response.statusCode").should("be.oneOf", statusCode);
    } else {
      cy.wait(alias).its("response.statusCode").should("eq", statusCode);
    }
  }

  get usernameInput() {
    return cy.get('input[name="username"]');
  }

  get passwordInput() {
    return cy.get('input[name="password"]');
  }

  get loginButton() {
    return cy.get(".orangehrm-login-button");
  }

  get loginForm() {
    return cy.get(".orangehrm-login-form");
  }

  get directoryMenu() {
    return cy.get("a[href*='viewDirectory'");
  }

  get employeeNameInput() {
    return cy.get("input[placeholder='Type for hints...']");
  }

  get suggestEmployeeName() {
    return cy.get(".oxd-autocomplete-option");
  }

  get directoryFilter() {
    return cy.get(".oxd-select-wrapper");
  }

  get filterContent() {
    return cy.get(".oxd-select-option");
  }

  get searchButton() {
    return cy.get("button[type='submit']");
  }

  get resetButton() {
    return cy.get("button[type='reset']");
  }

  get employeeCard() {
    return cy.get(".orangehrm-directory-card");
  }

  get selectStatus() {
    return cy.get(".oxd-select-text-input");
  }

  get invalidMessage() {
    return cy.get(".oxd-input-group__message");
  }

  endpoints = {
    dashboard: "/dashboard",
    directory: "/viewDirectory",
  };

  verifyUrlResetPass(endpoint) {
    cy.url().should("include", endpoint);
  }

  verifyLoginFormAppears() {
    this.loginForm.should("be.visible", { timeout: 30000 });
  }

  verifyEmployeeCardAppears() {
    this.employeeCard.should("be.visible", { timeout: 30000 });
  }

  verifySelectFill() {
    this.selectStatus.eq(0).should("have.text", "-- Select --");
    this.selectStatus.eq(1).should("have.text", "-- Select --");
  }

  verifyInvalidMessage() {
    this.invalidMessage.should("be.visible").and("have.text", "Invalid");
  }

  inputUsername(username) {
    this.usernameInput.type(username);
  }

  inputPassword(password) {
    this.passwordInput.type(password);
  }

  clickLogin() {
    this.loginButton.click();
  }

  clickDirectoryMenu() {
    this.directoryMenu.click();
  }

  inputEmployeeName(name) {
    cy.intercept('GET', '**/api/v2/directory/employees**').as('getEmployeeHints');
    this.employeeNameInput.type(name);
    cy.wait("@getEmployeeHints");
  }

  selectSuggestName() {
    this.suggestEmployeeName.should("be.visible").first().click({ force: true });
  }

  clickJobFilter() {
    this.directoryFilter.eq(0).click();
  }

  clickLocationFilter() {
    this.directoryFilter.eq(1).click();
  }

  selectJobFilter() {
    this.filterContent.eq(1).click();
  }

  selectLocationFilter() {
    this.filterContent.eq(1).click();
  }

  clickSearch() {
    this.searchButton.click();
  }

  clickReset() {
    this.resetButton.click();
  }
}

export default new DashboardPage();