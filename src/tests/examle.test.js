import { expect } from 'chai'
import { step } from 'mocha-steps'

// Sequential scenarios for mocha: a library that is handy for BDD-like (human-readable descriptions as reqts) scenarios, or smoke tests that need to run through specific steps. Any failing step will abort the parent describe immediately, although Mocha supports bailing after the first test failure with --bail or -b tag without the steps. The difference is that in steps scenario the blocks aren't independent. A failing step would fail all the rest, so they are skipped instead.

import Page from '../builder'
import LoginPage from '../pages/LoginPage'

describe('End-to-end Test', () => {
  let page
  let loginPage

  before(async () => {
    page = await Page.build('Desktop')
    loginPage = await new LoginPage(page)
  })

  after(async () => {
    await page.close()
  })

  step('should load google homepage', async () => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    const signInButton = await page.isElementVisible('#signin_button')
    expect(signInButton).to.be.true
  })

  step('should display login form', async () => {
    await page.waitAndClick('#signin_button')
    const loginForm = await page.isElementVisible('#login_form')
    expect(loginForm).to.be.true
    const signInButton = await page.isElementVisible('#signin_button')
    expect(signInButton).to.be.false
  })

  step('should login to application', async () => {
    await loginPage.login('username', 'password')
    const navbar = await page.isElementVisible('.nav-tabs')
    expect(navbar).to.be.true
  })

  step('should have 6 navabr links', async () => {
    expect(await page.getCount('.nav-tabs li')).to.equal(6)
  })
})
