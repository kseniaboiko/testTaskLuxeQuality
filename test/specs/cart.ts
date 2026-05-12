import inventoryPage from '../pageobjects/inventory.page.js';
import loginService from '../services/LoginService.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutInfoPage from '../pageobjects/checkout-info.page.js';
import checkoutOverviewPage from '../pageobjects/checkout-overview.page.js';
import checkoutCompletePage from '../pageobjects/checkout-complete.page.js';
import loginPage from '../pageobjects/login.page.js';

describe('Cart cases', () => {

    beforeEach(async () => {
        await loginService.setSessionCookie();
        await inventoryPage.open();
    });

    it('Valid checkout', async () => {
        const productName = await inventoryPage.addRandomProductToCart();
        await expect(inventoryPage.header.shoppingCartBadge).toHaveText('1');
        await expect(await cartPage.getCartItemCount()).toBe(1);
        const productPriceCart = await cartPage.getProductPriceCart();
        await expect(cartPage.productName).toHaveText(productName);
        await cartPage.clickBtnCheckout();
        await expect(checkoutInfoPage.firstName).toBeDisplayed();
        await expect(checkoutInfoPage.lastName).toBeDisplayed();
        await expect(checkoutInfoPage.postalCode).toBeDisplayed();
        await checkoutInfoPage.fillForm();
        await checkoutInfoPage.clickContinue();
        await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
        await expect(productPriceCart).toBe(await checkoutOverviewPage.getProductPrice());
        await checkoutOverviewPage.clickFinish();
        await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
        await expect(checkoutCompletePage.headerComplete).toHaveText('Thank you for your order!');
        await checkoutCompletePage.clickBackHome();
        await expect(inventoryPage.listInventory).toBeDisplayed();
        await expect(await cartPage.getCartItemCount()).toBe(0);
    });

    it('Saving the cart after logout', async () => {
        const productName = await inventoryPage.addRandomProductToCart();
        await expect(inventoryPage.header.shoppingCartBadge).toHaveText('1');
        await expect(await cartPage.getCartItemCount()).toBe(1);
        await cartPage.header.clickBurgerMenu();
        await expect(cartPage.header.bmItemList).toBeDisplayed();
        await expect(cartPage.header.bmItemList).toHaveChildren(4);
        await cartPage.header.clickLogout();
        await expect(loginPage.inputUsername).toBeDisplayed();
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toBeDisplayed();
        await expect(loginPage.inputPassword).toHaveValue('');
        await loginService.loginUserLoginPage();
        await expect(browser).toHaveUrl(inventoryPage.inventoryPageURL);
        await cartPage.header.clickCart();
        await expect(cartPage.cartContents).toBeDisplayed();
        await expect(cartPage.productName).toHaveText(productName);
    });

    //expected result not match actual result on website
    it.skip('Checkout without products', async () => {
        await expect(await cartPage.getCartItemCount()).toBe(0);
        await cartPage.clickBtnCheckout();
        await expect(cartPage.cartContents).toBeDisplayed();
        await expect(cartPage.errorMessage).toHaveText('Cart is empty');
    });
});
