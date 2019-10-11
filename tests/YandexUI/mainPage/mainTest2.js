Feature ('Проверка корректности UserID после входа в систему');

Scenario ('Check UserID', async (main, login) => {
    await main.openStartPage();
    await login.clickMail();
    await login.sendLogin('AutotestUser');
    await login.sendPassword( 'AutotestUser123');
    await login.checkUserID();
});

