Feature('Проверка сортировки');

Scenario('Проверка работы сортировки', async (main, market) => {
    await main.openStartPage();
    await market.openSection('маркет');
    await market.openSection('электроника');
    await market.openSection('планшеты');
    await market.sortByPrice();
    await market.priceComparator();
});