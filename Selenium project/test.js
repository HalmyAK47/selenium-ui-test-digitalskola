const { Builder } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');

// Validasi
//const assert = require("assert");

// Page Object Model
const LoginPage = require ("../Sesi8/pages/loginpage"); 
const testData = require("../Sesi8/fixture/testData.json");
const InventoryPage = require ("../Sesi8/pages/inventorypage");
const Cart = require ("../Sesi8/pages/cart");
const Information = require ("../Sesi8/pages/information");
const Overview = require ("../Sesi8/pages/overview");

// Screenshoot
const fs = require("fs");
const path = require("path");

// Compare Screenshoot
// const { CompareScreenshot } = require("../Sesi8/helper/visualtesting");


async function exampleTest() {
  // Menjalankan test untuk Chrome
  await runTestsForBrowser("chrome");

  // Menjalankan test untuk Edge
  await runTestsForBrowser("MicrosoftEdge");
}

// Full Page Screenshoot
async function takeFullPageScreenshot(driver, filePath) {
  // Ambil ukuran halaman penuh
  await driver.manage().window().setRect({ width: 1920, height: 1080 });
  // Menunggu selama 3 detik
  await driver.sleep(3000);
  // Ambil screenshot
  const screenshot = await driver.takeScreenshot();
  // Simpan screenshot dalam format base64
  fs.writeFileSync(filePath, screenshot, "base64");
}

async function runTestsForBrowser (browserName) {

    // Test Annotation: Mengelompokkan bebrapa test case
    describe(`Saucedemo Belanja - ${browserName}`, function () {
    // Menambahkan timeout karena menggunakan mocha
    this.timeout(100000); 
    let options;
    let driver;
    let loginpage; 
    let inventoryPage;
    let cart;
    let information;
    let overview;
    // Test Hook: Dieksekusi sekali sebelum pengujian dijalankan
    before(async function () {
      // Menentukan opsi browser yang digunakan
      if (browserName === "chrome") {
      // Menjalankan browser dalam mode headless
        options = new chrome.Options().addArguments("--headless=new");
      } else if (browserName === "MicrosoftEdge") {
        options = new edge.Options().addArguments("--headless=new");
      }
          // Membuka browser dan menginisialisasi webdriver
           driver = await new Builder()
          .forBrowser(browserName)
          .setChromeOptions(browserName === "chrome" ? options : undefined)
          .setEdgeOptions(browserName === "MicrosoftEdge" ? options : undefined)
          .build();

          // Menghubungkan driver dengan class object
          loginpage = new LoginPage(driver); 
          inventoryPage = new InventoryPage(driver); 
          cart = new Cart(driver);
          information = new Information(driver);
          overview = new Overview(driver);

          // Membuka url di browser
          await loginpage.open(testData.baseUrl); 
          console.log(`${browserName} : url berhasil dibuka`); 

          // Melakukan login
          await loginpage.login(testData.username, testData.password);

          // Memeriksa apakah login berhasil
          if (!(await loginpage.verifyLoginSuccess())) {
            console.log(`❌ Login GAGAL di ${browserName}`);
            // Menentukan lokasi folder screenshot
            const screenshotDir = path.join(__dirname, "../Sesi8/screenshots", browserName);
          // Memeriksa folder screenshot  
          if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true }); // Buat folder jika belum ada
            }
            // Menentukan lokasi file akan disimpan
            const screenshotPath = path.join(screenshotDir, "Login_Gagal.png");
            // Mengambil screenshot
            await takeFullPageScreenshot(driver, screenshotPath);
            // Melewati semua test jika login gagal
            this.skip(); 
            } else {
            console.log(`✅ Login BERHASIL di ${browserName}!`);
            }
    });

    //Test Hook: Dieksekusi setiap test case selesai
    afterEach(async function () {
      // Menentukan lokasi folder screenshot
      const screenshotDir = path.join(__dirname, "../Sesi8/screenshots", browserName);
      // Memeriksa folder screenshot 
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true }); // Buat folder jika belum ada
      }
      // Ambil nama test case lalu ganti semua spasi dengan _ contoh: TC01_login
      const testName = this.currentTest.title.replace(/\s+/g, "_"); 
      // Ambil screenshot dengan halaman penuh lalu disimpan contoh: TC01_login.png
      await takeFullPageScreenshot(driver, path.join(screenshotDir,`${testName}.png`));
      console.log(`📸 Screenshot disimpan: ${browserName}/${testName}.png`);
    });

    //Test Annotation: Test Case
    it("TC01 login", async function () {
    console.log("Login berhasil, lanjut ke test berikutnya.");
    });

    it("TC02 berhasil add to cart", async function () {
    //Product 1
    await inventoryPage.product1();

    //Product 2
    await inventoryPage.product2();

    //Klik Add to cart
    await inventoryPage.addtocart();

    console.log("add to cart");
    });

    it("TC03 berhasil checkout", async function () {
    //Klik Checkout
    await cart.checkout();
        
    console.log("checkout");
    });

    it("TC04 berhasil input data diri", async function () {
    //Masukkan first name
    await information.firstname(testData.information.firstname);
    console.log (testData.information.firstname);
    //Masukkan last name
    await information.lastname(testData.information.lastname);
    console.log (testData.information.lastname);
    //Masukkan postal code
    await information.postalcode(testData.information.postalcode);
    console.log (testData.information.postalcode);
    //Klik Continue
    await information.continue();

    console.log("input data diri");

    });

    it("TC05 berhasil belanja", async function () {
    //Klik finish
    await overview.finish();

    console.log("belanja");

    });

    it("TC06 berhasil kembali ke home", async function () {
    //Klik Back to home
    await inventoryPage.home();
    console.log("kembali ke home");
    });

    //Test Hook: Dieksekusi sekali setelah pengujjian dijalankan
    after(async function () {
    console.log("testing " + browserName);
    await driver.quit();
    });

    });
  }

exampleTest();