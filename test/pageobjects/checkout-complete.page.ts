import Page from './page.js';

class CheckoutCompletePage extends Page {

    public get title() {
        return $('[data-test="title"]');
    }

    public get headerComplete() {
        return $('[data-test="complete-header"]');
    }

    public get btnBackHome() {
        return $('[data-test="back-to-products"]');
    }

    public async clickBackHome() {
        await this.btnBackHome.click();
    }
}

export default new CheckoutCompletePage();
