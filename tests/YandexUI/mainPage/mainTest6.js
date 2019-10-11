Feature('Проверка корректности переходов по вкладкам');

Scenario('Переход по вкладкам', async (main, navigations) => {
    await main.openStartPage();
    await navigations.moveTo('a[data-id=images]', 'images');
    await navigations.goBack();
    await navigations.moveTo('a[data-id=news]', 'news');
    await navigations.goBack();
    await navigations.moveTo('a[data-id=maps]', 'maps');
    await navigations.goBack();
    await navigations.moveTo('a[data-id=market]', 'market');
    await navigations.goBack();
    await navigations.moveTo('a[data-id=translate]', 'translate');
    await navigations.goBack();
    await navigations.moveTo('a[data-id=music]', 'music');
    await navigations.goBack();
    await navigations.moveTo('a[data-id=video]' , 'Яндекс.Эфир');
});