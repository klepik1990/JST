Feature ('Проверка logout');

Scenario('Проверка выхода из почты', async (main, logins) => {
    await main.openStartPage();
    await logins.clickMail();
    await logins.sendLogin('AutotestUser');
    await logins.sendPassword( 'AutotestUser123');
    await logins.logout();
    await logins.checkURL();
    }
);