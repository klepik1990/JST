exports.config = {
  tests:"./**/musicTest*.js",
  output: "./output",
  timeout: 20000,
  helpers: {
    Puppeteer: {
      waitForNavigation: "networkidle0",
      // waitForAction: 500,
      // restart: true,
      // keepBrowserState: false,
      windowSize: "1366x768",
      url: "http://localhost",
      show: true,
      chrome: {
        args: [
          "disable-infobars=true",
          "--safebrowsing-disable-download-protection",
          "--disable-impl-side-painting",
          "--disable-gpu",
          "--ignore-certificate-errors",
          // "--headless",
          "--no-sandbox",
          "--start-maximized"]
      },
    },
    mock: {
        require: "./helpers/mock.js"
    },
    // REST: {
    //     endpoint: "https://cloud-api.yandex.net:443/v1/disk/",
    //     defaultHeaders: {
    //         "Authorization": "OAuth AgAAAAA00Se2AAW1W1yCegavqkretMXBGkoUUQk",
    //         "Accept": "*/*"
    //     },
    // }
  },
   plugins: {
       allure: {
           enabled: true,
           outputDir: "allure-results"
       },

   },
   include: {
       main: "./pages/main.js",
       login: "./pages/loginPage.js",
       navigations: "./pages/navigation.js",
       market: "./pages/marketPage.js",
       music: "./pages/musicPage.js",
       api: "./helpers/apiActions.js",
       info: "./helpers/apiInformation.js"
   },
  bootstrap: null,
  mocha: {},
  name: "jsproject",
  translation: "ru-RU"
};