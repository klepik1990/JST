Feature ('Проверка входа с невалидным логином');

Scenario('Проверка системы на ввод неверного логина', async(main, login) => {
    await main.openStartPage();
    await login.clickMail();
    await login.sendLogin('NoAutotestUser');
    await login.checkInvalidLoginMessage();
})