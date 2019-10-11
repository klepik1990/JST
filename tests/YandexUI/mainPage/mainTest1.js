Feature ('Сравнение списков доступных сервисов для разных локаций.');

Scenario('Service Lists Comparing.', async (I, main) => {
    await main.openStartPage();
    await main.setLocation('Лондон');
    let list1 = await main.getServiceList();
    await main.setLocation('Париж');
    let list2 = await main.getServiceList();
    await main.comparator(list1, list2);

});