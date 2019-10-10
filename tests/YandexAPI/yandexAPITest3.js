Feature('Тестирование взаимодествия с корзиной');

Scenario('Проверка работы корзины', async (api, info) => {
    await api.createFolder('test3');
    await info.getFolderInfo('test3');
    await api.fileUpload('test3', undefined, 'filename');
    await info.getFileInfo('test3', undefined, 'filename');
    await api.moveFileToBucket('test3', 'filename');
    await info.getFileInfo('test3', undefined, 'filename');
    await info.getBucketInfo('filename');
    await api.recoverFileFromBucket('filename');
    await info.getFileInfo();
    await api.deleteFolder('test3');
    await info.getFolderInfo('test3');
})