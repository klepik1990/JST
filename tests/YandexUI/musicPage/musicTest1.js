Feature('Проверка поиска выбранной группы.');

Before(async (main, login) => {
    await main.openStartPage();
    await login.clickMail();
    await login.sendLogin('AutotestUser');
    await login.sendPassword('AutotestUser123');
});

Scenario('Ищем группу Metallica', async (main, music) => {
    await main.openStartPage();
    await music.openMusicPage();
    await music.searchMusic();
    await music.checkArtist();
    await music.checkPopularAlbums();
});