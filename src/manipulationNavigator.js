require('chromedriver');
require('dotenv').config();

const { Builder, By } = require('selenium-webdriver');
const takePicture = require('./utils/snapshot');

(async () => {
  const driver = await new Builder().forBrowser('chrome').build()
  const { width: w } = await driver.manage().window().getRect()
  try {
    if(driver) {
      await driver.get(process.env.NAVIGATE_URL || 'http://x9.4y2.org/')
      const identification = await driver.getWindowHandle()
      const minimizer = await driver.manage().window().maximize()
      const isReactApp = await driver.findElement(By.id('root'))

      if(identification.slice(0,2) === 'CD' && isReactApp) {
        await driver.manage().window().fullscreen()
        await driver.switchTo().newWindow('tab')
      }
      console.log(w < 700 && minimizer ? 'minimize': 'maximize')
    }
  } catch (error) {console.error('Error in google chrome driver')}
  finally {
   takePicture(driver, 'manipulation')
   await driver.quit()
  }
})()