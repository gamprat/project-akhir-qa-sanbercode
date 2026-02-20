class ForgotPassword {
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
    resetPassword: "**/auth/requestPasswordResetCode",
    resetPasswordSuccess: "**/auth/sendPasswordReset",
    messagesResetPass: "**/core/i18n/messages",
  };

  waitResponse(alias, statusCode = 200) {
    if (Array.isArray(statusCode)) {
      cy.wait(alias).its("response.statusCode").should("be.oneOf", statusCode);
    } else {
      cy.wait(alias).its("response.statusCode").should("eq", statusCode);
    }
  }

  get forgotLink() {
    return cy.get(".orangehrm-login-forgot-header");
  }

  get loginForm() {
    return cy.get(".orangehrm-login-form");
  }

  get usernameInput() {
    return cy.get('input[name="username"]');
  }

  get resetPassButton() {
    return cy.get(".orangehrm-forgot-password-button--reset");
  }

  get requiredMessage() {
    return cy.get(".oxd-input-group__message");
  }

  endpoints = {
    resetPass: "/auth/requestPasswordResetCode",
    resetPassSuccess: "/auth/sendPasswordReset",
  };

  verifyUrlResetPass(endpoint) {
    cy.url().should("include", endpoint);
  }

  verifyLoginFormAppears() {
    this.loginForm.should("be.visible", { timeout: 30000 });
  }

  verifyRequiredMessage() {
    this.requiredMessage.should("be.visible").and("contain", "Required");
  }

  clickForgotPassword() {
    this.forgotLink.click();
  }

  clickResetPassword() {
    this.resetPassButton.click();
  }

  inputUsername(username) {
    this.usernameInput.type(username);
  }

  emptyUsername() {
    this.usernameInput.clear();
  }
}

export default new ForgotPassword();
