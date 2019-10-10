const I = actor();

module.exports = {

    elements: {
        market: 'a[data-id=market]',
        searchField: '#header-search',
        submitSearch: '.button2_type_submit',
        deviceToCompare1: 'div[data-id=model-1731400948]',
        deviceToCompare2: 'div[data-id=model-573324027]',
        addToCompareList: '.n-product-toolbar__item-label',
        compareButton: '.button button_size_m button_theme_normal i-bem button_js_inited',
        electronics: 'Электроника',
        tabDevice: 'Планшеты',
        byPrice: 'по цене',
        priceToCompare: 'div.price',

    },

    async openSection(name) {
        if (name.toLowerCase() === 'электроника') {
            await I.click(this.elements.electronics);
        } else if (name.toLowerCase() === 'маркет') {
            await I.click(this.elements.market);
        } else if (name.toLowerCase() === 'планшеты') {
            await I.click(this.elements.tabDevice);
        }
    },

    async sortByPrice() {
        await I.click(this.elements.byPrice);
        await I.waitForVisible('#product-417035289',2);
        // await I.wait(1); // если локатор выше станет неактуальным
    },

    async searchDevice(device) {
        await I.fillField(this.elements.searchField, device);
        await I.click(this.elements.submitSearch);
    },

    async getTextValue1() {
        return I.grabValueFrom(this.elements.deviceToCompare1);
    },

    async getTextValue2() {
        return I.grabAttributeFrom(this.elements.deviceToCompare2, 'title');
    },

    async addDeviceToCompare() {
        await I.moveCursorTo(this.elements.deviceToCompare1);
        await within(this.elements.deviceToCompare1, function () {
            I.click('.n-snippet-cell2__image link i-bem link_js_inited');
        });
        // await I.click('Сравнить');
        await I.moveCursorTo(this.elements.deviceToCompare2);
        await I.click('Сравнить');
    },

    async clickCompareButton() {
        await I.waitForVisible(this.elements.compareButton, 5);
        await I.click(this.elements.compareButton);
    },

    async compareDevices(description) {
        await I.seeTextEquals(description, '.n-compare-head__name link')
    },

    async priceComparator() {
        let price = await I.grabTextFrom(this.elements.priceToCompare);
        await console.log(parseFloat(price[0]));
        await console.log(parseFloat(price[2]));
        +parseFloat(price[0]) < +parseFloat(price[2]);
    }

};