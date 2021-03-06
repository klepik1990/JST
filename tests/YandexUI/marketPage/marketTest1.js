Feature("Сравнение выбранных устройств.");

Scenario('Сравнение выбранных устройств', async (main, market) => {
    await main.openStartPage();
    await market.openSection('маркет');
    await market.searchDevice('Note 8');
    let device1 = await market.getTextValue1();
    let device2 = await market.getTextValue2();
    await market.addDeviceToCompare();
    await market.clickCompareButton();
    await market.checkDevice1(device1);
    await market.checkDevice2(device2);
});