const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);


exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      windowSize: '1920x1080',
      show: true,
      chrome: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']
      }
    }
  },
  include: {
    I: './steps_file.js',
    page: './page.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'visualbox',
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