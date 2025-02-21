const { Builder, By, Key, until, Browser } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');

async function exampleTest() {
  // Menjalankan test untuk Chrome
  await runTestsForBrowser("chrome");

  // Menjalankan test untuk Edge
  await runTestsForBrowser("MicrosoftEdge");
}

async function runTestsForBrowser (browserName) {
  let options;
  let driver;
    describe(`Saucedemo Belanja - ${browserName}`, function () {
    // Menambahkan timeout untuk mocha
    this.timeout(100000); 
  
    before(async function () {
      // Menentukan opsi browser yang digunakan
      if (browserName === "chrome") {
        options = new chrome.Options().addArguments("--headless=new");
      } else if (browserName === "MicrosoftEdge") {
        options = new edge.Options().addArguments("--headless=new");
      }
          // fungsinya untuk menjalankan headless
           driver = await new Builder()
          .forBrowser(browserName)
          .setChromeOptions(browserName === "chrome" ? options : undefined)
          .setEdgeOptions(browserName === "MicrosoftEdge" ? options : undefined)
          .build();
    });

      it("TC01 berhasil login", async function () {
        //membuka url di browser
        await driver.get("https://saucedemo.com");
        console.log("url berhasil dibuka");

        //Melakukan sign in
        await driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys("standard_user");
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");

        //Klik tombol login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();
        await driver.sleep(2000);
        console.log("berhasil login");

        // Validasi masuk ke halaman dashboard setelah login
        let menuButton = await driver.findElement(By.id('react-burger-menu-btn'));
        assert.strictEqual(await menuButton.isDisplayed(), true, 'menu button is not visible');
        console.log("berhasil masuk ke halaman dashboard");
      });

        it("TC02 berhasil menambahkan 4 product", async function () {
        //Klik tombol add to cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        await driver.sleep(2000);

        // Validasi produk ditambahkan menjadi 1
        let totalitem = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        assert.strictEqual(totalitem.includes("1"),true,'Product berhasil ditambahkan menjadi 1"');
        console.log("product berhasil ditambahkan menjadi 1");

        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']")).click();
        await driver.sleep(1000);

        // Validasi produk ditambahkan menjadi 2
        totalitem = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        assert.strictEqual(totalitem.includes("2"),true,'Product berhasil ditambahkan menjadi 2"');
        console.log("product berhasil ditambahkan menjadi 2");

        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']")).click();
        await driver.sleep(1000);

        // Validasi produk ditambahkan menjadi 3
        totalitem = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        assert.strictEqual(totalitem.includes("3"),true,'Product berhasil ditambahkan menjadi 3"');
        console.log("product berhasil ditambahkan menjadi 3");

        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-fleece-jacket']")).click();
        await driver.sleep(1000);

        // Validasi produk ditambahkan menjadi 4
        totalitem = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        assert.strictEqual(totalitem.includes("4"),true,'Product berhasil ditambahkan menjadi 4"');
        console.log("product berhasil ditambahkan menjadi 4");
      });

        it("TC03 berhasil add to cart dan checkout", async function () {
        //Klik Add to cart
        await driver.findElement(By.xpath("//div[@id='shopping_cart_container']/a[1]")).click();
        await driver.sleep(2000);

        //Validasi masuk ke halaman cart
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://www.saucedemo.com/cart.html',true, 'User tidak berada di halaman cart setelah klik cart');
        console.log("berhasil masuk ke halaman cart");

        // Scroll ke paling bawah
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        await driver.sleep(2000);

        //Klik Checkout
        await driver.findElement(By.xpath("//button[@id='checkout']")).click();
        await driver.sleep(2000);
        console.log("berhasil checkout");
      });

        it("TC04 berhasil input data diri", async function () {
        //Masukkan first name
        await driver.findElement(By.xpath("//input[@id='first-name']")).sendKeys("Halmy");

        //Masukkan last name
        await driver.findElement(By.xpath("//input[@id='last-name']")).sendKeys("AK");
        
        //Masukkan postal code
        await driver.findElement(By.xpath("//input[@id='postal-code']")).sendKeys("1774");
        await driver.sleep(2000);

        //Klik Continue
        await driver.findElement(By.xpath("//input[@id='continue']")).click();
        await driver.sleep(2000);
        console.log("berhasil input data diri");
      });

        it("TC05 berhasil belanja", async function () {
        // Scroll ke paling bawah
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        await driver.sleep(2000);

        //Klik finish
        await driver.findElement(By.xpath("//button[@id='finish']")).click();
        await driver.sleep(2000);
        console.log("berhasil belanja");
      });

      it("TC06 berhasil kembali ke home", async function () {
        //Klik Back to home
        await driver.findElement(By.xpath("//button[@id='back-to-products']")).click();
        await driver.sleep(4000);
        console.log("berhasil kembali ke home");
      });

        after(async function () {
          console.log("testing success " + browserName);
          await driver.quit();
        });
    });
  }

exampleTest();