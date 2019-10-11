const I = actor();

module.exports = {


    async goBack() {
        await I.executeScript(function () {
            return window.history.back()
        });
    },

    async moveTo(locator, expectedValue) {
        if (expectedValue === 'Яндекс.Эфир') {
            await I.click(locator);
            await I.wait(0.5);
            await I.switchToNextTab();
            await I.seeInTitle(expectedValue);
        } else {
            await I.click(locator);
            await I.seeInCurrentUrl(expectedValue);
        }
    },

};