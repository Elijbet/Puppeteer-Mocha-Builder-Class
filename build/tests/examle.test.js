'use strict'

var _chai = require('chai')

var _mochaSteps = require('mocha-steps')

var _builder = require('../builder')

var _builder2 = _interopRequireDefault(_builder)

var _LoginPage = require('../pages/LoginPage')

var _LoginPage2 = _interopRequireDefault(_LoginPage)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

// Sequential scenarios for mocha: a library that is handy for BDD-like (human-readable descriptions as reqts) scenarios, or smoke tests that need to run through specific steps. Any failing step will abort the parent describe immediately, although Mocha supports bailing after the first test failure with --bail or -b tag without the steps. The difference is that in steps scenario the blocks aren't independent. A failing step would fail all the rest, so they are skipped instead.

describe('End-to-end Test', function () {
  var page = void 0
  var loginPage = void 0
  var mobile = void 0

  before(async function () {
    page = await _builder2.default.build('Desktop')
    mobile = await _builder2.default.build('Mobile') // can spin the second page
    loginPage = await new _LoginPage2.default(page)
  })

  after(async function () {
    await page.close()
    await mobile.close()
  })

  ;(0, _mochaSteps.step)('should load google homepage', async function () {
    await page.goto('http://zero.webappsecurity.com/index.html')
    var signInButton = await page.isElementVisible('#signin_button')
    ;(0, _chai.expect)(signInButton).to.be.true
  })

  ;(0, _mochaSteps.step)('should display login form', async function () {
    await page.waitAndClick('#signin_button')
    var loginForm = await page.isElementVisible('#login_form')
    ;(0, _chai.expect)(loginForm).to.be.true
    var signInButton = await page.isElementVisible('#signin_button')
    ;(0, _chai.expect)(signInButton).to.be.false
  })

  ;(0, _mochaSteps.step)('should login to application', async function () {
    await loginPage.login('username', 'password')
    var navbar = await page.isElementVisible('.nav-tabs')
    ;(0, _chai.expect)(navbar).to.be.true
  })

  ;(0, _mochaSteps.step)('should have 3 navabr links', async function () {
    ;(0, _chai.expect)(await page.getCount('.nav-tabs li')).to.equal(6)
  })
})
