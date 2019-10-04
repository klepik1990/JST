const I = actor();

module.exports = {

    elements: {
        openPage: 'https://yandex.by',
        geoLink: '.geolink__reg',
        cityInput: '#city__front-input',
        moreDropdownButton: '.home-tabs__more-switcher',
        moreDropdownList: '.home-tabs__more-link',
    },

    async openStartPage() {
        await I.amOnPage(this.elements.openPage);
    },

    async setLocation(text) {
        await I.click(this.elements.geoLink);
        await I.waitForEnabled(this.elements.cityInput, 10);
        await I.fillField(this.elements.cityInput, text);
        await I.pressKey('Enter');
        await I.pressKey('Enter');
    },

    async getServiceList() {
        await I.waitForElement(this.elements.moreDropdownButton, 10);
        await I.click(this.elements.moreDropdownButton);
        let serviceList = await I.grabTextFrom(this.elements.moreDropdownList);
        return serviceList;
    },

    async comparator(serviceList1, serviceList2) {
        await (JSON.stringify(serviceList1) === JSON.stringify(serviceList2));
    }

};
