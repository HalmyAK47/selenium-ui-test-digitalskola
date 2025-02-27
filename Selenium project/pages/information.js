const { By } = require("selenium-webdriver");

class Information {
  constructor(driver) {
    this.driver = driver;
    this.FirstName = By.xpath("//input[@id='first-name']");
    this.LastName = By.xpath("//input[@id='last-name']");
    this.PostalCode = By.xpath("//input[@id='postal-code']");
    this.Continue = By.xpath("//input[@id='continue']");
  }

  async firstname(firstname) {
    await this.driver.findElement(this.FirstName).sendKeys(firstname);
  }

  async lastname(lastname) {
    await this.driver.findElement(this.LastName).sendKeys(lastname);
  }

  async postalcode(postalcode) {
    await this.driver.findElement(this.PostalCode).sendKeys(postalcode);
  }

  async continue() {
    await this.driver.findElement(this.Continue).click();
  }

}

module.exports = Information;

