import dashboardPage from "../support/dashboard/DashboardPage";
import data from "../fixtures/DashboardPage.json";

describe("TS-006 Verifikasi Akses Halaman Dashboard", () => {
  beforeEach(() => {
    dashboardPage.visit();
    dashboardPage.verifyLoginFormAppears();
  });

  it("TC-013 Akses Halaman Dashboard OrangeHRM", () => {
    dashboardPage.interceptFunction("GET", dashboardPage.intercepts.dashboardPage, "urlDashboard");
    dashboardPage.inputUsername(data.validUser);
    dashboardPage.inputPassword(data.validPass);
    dashboardPage.clickLogin();
    dashboardPage.waitResponse("@urlDashboard", [200, 304]);
    dashboardPage.verifyUrlResetPass(dashboardPage.endpoints.dashboard);
  });
});

describe("TS-007 Verifikasi Fungsionalitas Halaman Dashboard Directory", () => {
  beforeEach(() => {
    dashboardPage.visit();
    dashboardPage.verifyLoginFormAppears();
  });

  it("TC-014 Cari karyawan dengan nama yang valid", () => {
    dashboardPage.inputUsername(data.validUser);
    dashboardPage.inputPassword(data.validPass);
    dashboardPage.clickLogin();
    dashboardPage.interceptFunction("GET", dashboardPage.intercepts.directoryMessages, "validUser");
    dashboardPage.clickDirectoryMenu();
    dashboardPage.waitResponse("@validUser", [200, 304]);
    dashboardPage.inputEmployeeName(data.validEmployeeName);
    dashboardPage.selectSuggestName();
    dashboardPage.clickSearch();
    dashboardPage.verifyEmployeeCardAppears();
  });

  it("TC-015 Memastikan tombol Reset dapat berfungsi menghapus data", () => {
    dashboardPage.inputUsername(data.validUser);
    dashboardPage.inputPassword(data.validPass);
    dashboardPage.clickLogin();
    dashboardPage.interceptFunction("GET", dashboardPage.intercepts.employeeLimit, "resetSuccess");
    dashboardPage.clickDirectoryMenu();
    dashboardPage.waitResponse("@resetSuccess", [200, 304]);
    dashboardPage.inputEmployeeName(data.validEmployeeName);
    dashboardPage.clickJobFilter();
    dashboardPage.selectJobFilter();
    dashboardPage.clickLocationFilter();
    dashboardPage.selectLocationFilter();
    dashboardPage.clickReset();
    dashboardPage.verifySelectFill();
  });

  it("TC-016 Cari karyawan dengan nama yang tidak terdaftar", () => {
    dashboardPage.inputUsername(data.validUser);
    dashboardPage.inputPassword(data.validPass);
    dashboardPage.clickLogin();
    dashboardPage.interceptFunction("GET", dashboardPage.intercepts.viewDirectory, "invalidUser");
    dashboardPage.clickDirectoryMenu();
    dashboardPage.waitResponse("@invalidUser", [200, 304]);
    dashboardPage.inputEmployeeName(data.invalidEmployeeName);
    dashboardPage.clickSearch();
    dashboardPage.verifyInvalidMessage();
  });
});