let unirest = require('unirest');
let assert = require('assert');

module.exports = {

    elements: {
        customHeaders: {
            Authorization: "OAuth AgAAAAA00Se2AAW1W1yCegavqkretMXBGkoUUQk",
            Accept: "*/*"
        },
        URL: 'https://cloud-api.yandex.net:443/v1/disk/',
        image1: 'https://content.onliner.by/news/820x5616/ae0a84b410422e818a91e7b0aba74e6b.jpeg',
        image2: 'https://content.onliner.by/news/820x5616/e7d2ab731b758e3314dc8099882275f4.jpeg'
    },

    async createFolder(folderName, subfolderName = undefined) {
        if (subfolderName === undefined) {
            assert.notEqual(folderName, undefined, 'Отсутствует имя папки!');
            let response = await unirest.put(`${this.elements.URL}resources?path=${folderName}`)
                .header(this.elements.customHeaders);

            if (response.statusCode === 409) {
                let deleteResponse = await unirest.delete(
                    `${this.elements.URL}resources?path=${folderName}&permanently=true`)
                    .header(this.elements.customHeaders);

                if (deleteResponse.statusCode === 202 || deleteResponse.statusCode ===204) {
                    await unirest.put(`${this.elements.URL}resources?path=${folderName}`)
                        .header(this.elements.customHeaders);
                }
            }
        } else {
            assert.notEqual(folderName, undefined, 'Отсутствует имя папки!');
            let createFolder = await unirest.put(`${this.elements.URL}resources?path=${folderName}`)
                .header(this.elements.customHeaders);

            if (createFolder.statusCode === 409) {
                let deleteResponse = await unirest.delete(
                    `${this.elements.URL}resources?path=${folderName}&permanently=true`)
                    .header(this.elements.customHeaders);

                if (deleteResponse.statusCode === 202 || deleteResponse.statusCode ===204) {
                    await unirest.put(`${this.elements.URL}resources?path=${folderName}`)
                        .header(this.elements.customHeaders);
                }
            }
            await unirest.put(`${this.elements.URL}resources?path=${folderName}/${subfolderName}`)
                .header(this.elements.customHeaders);
        }

    },

    async fileUpload(folderName, fileName, subfolderName = undefined) {
        let newFile;
        assert.notEqual(fileName, undefined, 'Не введено имя файла.');
        if (subfolderName !== undefined) {
            newFile = await unirest.get(`${this.elements.URL}resources/upload?path=${folderName}/${subfolderName}/${fileName}.jpeg&overwrite=true`)
                .header(this.elements.customHeaders);
            await unirest.put(newFile.body.href);
        } else {
            newFile = await unirest.get(`${this.elements.URL}resources/upload?path=${folderName}/${fileName}.jpeg&overwrite=true`)
                .header(this.elements.customHeaders);
            await unirest.put(newFile.body.href);
        }
    },

    async deleteFile(folderName, fileName) {
        await unirest.delete(`${this.elements.URL}resources?path=${folderName}/${fileName}.jpeg&permanently=true`)
            .header(this.elements.customHeaders);
    },

    async deleteFolder(folderName) {
        await unirest.delete(`${this.elements.URL}resources?path=${folderName}&permanently=true`)
            .header(this.elements.customHeaders);
    },

    async moveFileToBucket(folderName, fileName) {
        await unirest.delete(`${this.elements.URL}resources?path=${folderName}/${fileName}.jpeg`)
            .header(this.elements.customHeaders);
    },

    async recoverFileFromBucket(fileName) {
        await unirest.put(`${this.elements.URL}trash/resources/restore?path=%2F${fileName}.jpeg`)
            .header(this.elements.customHeaders);
    },

    async createFiles(folderName, fileName1, fileName2) {
        assert.notEqual(fileName1, undefined, 'Не введено имя первого файла!');
        assert.notEqual(fileName2, undefined, 'Не введено имя второго файла!');
        assert.notEqual(fileName1, fileName2, 'Имена файлов не должны совпадать!');
        let file1 = await unirest.post(
            `${this.elements.URL}resources/upload?url=${this.elements.image1}&path=${folderName}/${fileName1}.jpeg`)
            .header(this.elements.customHeaders);
        let file2 = await unirest.post(
            `${this.elements.URL}resources/upload?url=${this.elements.image2}&path=${folderName}/${fileName2}.jpeg`)
            .header(this.elements.customHeaders);
        setTimeout(async () => {
            await unirest.get(`${file1.body.href}`).header(this.elements.customHeaders)
                .end((response) => {console.log('Статус загрузки файла:', response.body.status);
                assert.equal(response.body.status, 'success', 'Статус не success.');});

            await unirest.get(`${file2.body.href}`).header(this.elements.customHeaders)
                .end((response) => {console.log('Статус загрузки файла:', response.body.status);
                assert.equal(response.body.status, 'success', 'Статус не success.');});
        }, 2000);
    },

    async deleteNonEmptyFolder(folderName) {
        let folder = await unirest.delete(`${this.elements.URL}resources?path=${folderName}&permanently=true`)
            .header(this.elements.customHeaders);

        setTimeout(async () => {
            await unirest.get(`${folder.body.href}`).header(this.elements.customHeaders)
                .end((response) => {console.log('Статус удаления папки с файлами:', response.body.status);
                assert.equal(response.body.status, 'success', 'Статус удаления не success');});
        }, 3000);
    },

    async clearBucket() {
        let bucketResponse = await unirest.delete(`${this.elements.URL}trash/resources`)
            .header(this.elements.customHeaders);
        setTimeout(async () => {
            await unirest.get(`${bucketResponse.body.href}`).header(this.elements.customHeaders)
                .end((response) => {console.log('Статус очистки корзины:', response.body.status);
                assert.equal(response.body.status, 'success', 'Статус очистки не success');});
        }, 2000);
    },

    async moveFolderToBucket(folderName) {
        let folder = await unirest.delete(`${this.elements.URL}resources?path=${folderName}`).header(this.elements.customHeaders);

        setTimeout(async () => {
            await unirest.get(`${folder.body.href}`).header(this.elements.customHeaders)
                .end((response) => {console.log('Статус перемещения в корзину:', response.body.status);
                assert.equal(response.body.status, 'success', 'Статус перемещения не success.');})
        }, 2000);
    }
}