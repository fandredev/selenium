require('chromedriver');
require('dotenv').config();
const fs = require('fs')
const { Builder, By } = require('selenium-webdriver');

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
   const encoded = driver.takeScreenshot()
   await fs.writeFileSync('./screenshot.png', encoded, 'base64')
   await driver.quit()
  }
})()