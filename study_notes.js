// package.js

/* "dependencies": {
     "chai": "^4.2.0",
     "mocha": "^8.1.3",
     "mocha-steps": "^1.3.0",
     "puppeteer": "^5.2.1"
   },
   "devDependencies": {
     "babel-cli": "^6.26.0",
     "babel-preset-es2015": "^6.24.1",
     "prettier": "^2.1.1"
   }
*/

/* devDependencies are modules which are only required during development, while dependencies are modules which are also required at runtime
dependencies are added with npm install <package_name>
devDependencies need tag --save-dev */

// Babel today is less relevant than it used to due to growing ES support and more common browser usage, but Babel will still continue to provide support for experimental and upcoming Javascriptthat isn't available in the browser out of the box. ECMA standards committee has agreed to release yearly updates to the JavaScript language. Babel will always integrate the standards, whereas we don't know if all the browsers will.

// scripts: {"clean"} remove compiled source code folder which was generated to be executed, to clean outdated files and rebuild it from the script. Typical way to do it is with clean script.

// build script is used to bundle you application for when you need to use it on your production environment. For example when you execute npm run build in a react application, the files that are in the build folder can be transferred to your server to be accessible by your users. Not necessary just for production. It can be for staging and testing.

// The difference between chai, mocha, and jest.

// Jest is a testing framework commonly used for React apps.

// Mocha is a test framework but it requires other libraries to fully function, including something like chai. Chai is an assertion library, which means it exposes a syntax and API for defining tests that something like Mocha will then run.

// Puppeteer is a Node library that provides a high-level API to control headless Chrome or Chromium browsers over the DevTools Protocol. It can also be configured to use full (non-headless) Chrome or Chromium.

// Do Jest and Mocha both use Puppeteer?

// Not by default. By default they test the code itself, which is commonly called a unit test. Jest also includes functionality to render a React component, but it does that by rendering the component and not using Puppeteer to render the whole page. Puppeteer can be used with either framework to implement a kind of testing commonly called an integration test, which tests that various functionality is working correctly when integrated together and usually uses the same interface for testing, the browser, as an actual user would.

// Also used for e2e tests.

/* Integration Testing
 Testing to make sure app components work well together.
 The scope could span multiple components but won’t span the entire stack most of the time. 
 Done to discover connectivity issues between components when they are working together. 
 Less expensive to implement.
 Higher-level than unit testing.
 Faster to perform.*/

/* End-to-End Testing
 Testing the product as a user would experience it. 
 Testing scope is wider and spans the entire application technology stack.
 Done to have a feel of the user experience of the app.
 More expensive to implement, both in terms of hardware and software.
 Higher-level than integration testing.
 Slower to perform.*/
