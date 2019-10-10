const I = actor();

module.exports = {

    elements: {
        musicPage: 'a[data-id=music]',
        searchField: '.deco-input_suggest',
        artist: "a[href='/artist/3121']",
        checkArtists: '.page-artist__title',



    },

    async openMusicPage() {
        await I.click(this.elements.musicPage);
        await I.waitForVisible(this.elements.searchField, 5);
    },

    async searchMusic() {
        await I.fillField(this.elements.searchField, 'Metal');
        await I.click(this.elements.artist);
    },

    async checkArtist() {
        await I.see('Metallica', this.elements.checkArtists);
    },

    async checkPopularAlbums() {
        await I.see('Metallica', this.elements.artist);
    }


};