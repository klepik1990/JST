Feature('Создание файла в папке');

Scenario('Создание файла', async(api, info) => {
    await api.createFolder('folder');
    await info.getFolderInfo('folder');
    await api.fileUpload('folder', undefined, 'filename');
    await info.getFileInfo('folder', undefined, 'filename');
    await api.deleteFile('folder', 'filename');
    await info.getFileInfo('folder',undefined,'filename');
    await api.deleteFolder('folder');
    await info.getFolderInfo('folder');
})