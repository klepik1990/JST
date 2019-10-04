Feature ('Вход с невалидным логином');

Scenario('Проверка системы на ввод неверного логина', async(main, logins) => {
    await main.openStartPage();
    await logins.clickMail();
    await logins.sendLogin('NoAutotestUser');
    await logins.checkInvalidLoginMessage();
})