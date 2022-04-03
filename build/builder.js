'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Launcher = function () {
  _createClass(Launcher, null, [{
    key: 'build',
    value: async function build(viewport) {
      var launchOptions = {
        headless: true,
        slowMo: 0,
        args: ['--no-sandbox', '--disable-setui-sandbox', '--disable-web-security']
      };

      var browser = await _puppeteer2.default.launch(launchOptions);
      var page = await browser.newPage();
      var extendedPage = new Launcher(page);
      page.setDefaultTimeout(10000);

      switch (viewport) {
        case 'Mobile':
          var mobileViewport = _puppeteer2.default.devices['iPhone X'];
          await page.emulate(mobileViewport);
          break;
        case 'Tablet':
          var tabletViewport = _puppeteer2.default.devices['iPad landscape'];
          await page.emulate(tabletViewport);
          break;
        case 'Desktop':
          await page.setViewport({ width: 1024, height: 768 });
          break;
        default:
          throw new Error('Supported devices are only MOBILE | TABLET | DESKTOP');
      }

      return new Proxy(extendedPage, {
        get: function get(_target, property) {
          return extendedPage[property] || browser[property] || page[property];
        }
      });
    }
  }]);

  function Launcher(page) {
    _classCallCheck(this, Launcher);

    this.page = page;
  }

  _createClass(Launcher, [{
    key: 'waitAndClick',
    value: async function waitAndClick(selector) {
      await this.page.waitForSelector(selector);
      await this.page.click(selector);
    }
  }, {
    key: 'waitAndType',
    value: async function waitAndType(selector, text) {
      await this.page.waitForSelector(selector);
      await this.page.type(selector, text);
    }
  }, {
    key: 'getText',
    value: async function getText(selector) {
      await this.page.waitForSelector(selector);
      return this.page.$eval(selector, function (e) {
        return e.innerHTML;
      });
    }
  }, {
    key: 'getCount',
    value: async function getCount(selector) {
      await this.page.waitForSelector(selector);
      return this.page.$$eval(selector, function (items) {
        return items.length;
      });
    }
  }, {
    key: 'waitForText',
    value: async function waitForText(selector, text) {
      await this.page.waitForSelector(selector);
      try {
        await this.page.waitForFunction(function (selector, text) {
          return document.querySelector(selector).innerText.replace(/\s/g, '').toLowerCase().includes(text.replace(/\s/g, '').toLowerCase());
        }, {}, selector, text);
      } catch (error) {
        if (error instanceof _puppeteer2.default.errors.TimeoutError) {
          throw new Error('Text "' + text + '" not found for selector "' + selector + '"');
        }
        throw new Error(error);
      }
    }
  }, {
    key: 'waitForXPathAndClick',
    value: async function waitForXPathAndClick(xpath) {
      await this.page.waitForXPath(xpath);
      var elements = await this.page.$x(xpath);
      if (elements.length > 1) {
        console.warn('waitForXPathAndClick returned more than one result');
      }
      await elements[0].click();
    }
  }, {
    key: 'isElementVisible',
    value: async function isElementVisible(selector) {
      var visible = true;
      await this.page.waitForSelector(selector, { visible: true, timeout: 3000 }).catch(function () {
        visible = false;
      });
      return visible;
    }
  }, {
    key: 'isXPathVisible',
    value: async function isXPathVisible(selector) {
      var visible = true;
      await this.page.waitForXPath(selector, { visible: true, timeout: 3000 }).catch(function () {
        visible = false;
      });
      return visible;
    }
  }, {
    key: 'autoScrollToBottomOfPage',
    value: async function autoScrollToBottomOfPage() {
      await this.page.evaluate(async function () {
        await new Promise(function (resolve) {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(function () {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 200);
        });
      });
    }
  }]);

  return Launcher;
}();

exports.default = Launcher;