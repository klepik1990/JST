const I = actor();
const assert = require('assert');

module.exports = {

    elements: {
        market: 'a[data-id=market]',
        searchField: '#header-search',
        submitSearch: '.button2_type_submit',
        deviceToCompare1: 'div[data-id=model-1731400948]',
        deviceToCompare2: 'div[data-id=model-573324027]',
        addToCompareList: '.n-product-toolbar__item-label',
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
        return I.grabAttributeFrom("//div[@data-id='model-1731400948']//img", 'title');
    },

    async getTextValue2() {
        return I.grabAttributeFrom("//div[@data-id='model-573324027']//img", 'title');
    },

    async addDeviceToCompare() {
        await I.moveCursorTo(this.elements.deviceToCompare1);
        await within(this.elements.deviceToCompare1, async function () {
            await I.click('i.image_name_compare');
        });
        await I.moveCursorTo(this.elements.deviceToCompare2);
        await within(this.elements.deviceToCompare2, async function () {
            await I.click('i.image_name_compare');
        });
    },

    async clickCompareButton() {
        await I.waitForText('Сравнить', 5);
        await I.click('Сравнить');
    },

    async checkDevice1(description) {
        let device = await I.grabAttributeFrom('//div/img', 'alt');
        await console.log(device[1]);
        await assert.equal(description, device[1]);
    },

    async checkDevice2(description) {
        let device = await I.grabAttributeFrom('//div/img', 'alt');
        await console.log(device[0]);
        await assert.equal(description, device[0]);
    },
    async priceComparator() {
        let price = await I.grabTextFrom(this.elements.priceToCompare);
        await console.log(parseFloat(price[0]));
        await console.log(parseFloat(price[2]));
        +parseFloat(price[0]) < +parseFloat(price[2]);
    }

};