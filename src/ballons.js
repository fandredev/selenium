require('chromedriver')
require('dotenv').config();

const { Builder} = require('selenium-webdriver');


(async () => {
  const driver = await new Builder().forBrowser('chrome').build()
  try {
    if(driver) {
      await driver.get(process.env.NAVIGATE_URL || 'http://x9.4y2.org/')
      await driver.manage().window().maximize()
      const alert = await driver.switchTo().alert()
      await alert.sendKeys('Selenium').then(success => {
        console.log(success, 'Sucesso')
      }).catch(error => console.log(error, 'Erro'))

    }
  } catch (error) {
    console.log(error)
  }
})()