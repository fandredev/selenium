const { writeFileSync } = require("fs")
const { resolve } = require('path')

module.exports = async (driver, image, base = 'base64') => {
  const screenshot = await driver.takeScreenshot()

  const photo = writeFileSync(
    resolve(__dirname, '..', 'screenshots', `${image}.png`), screenshot, base
  )

  return photo
}