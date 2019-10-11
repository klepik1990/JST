Feature('Проверка создания вложенных папок.');

Scenario('Проверка вложенных папок', async (api, info) => {
    await api.createFolder('test5', 'test5folder');
    await info.getFolderInfo('test5','test5folder');
    await api.fileUpload('test5', 'file5', 'test5folder');
    await info.getFileInfo('test5', 'file5', 'test5folder');
    await api.moveFolderToBucket('test5');
    await info.getFolderInfo('test5', 'test5folder');
    await info.getBucketInfo('file5');
    await api.clearBucket();
    await info.getBucketInfo('file5');
});

// After(async (api) => {
//     await api.clearBucket();
// })
