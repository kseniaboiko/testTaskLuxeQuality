import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import { LOGIN_CREDENTIALS } from "../data/login.js"
import loginService from '../services/LoginService.js'


describe('Login cases', () => {

    beforeEach(async () => {
        await loginPage.open()
    });

    it('Valid Login', async () => {
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
        await loginService.loginUserLoginPage();
        await expect(browser).toHaveUrl(inventoryPage.inventoryPageURL);
        await expect(inventoryPage.header.linkCart).toBeDisplayed();
        await expect(inventoryPage.listInventory).toBeDisplayed();
    })

    it('Login with invalid password', async () => {
        await loginPage.setUsername(LOGIN_CREDENTIALS.STANDARD_USER.username);
        await loginPage.setPassword(LOGIN_CREDENTIALS.STANDARD_USER.username);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
        await loginPage.clickBtnLogin();
        await expect(loginPage.errorIconUsername).toBeDisplayed();
        await expect(loginPage.errorIconPassword).toBeDisplayed();
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
    })

    it('Login with locked out test login', async () => {
        await loginPage.setUsername(LOGIN_CREDENTIALS.LOCKED_OUT_USER.username);
        await loginPage.setPassword(LOGIN_CREDENTIALS.LOCKED_OUT_USER.password);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
        await loginPage.clickBtnLogin();
        await expect(loginPage.errorIconUsername).toBeDisplayed();
        await expect(loginPage.errorIconPassword).toBeDisplayed();
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    })
})