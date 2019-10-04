Feature ('Вход с невалидным паролем');

Scenario('Проверка системы на ввод неверного пароля', async(main, logins) => {
    await main.openStartPage();
    await logins.clickMail();
    await logins.sendLogin('AutotestUser');
    await logins.sendPassword( 'NoAutotestUser123');
    await logins.checkInvalidPasswordMessage();
})