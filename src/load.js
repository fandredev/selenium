require('chromedriver')
require('dotenv').config()

const { writeFileSync } = require('fs')
const { resolve } = require('path')
const { Builder, Capabilities } = require('selenium-webdriver');

(async () => {
  const possibilites = new Capabilities()
  // Realiza ação qnd a página inteira está carregada (Default - 'Recomendado')
  possibilites.setPageLoadStrategy('normal')

  // Espera HTML ser carregado. Fontes/Imagens/CSS não são inclusos no carregamento. (Mais rápido)
  // possibilites.setPageLoadStrategy('eager')

  // Espera a página inicial ser baixada
  // possibilites.setPageLoadStrategy('none')
  
  const driver = await new Builder().withCapabilities(possibilites).forBrowser('chrome').build()
  try {
    await driver.get('http://www.google.com.br')
    
  } catch (error) {
    console.log(error)
  }
  finally {
    const encoded = await driver.takeScreenshot()
    await writeFileSync(resolve(__dirname, 'screenshots', 'load.png'), encoded, 'base64')
    await driver.quit()
  }
})()