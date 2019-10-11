Feature('Проверка размера диска и корзины');

Scenario('Проверка корзины и диска', async(api, info) => {
    let bucketSizeBefore = await info.getBucketSize();
    await api.createFolder('test4');
    await info.getFolderInfo('test4');
    await api.createFiles('test4', 'file1', 'file2');
    await info.getFileInfo('test4',  'file1');
    await info.getFileInfo('test4',  'file2');
    let fileSize1 = await info.getFileSize('test4', 'file1');
    let fileSize2 = await info.getFileSize('test4', 'file2');
    await api.moveFileToBucket('test4', 'file1');
    await info.getFileInfo('test4', 'file1');
    await info.getBucketInfo('file1');
    await api.moveFileToBucket('test4', 'file2');
    await info.getFileInfo('test4', 'file2');
    await info.getBucketInfo('file2');
    let bucketSizeAfter = await info.getBucketSize();
    await info.checkSizesForEquals(fileSize1, fileSize2, bucketSizeBefore, bucketSizeAfter);
    // Проверяем, что размер размер корзины после перемещения файлов в нее = размеру корзины до перещения + размер файлов
    await api.recoverFileFromBucket('file1');
    await api.recoverFileFromBucket('file2');
    await info.getFileInfo('test4',  'file1');
    await info.getFileInfo('test4',  'file2');
    await api.deleteNonEmptyFolder('test4');
    await info.getFolderInfo('test4');
});
// After(async (api) => {
//     await api.clearBucket();
// })