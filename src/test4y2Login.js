require('chromedriver')

const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');

const { writeFileSync } = require('fs');
const { resolve } = require('path');

(async () => {
  const load = new Capabilities()
  load.setPageLoadStrategy('normal')

  const driver = await new Builder().withCapabilities(load).forBrowser('chrome').build()
  const url = 'https://4you2idiomas.com.br/login'
  try {
    await driver.manage().setTimeouts( { implicit: 3000 } );
    await driver.get(url)

    await driver.manage().window().maximize()
    await driver.findElement(By.name('_username')).sendKeys('Orinonia')
    await driver.findElement(By.name('_password')).sendKeys('Orinonia123')
    const enabledButton = await driver.findElement(By.css('button')).isEnabled()

    if(enabledButton) {
      await driver.findElement(By.css('button')).click()
      // Logado
      
      const findElementAnchor = await driver.findElement(By.className('dropdown-toggle nav-link dropdown-user-link'))
      if(findElementAnchor) {
        findElementAnchor.click()
        const logout = await driver.findElement(By.className('dropdown-item logout'))
          await logout.click()
          await driver.findElement(By.name('_password')).sendKeys('Orinonia123', Key.ENTER)
          await driver.findElement(By.css('button')).click() 
      }
    }
  } catch (error) {
    console.log(error, 'Erros')
  }
  finally {
    const screenshot = await driver.takeScreenshot()
    await writeFileSync(resolve(__dirname, 'screenshots','4y2.png'), screenshot, 'base64')
    await driver.quit()
  }
})()