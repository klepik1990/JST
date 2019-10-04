exports.config = {
  tests:'./YandexTest6.js',
  output: './output',
  helpers: {
    Puppeteer: {
      waitForNavigation: "networkidle0",
      windowSize: "1200x900",
      url: 'http://localhost',
      show: false,
    }
  },
  include: {
    main: './main.js',
    logins: './loginPage.js',
    navigations: './navigation.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'jsproject',
  translation: 'ru-RU'
}