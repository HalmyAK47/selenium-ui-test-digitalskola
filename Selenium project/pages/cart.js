const { By } = require("selenium-webdriver");

class Cart {
  constructor(driver) {
    this.driver = driver;
    this.Checkout = By.xpath("//button[@id='checkout']");
  }

  async checkout() {
    await this.driver.findElement(this.Checkout).click();
  }

}

module.exports = Cart;

