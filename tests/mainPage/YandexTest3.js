Feature ('Проверка logout');

Scenario('Проверка выхода из почты', async (main, login) => {
    await main.openStartPage();
    await login.clickMail();
    await login.sendLogin('AutotestUser');
    await login.sendPassword( 'AutotestUser123');
    await login.logout();
    await login.checkURL();
    }
);