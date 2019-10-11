Feature('Проверка работы с файлами.');

Scenario('Создание файла/удаление файла.', async(api, info) => {
    await api.createFolder('folder');
    await info.getFolderInfo('folder');
    await api.fileUpload('folder', 'filename');
    await info.getFileInfo('folder', 'filename');
    await api.deleteFile('folder', 'filename');
    await info.getFileInfo('folder', 'filename');
    await api.deleteFolder('folder');
    await info.getFolderInfo('folder');
})