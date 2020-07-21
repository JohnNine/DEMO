const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-web-security']
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:10086/sharepic/')
  let body = await page.$('.share-pic');
  // await page.on('load', async function() {
    await body.screenshot({ 
      path: `example${Math.random()}.png`,
      omitBackground: true
    })
  // })

  await browser.close()
  console.log(123)
})()
