const I = actor();

module.exports = {

    elements: {
        mailButton: 'Почта',
        login: '#passp-field-login',
        pass: '#passp-field-passwd',
        userID: '.mail-User-Name',
        skipAvatar: '.passp-auth-header-link'
    },

    async clickMail() {
        await I.click(this.elements.mailButton);
    },

    async sendLogin(name) {
        await I.fillField(this.elements.login, name);
        await I.pressKey('Enter');
    },
    async sendPassword(password) {
        await I.fillField(this.elements.pass, password);
        await I.pressKey('Enter');
        await I.wait(0.5);
        // await I.waitForElement(this.elements.skipAvatar, 10);
        // await I.click(this.elements.skipAvatar);
    },

    async checkUserID() {
        await I.waitForElement(this.elements.userID, 10);
        await I.see('AutotestUser', this.elements.userID);
    },

    async logout() {
        await I.waitForElement(this.elements.userID, 10);
        await I.click(this.elements.userID);
        await I.waitForText('Выйти из сервисов Яндекса');
        await I.click('Выйти из сервисов Яндекса');
    },

    async checkURL() {
        await I.seeCurrentUrlEquals('https://yandex.by/');
        await I.dontSeeInTitle('Яндекс.Почта');
    },

    async checkInvalidPasswordMessage() {
        await I.see('Неверный пароль')
    },

    async checkInvalidLoginMessage() {
        await I.see('Такого аккаунта нет');
    }

};