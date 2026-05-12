import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import loginService from '../services/LoginService.js'

describe('Logout cases', () => {

    beforeEach(async () => {
        await loginService.setSessionCookie();
    });

    it('logout', async () => {
        await inventoryPage.open();
        await inventoryPage.header.clickBurgerMenu();
        await expect(inventoryPage.header.bmItemList).toBeDisplayed();
        await expect(inventoryPage.header.bmItemList).toHaveChildren(4);
        await inventoryPage.header.clickLogout();
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');
    })
})