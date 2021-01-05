module.exports = async driver => {
  const full = await driver.manage().window().fullscreen()

  return full
}