exports.config = {
  tests:'./**/marketTest2.js',
  output: './output',
  helpers: {
    Puppeteer: {
      waitForNavigation: "networkidle0",
      windowSize: "1200x900",
      url: 'http://localhost',
      show: true,
      chrome: {
        args:[
          'disable-infobars=true',
          'safebrowsing-disable-download-protection',
          '--disable-impl-side-painting',
          '--disable-gpu',
          '--ignore-certificate-errors',
          '--headless',
          '--no-sandbox',
          '--start-maximized']
      },
    }
  },
   include: {
     main: './pages/main.js',
     login: './pages/loginPage.js',
     navigations: './pages/navigation.js',
     market: './pages/marketPage.js',
   },
  bootstrap: null,
  mocha: {},
  name: 'jsproject',
  translation: 'ru-RU'
};