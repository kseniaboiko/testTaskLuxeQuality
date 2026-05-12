import Page from './page.js';

class CheckoutOverviewPage extends Page {

    public get title() {
        return $('[data-test="title"]');
    }

    public get productPriceOverview() {
        return $('[data-test="subtotal-label"]');
    }

    public get btnFinish() {
        return $('[data-test="finish"]');
    }

    public async getProductPrice() {
        const value = await this.productPriceOverview.getText();
        return value.replace(/[^0-9.]/g, '');
    }

    public async clickFinish() {
        await this.btnFinish.click();
    }
}

export default new CheckoutOverviewPage();
