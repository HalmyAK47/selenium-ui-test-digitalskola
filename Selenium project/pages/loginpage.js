const { By, until } = require("selenium-webdriver");

class LoginPage {
    constructor(driver) {
    this.driver = driver;
    this.usernameInput = By.id("user-name");
    this.passwordInput = By.id("password");
    this.loginButton = By.id("login-button");
  }

  async open(url) {
    await this.driver.get(url);
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }

  async verifyLoginSuccess() {
     return (await this.driver.getCurrentUrl()).includes("inventory.html");
  }

}

module.exports = LoginPage
