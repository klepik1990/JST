Feature ('Проверка корректности UserID');

Scenario ('Check UserID', async (main, logins) => {
    await main.openStartPage();
    await logins.clickMail();
    await logins.sendLogin('AutotestUser');
    await logins.sendPassword( 'AutotestUser123');
    await logins.checkUserID();
});

