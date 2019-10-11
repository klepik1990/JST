Feature('DDT подход');

let sectionList = new DataTable(['section', 'value']);
sectionList.add(['a[data-id=images]', 'images']);
sectionList.add(['a[data-id=news]', 'news']);
sectionList.add(['a[data-id=maps]', 'maps']);
sectionList.add(['a[data-id=market]', 'market']);
sectionList.add(['a[data-id=translate]', 'translate']);
sectionList.add(['a[data-id=music]', 'music']);
sectionList.add(['a[data-id=video]', 'Яндекс.Эфир']);


Data(sectionList).Scenario('DDT', async (main, navigations, current) => {
    await main.openStartPage();
    await navigations.moveTo(current.section, current.value);
});