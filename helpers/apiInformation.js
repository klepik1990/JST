let unirest = require('unirest');
let assert = require('assert');

module.exports = {

    elements: {
        customHeaders: {
            Authorization: "OAuth AgAAAAA00Se2AAW1W1yCegavqkretMXBGkoUUQk",
            Accept: "*/*"
        },
        URL: 'https://cloud-api.yandex.net:443/v1/disk/',
    },

    async getFolderInfo(folderName, subfolderName = undefined) {
        let info;
        if (subfolderName !== undefined) {
            info = await unirest.get(`${this.elements.URL}resources?path=${folderName}/${subfolderName}&fields=path, type`)
                .header(this.elements.customHeaders);
        } else {
            info = await unirest.get(`${this.elements.URL}resources?path=${folderName}&fields=path, type`)
                .header(this.elements.customHeaders);
        }
        if (info.statusCode === 404) {
            await assert.equal(info.body.description, 'Resource not found.');
        } else {
            await assert.equal(info.body.path, `disk:/${folderName}`);
        }
    },

    async getFileInfo(folderName, subfolderName = undefined, fileName) {
        let fileInfo;
        if (subfolderName === undefined) {
            fileInfo = await unirest.get(`${this.elements.URL}resources?path=${folderName}/${fileName}.jpeg&fields=path`)
                .header(this.elements.customHeaders);
        } else {
            fileInfo = await unirest.get(`${this.elements.URL}resources?path=${folderName}/${subfolderName}/${fileName}.jpeg&fields=path`)
                .header(this.elements.customHeaders);
        }
        if (fileInfo.statusCode === 404) {
            assert.equal(fileInfo.body.description, 'Resource not found.');
        } else {
            assert.equal(fileInfo.body.path, `disk:/${folderName}/${fileName}.jpeg`);
        }
    },

    async getBucketInfo(fileName) {
        let info = await unirest.get(`${this.elements.URL}trash/resources?path=%2F${fileName}.jpeg&path`)
            .header(this.elements.customHeaders);
        if (info.statusCode === 404) {
            assert.equal(info.body.description, 'Resource not found.');
        } else {
            assert.equal(info.body.path, `trash:/${fileName}.jpeg`);
        }
    },

    async getBucketSize() {
        let size = await unirest.get(`${this.elements.URL}`).header(this.elements.customHeaders);
        await console.log('Размер корзины=', size.body.trash_size);
        return size.body.trash_size;
    },

    async getFileSize(folderName, fileName) {
        let size = await unirest.get(`${this.elements.URL}resources?path=${folderName}/${fileName}.jpeg&fields=size`)
            .header(this.elements.customHeaders);
        await console.log('Размер файла=', size.body.size);
        return size.body.size;

    },

    async checkSizesForEquals(fileSize1, fileSize2, bucketSizeBefore, bucketSizeAfter) {
        await assert.equal(fileSize1 + fileSize2 + bucketSizeBefore, bucketSizeAfter);
    },




}