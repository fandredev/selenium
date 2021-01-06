require('chromedriver');

const { Builder, Key, By, Capabilities } = require('selenium-webdriver');
const maximize = require('./utils/maximize'); 

(async () => {
  const load = new Capabilities()
  load.setPageLoadStrategy('normal')

  const driver = await new Builder().withCapabilities(load).forBrowser('chrome').build()
  try {
    maximize(driver)
    await driver.get('https://4you2idiomas.com.br/login')
    await driver.findElement(By.name('_username')).sendKeys('teste')
    await driver.actions().keyDown(Key.CONTROL).sendKeys('a').perform()
    const password = await driver.findElement(By.name('_password'))
    await password.sendKeys('Felipe')
    await password.clear()
  } catch (error) {
    console.log(error, 'Error')
  }
  finally {
    await driver.quit()
  }
})()