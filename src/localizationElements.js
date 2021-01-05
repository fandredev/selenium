require('chromedriver');
const { Builder, By, until} = require('selenium-webdriver');

(async function test() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(process.env.NAVIGATE_URL || 'http://x9.4y2.org/');
       const title = await driver.wait(until.titleIs('X9 - Health Check'), 1000);
       const url = await driver.wait(until.urlIs(process.env.NAVIGATE_URL || 'http://x9.4y2.org/'))
       const isReactContainId = await driver.findElement(By.id('root'))
       const isFooterContainClass = await driver.findElement(By.css('footer')) 


       if(title) console.log('Title is correct!')
       if(url) console.log('Url is correct!')
       if(isReactContainId) console.log('Yes, this is a React app.')
       if(isFooterContainClass) console.log('Sim, footer a have a classe.')

       
    } finally {
        await driver.quit();
    }
})();

