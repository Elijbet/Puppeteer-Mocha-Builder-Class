// package.js

// "dependencies": {
//     "chai": "^4.2.0",
//     "mocha": "^8.1.3",
//     "mocha-steps": "^1.3.0",
//     "puppeteer": "^5.2.1"
//   },
//   "devDependencies": {
//     "babel-cli": "^6.26.0",
//     "babel-preset-es2015": "^6.24.1",
//     "prettier": "^2.1.1"
//   }

// devDependencies are modules which are only required during development, while dependencies are modules which are also required at runtime
// dependencies are added with npm install <package_name>
// devDependencies need tag --save-dev

// Babel today is less relevant than it used to due to growing ES support and more common browser usage, but Babel will still continue to provide support for experimental and upcoming Javascriptthat isn't available in the browser out of the box. ECMA standards committee has agreed to release yearly updates to the JavaScript language. Babel will always integrate the standards, whereas we don't know if all the browsers will.

// scripts: {"clean"} remove compiled source code folder which was generated to be executed, to clean outdated files and rebuild it from the script. Typical way to do it is with clean script.

// build script is used to bundle you application for when you need to use it on your production environment. For example when you execute npm run build in a react application, the files that are in the build folder can be transferred to your server to be accessible by your users. Not necessary just for production. It can be for staging and testing.
