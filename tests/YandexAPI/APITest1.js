Feature('Проверка работы с папками.');

Scenario('Создание/удаление папки', async (api, info) => {
    await api.createFolder('folder1');
    await info.getFolderInfo('folder1');
    await api.deleteFolder('folder1');
    await info.getFolderInfo('folder1');
});
