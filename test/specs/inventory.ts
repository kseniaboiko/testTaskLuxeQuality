import inventoryPage from '../pageobjects/inventory.page.js'
import loginService from '../services/LoginService.js'
import { waitTabOpen, switchNewTab } from '../utils/browser.js'

describe('Inventory page cases', () => {

    beforeEach(async () => {
        await loginService.setSessionCookie();
        await inventoryPage.open();
    });

    const socialLinks = [
        { name: 'Twitter',  click: () => inventoryPage.footer.clickTwitter(),  urlFragment: 'x.com/saucelabs' },
        { name: 'Facebook', click: () => inventoryPage.footer.clickFacebook(), urlFragment: 'facebook.com/saucelabs' },
        { name: 'LinkedIn', click: () => inventoryPage.footer.clickLinkedin(), urlFragment: 'linkedin.com/' },
    ];

    for (const { name, click, urlFragment } of socialLinks) {
        it(`${name} footer link opens correct page`, async () => {
            await click();
            await waitTabOpen();
            await switchNewTab();
            await expect(browser).toHaveUrl(expect.stringContaining(urlFragment));
            await browser.closeWindow();
        });
    }

    it('sort price low to high', async () => {
        await inventoryPage.selectSortOption('lohi');
        const prices: number[] = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        await expect(prices).toEqual(sortedPrices);
    });

    it('sort price high to low', async () => {
        await inventoryPage.selectSortOption('hilo');
        const prices: number[] = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        await expect(prices).toEqual(sortedPrices);
    });

    it('sort name A to Z', async () => {
        await inventoryPage.selectSortOption('az');
        const productNames = await inventoryPage.getProductNames();
        const sortedNames = [...productNames].sort();
        await expect(productNames).toEqual(sortedNames);
    });

    it('sort name Z to A', async () => {
        await inventoryPage.selectSortOption('za');
        const productNames = await inventoryPage.getProductNames();
        const sortedNames = [...productNames].sort().reverse();
        await expect(productNames).toEqual(sortedNames);
    });
})