Feature ('Проверка входа с невалидным паролем');

Scenario('Проверка системы на ввод неверного пароля', async(main, login) => {
    await main.openStartPage();
    await login.clickMail();
    await login.sendLogin('AutotestUser');
    await login.sendPassword( 'NoAutotestUser123');
    await login.checkInvalidPasswordMessage();
})