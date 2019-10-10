exports.config = {
  tests:'./**/yandexAPITest*.js',
  output: './output',
  helpers: {
    Puppeteer: {
      waitForNavigation: "networkidle0",
      windowSize: "1920x1080",
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
    },
    mock: {
        require: './helpers/mock.js'
    },
    REST: {
        endpoint: 'https://cloud-api.yandex.net:443/v1/disk/',
        defaultHeaders: {
            "Authorization": "OAuth AgAAAAA00Se2AAW1W1yCegavqkretMXBGkoUUQk",
            "Accept": "*/*"
        },
    }
  },
   include: {
       main: './pages/main.js',
       login: './pages/loginPage.js',
       navigations: './pages/navigation.js',
       market: './pages/marketPage.js',
       music: './pages/musicPage.js',
       api: './helpers/apiActions.js',
       info: './helpers/apiInformation.js'
   },
  bootstrap: null,
  mocha: {},
  name: 'jsproject',
  translation: 'ru-RU'
};