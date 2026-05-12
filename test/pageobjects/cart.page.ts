import Page from './page.js';

class CartPage extends Page {

    public get cartContents() {
        return $('[data-test="cart-contents-container"]');
    }

    public get cartItems() {
        return $$('[data-test="inventory-item"]');
    }

    public get productName() {
        return $('[data-test="inventory-item-name"]');
    }

    public get productPriceCart() {
        return $('[data-test="inventory-item-price"]');
    }

    public get btnCheckout() {
        return $('[data-test="checkout"]');
    }

    public get errorMessage() {
        return $('.error-message-container.error');
    }

    public async clickBtnCheckout() {
        await this.btnCheckout.click();
    }

    public async getProductPriceCart() {
        const value = await this.productPriceCart.getText();
        return value.replace(/[^0-9.]/g, '');
    }

    public async getCartItemCount(): Promise<number> {
        await this.header.clickCart();
        return (await this.cartItems).length;
    }
}

export default new CartPage();
