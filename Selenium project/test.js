const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

// require("chromedriver");
// const chrome = require("selenium-webdriver/chrome")

async function slowType(element, text, delay = 100) {
    for (let char of text) {
        await element.sendKeys(char);
        await new Promise(resolve => setTimeout(resolve, delay)); // Delay tiap karakter
    }
}

async function exampleTest () {
    //Membuat koneksi dengan webdriver menggunakan chrome
    let driver = await new Builder().forBrowser("chrome").build();

    //menambahkan chrome option sebagai user agent menyerupai browser asli
    //let option = new chrome.Options();

    //perlu menambahkan argument juga
    // options.addArguments("user-agent=Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 640 XL LTE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10166");
    // options.addArguments("--disable-blink-features=AutomationControlled");

    //perlu membuat koneksi dengan driver juga
    // let driver = new Builder()
    // .forBrowser("chrome")
    // .setChromeOptions(options)
    // .build();

    //Exeception Handling & Conclusion

    try {

        // Maksimalkan window untuk dalam layar penuh
        //await driver.manage().window().maximize();

        //membuka url di browser
        await driver.get("https://saucedemo.com");

        //Melakukan sign in
        let usernameField = await driver.findElement(By.xpath("//input[@id='user-name']"));
        await slowType(usernameField, "standard_user", 100);

        let passwordField = await driver.findElement(By.xpath("//input[@id='password']"));
        await slowType(passwordField, "secret_sauce", 100);

        //Klik tombol login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();
        await driver.sleep(2000);

        // Validasi masuk ke halaman dashboard setelah login
        let menuButton = await driver.findElement(By.id('react-burger-menu-btn'));
        assert.strictEqual(await menuButton.isDisplayed(), true, 'menu button is not visible');

        //Klik tombol add to cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        await driver.sleep(2000);

        // Validasi produk ditambahkan menjadi 1
        let totalitem = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        assert.strictEqual(totalitem.includes("1"),true,'Product berhasil ditambahkan menjadi 1"');

        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']")).click();
        await driver.sleep(1000);

        // Validasi produk ditambahkan menjadi 2
        totalitem = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        assert.strictEqual(totalitem.includes("2"),true,'Product berhasil ditambahkan menjadi 2"');
        
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']")).click();
        await driver.sleep(1000);

        // Validasi produk ditambahkan menjadi 3
        totalitem = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        assert.strictEqual(totalitem.includes("3"),true,'Product berhasil ditambahkan menjadi 3"');

        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-fleece-jacket']")).click();
        await driver.sleep(1000);

        // Validasi produk ditambahkan menjadi 4
        totalitem = await driver.findElement(By.css(".shopping_cart_badge")).getText();
        assert.strictEqual(totalitem.includes("4"),true,'Product berhasil ditambahkan menjadi 4"');
        
        //Klik Add to cart
        await driver.findElement(By.xpath("//div[@id='shopping_cart_container']/a[1]")).click();
        await driver.sleep(2000);

        //Validasi masuk ke halaman cart
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://www.saucedemo.com/cart.html',true, 'User tidak berada di halaman cart setelah klik cart');

        // Scroll ke paling bawah
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        await driver.sleep(2000);

        //Klik Checkout
        await driver.findElement(By.xpath("//button[@id='checkout']")).click();
        await driver.sleep(2000);

        //Masukkan first name
        let First = await driver.findElement(By.xpath("//input[@id='first-name']"));
        await slowType(First, "Halmy", 100);

        //Masukkan last name
        let Last = await driver.findElement(By.xpath("//input[@id='last-name']"));
        await slowType(Last, "AK", 100);
        
        //Masukkan postal code
        let Zip = await driver.findElement(By.xpath("//input[@id='postal-code']"));
        await slowType(Zip, "1774", 100);
        await driver.sleep(2000);

        //Klik Continue
        await driver.findElement(By.xpath("//input[@id='continue']")).click();
        await driver.sleep(2000);
        
        // Scroll ke paling bawah
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        await driver.sleep(2000);

        //Klik finish
        await driver.findElement(By.xpath("//button[@id='finish']")).click();
        await driver.sleep(2000);

        //Klik Back to home
        await driver.findElement(By.xpath("//button[@id='back-to-products']")).click();
        await driver.sleep(4000);

        //simulate user behavior typing hello world
        // await searchBox.sendKeys("Hello World", Key.RETURN)
        // await driver.wait(until.elementLocated(By.id(result-state)), 10000) //menunggu 10 detik

        // let title = await driver.getTitle()
        // console.log(`Page title is : ${title}`)

    } finally {

    await driver.quit();

    }
}

exampleTest();