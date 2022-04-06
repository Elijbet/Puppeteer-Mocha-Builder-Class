import puppeteer from 'puppeteer'

export default class Launcher {
  static async build(viewport) {
    const launchOptions = {
      headless: true,
      slowMo: 0,
      args: [
        '--no-sandbox',
        '--disable-setui-sandbox',
        // In order to protect the host environment from untrusted web content, Chrome uses multiple layers of sandboxing. For this to work properly, the host should be configured first. If there's no good sandbox for Chrome to use, it will crash with the error No usable sandbox!. The --no-sandbox option is a straightforward workaround but obviously a poor security practice
        '--disable-web-security', // prevent blocking
      ],
    }

    const browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage()
    const extendedPage = new Launcher(page) // We will be creating a proxy to combine the powers of the page and our extended page into one class, because we want to extend over the default puppeteer framework page class. Using this proxy trick you can actually override or even extend to include some of our extra functions.
    page.setDefaultTimeout(10000)

    switch (
      viewport // device simulators
    ) {
      case 'Mobile':
        const mobileViewport = puppeteer.devices['iPhone X']
        await page.emulate(mobileViewport)
        break
      case 'Tablet':
        const tabletViewport = puppeteer.devices['iPad landscape']
        await page.emulate(tabletViewport)
        break
      case 'Desktop': // there is no viewport for desktop
        await page.setViewport({ width: 1024, height: 768 })
        break
      default:
        throw new Error('Supported devices are only MOBILE | TABLET | DESKTOP')
    }
    // PROXY
    // const target = {
    //   message1: 'hello',
    //   message2: 'everyone',
    // }
    // const handler2 = {
    //   get(target, prop, receiver) {
    //     return 'world'
    //   },
    // }
    // const proxy2 = new Proxy(target, handler2)
    // console.log(proxy2.message1); // world
    // console.log(proxy2.message2); // world

    // Here we've provided an implementation of the get() handler, which intercepts attempts to access properties in the target. Handler functions are sometimes called traps, presumably because they trap calls to the target object.

    return new Proxy(extendedPage, {
      // proxy just takes multiple objects and merges them into one
      get: function (_target, property) {
        return extendedPage[property] || browser[property] || page[property]
      },
    })
  }

  constructor(page) {
    this.page = page
  }

  async waitAndClick(selector) {
    await this.page.waitForSelector(selector)
    await this.page.click(selector)
  }

  async waitAndType(selector, text) {
    await this.page.waitForSelector(selector)
    await this.page.type(selector, text)
  }

  async getText(selector) {
    await this.page.waitForSelector(selector)
    return this.page.$eval(selector, e => e.innerHTML)
  }

  async getCount(selector) {
    await this.page.waitForSelector(selector)
    return this.page.$$eval(selector, items => items.length)
  }

  async waitForText(selector, text) {
    await this.page.waitForSelector(selector)
    try {
      await this.page.waitForFunction(
        (selector, text) =>
          document
            .querySelector(selector)

            .innerText.replace(/\s/g, '')
            .toLowerCase()
            .includes(text.replace(/\s/g, '').toLowerCase()),
        {},
        selector,
        text
      )
    } catch (error) {
      if (error instanceof puppeteer.errors.TimeoutError) {
        throw new Error(`Text "${text}" not found for selector "${selector}"`)
      }
      throw new Error(error)
    }
  }

  async waitForXPathAndClick(xpath) {
    await this.page.waitForXPath(xpath)
    const elements = await this.page.$x(xpath)
    if (elements.length > 1) {
      console.warn('waitForXPathAndClick returned more than one result')
    }
    await elements[0].click()
  }

  async isElementVisible(selector) {
    let visible = true
    await this.page
      .waitForSelector(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false
      })
    return visible
  }

  async isXPathVisible(selector) {
    let visible = true
    await this.page
      .waitForXPath(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false
      })
    return visible
  }

  async autoScrollToBottomOfPage() {
    await this.page.evaluate(async () => {
      await new Promise(resolve => {
        let totalHeight = 0
        const distance = 100
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight
          window.scrollBy(0, distance)
          totalHeight += distance
          if (totalHeight >= scrollHeight) {
            clearInterval(timer)
            resolve()
          }
        }, 200)
      })
    })
  }
}
