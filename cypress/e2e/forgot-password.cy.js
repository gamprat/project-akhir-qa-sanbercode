import forgotPassword from "../support/forgot_password/ForgotPassword";
import data from "../fixtures/ForgotPasswordData.json";

describe("TS-004 Verifikasi Fungsionalitas Link 'Forgot yout Password?'", () => {
    beforeEach(() => {
        forgotPassword.visit();
        forgotPassword.verifyLoginFormAppears();
    });

    it('TC-010 Memastikan link "Forgot your Password" dapat diklik', () => {
        forgotPassword.interceptFunction("GET", forgotPassword.intercepts.resetPassword, "resetPass");
        forgotPassword.clickForgotPassword(data.validUser);
        forgotPassword.clickResetPassword();
        forgotPassword.waitResponse("@resetPass", 200);
        forgotPassword.verifyUrlResetPass(forgotPassword.endpoints.resetPass)
    });
});

describe("TS-005 Verifikasi Fungsionalitas Halaman Reset Password", () => {
    beforeEach(() => {
        forgotPassword.visit();
        forgotPassword.verifyLoginFormAppears();
    });

    it("TC-011 Reset password dengan Username terdaftar", () => {
        forgotPassword.interceptFunction("GET", forgotPassword.intercepts.resetPasswordSuccess, "resetPassSuccess");
        forgotPassword.clickForgotPassword();
        forgotPassword.inputUsername(data.validUser);
        forgotPassword.clickResetPassword();
        forgotPassword.waitResponse("@resetPassSuccess", 200);
        forgotPassword.verifyUrlResetPass(forgotPassword.endpoints.resetPassSuccess)
    });

    it("TC-012 Reset password dengan Username kosong", () => {
        forgotPassword.interceptFunction("GET", forgotPassword.intercepts.messagesResetPass, "emptyUserReset");
        forgotPassword.clickForgotPassword();
        forgotPassword.emptyUsername();
        forgotPassword.clickResetPassword();
        forgotPassword.waitResponse("@emptyUserReset", [200, 304]);
        forgotPassword.verifyRequiredMessage();
    });
});