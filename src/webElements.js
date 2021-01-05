/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
require('chromedriver')

const { writeFileSync } = require('fs')
const { resolve } = require('path')

const { Builder, Capabilities, By }  = require('selenium-webdriver');

(async () => {
  const load = new Capabilities()
  load.setPageLoadStrategy('normal')

  const driver = await new Builder().withCapabilities(load).forBrowser('chrome').build()
  try {
    // await driver.get(process.env.NAVIGATE_URL || 'http://x9.4y2.org/')

     // Find Element - Encontra um elemento correspondente
      await driver.get('http://www.google.com.br')
      const searchInGoogle = await driver.findElement(By.name('q')) // Encontra elemento com name='q'
      await searchInGoogle.sendKeys('Fazer 250 - Pantera Negra') // Digite no campo com name='q'
    
   /*  
      Find Elements - Encontra mais de um elemento correspondente
        const elements = await driver.findElements(By.css('p'));
        for(const e of elements) {
          const texts = await e.getText()// Encontra todos os p da página
          console.log(texts); 
        }
    */

    /* 
      Encontrar Elementos dentro de Elementos pais
        const searchFatherElement = driver.findElement(By.id('root'))
        const main = searchFatherElement.findElement(By.className('main'))
        console.log(await main.getTagName(), 'Elemento')
    */

    /*
      Elemento está habilitado?
        const enabled = await driver.findElement(By.css('button')).isEnabled()
        console.log(enabled ? 'Enabled Button': 'Disabled Button')
      */
    
    /*
      Obter texto
        const aboutSite = await driver.findElement(By.className('text-historic')).getText()
        console.log(aboutSite)
    */

    /*
      Obter css
        await driver.get('http://www.google.com.br')
        const about = await driver.findElement(By.name('btnK')).getCssValue()
        console.log(about)
    */
   
  } catch (error) {
      console.log(error)
  }
  finally {
    const snapshot = await driver.takeScreenshot()
    await writeFileSync(resolve(__dirname, 'screenshots', 'web.png'), snapshot, 'base64')
    await driver.quit()
  }
})()