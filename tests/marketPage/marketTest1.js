Feature("Сравнение устройств.");

Scenario('Сравнение выбранных устройств', async (main, market) => {
    await main.openStartPage();
    // await I.amOnPage('https://yandex.by');
    await market.openSection('маркет');
    await market.searchDevice('Note 8');
    // let device1 = await market.getTextValue1;
    // let device2 = await market.getTextValue2;
    await market.addToCompare();
    await market.clickCompareButton();
    // await market.compareDevices(device1);
    // await market.compareDevices(device2);



});