const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: '../tests/*.js',
  output: '../output',
  helpers: {
    Playwright: {
      url: 'http://localhost',
      windowSize: '1800x800',
      show: true,
      browser: 'chromium'
    }
  },
  include: {
    I: '../steps_file.js',
    mainPage: '../pages/mainPage.js',
    pageOurModels: '../pages/pageOurModels.js',
    pageCarConfigurator: '../pages/pageCarConfigurator.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'mbio',
  plugins: {
    shadowDom: {
      enabled: true,
      locator: "shadow",
      require: "query-selector-shadow-dom/plugins/codeceptjs"
    },
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}