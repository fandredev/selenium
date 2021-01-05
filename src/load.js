require('chromedriver')
require('dotenv').config()

const { Builder, Capabilities } = require('selenium-webdriver');
const takePicture = require('./utils/snapshot');


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
    takePicture(driver, 'load')
    await driver.quit()
  }
})()