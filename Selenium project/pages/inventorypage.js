const { By } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.saucelabsbackpack = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
    this.saucelabsbikelight = By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']");
    this.AddtoCart = By.xpath("//a[.='2']");
    this.Home = By.xpath("//button[@id='back-to-products']");
  }

  async product1() {
  return  await this.driver.findElement(this.saucelabsbackpack).click();
  }

  async product2() {
  return  await this.driver.findElement(this.saucelabsbikelight).click();
  }

  async addtocart() {
    await this.driver.findElement(this.AddtoCart).click();
  }

  async home() {
    await this.driver.findElement(this.Home).click();
  }

}

module.exports = InventoryPage;

