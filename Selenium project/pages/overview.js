const { By } = require("selenium-webdriver");

class Overview {
  constructor(driver) {
    this.driver = driver;
    this.Finish = By.xpath("//button[@id='finish']");
  }

  async finish() {
    await this.driver.findElement(this.Finish).click();
  }

}

module.exports = Overview;

