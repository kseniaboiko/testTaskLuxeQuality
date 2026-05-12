import Page from './page.js';

class InventoryPage extends Page {

    public readonly inventoryURL: string = 'inventory.html';

    public get inventoryPageURL(): string {
        return `${browser.options.baseUrl}${this.inventoryURL}`;
    }

    public get listInventory() {
        return $('[data-test="inventory-list"]');
    }

    public get dropdownProductSort() {
        return $('[data-test="product-sort-container"]');
    }

    public get productPrices() {
        return $$('[data-test="inventory-item-price"]');
    }

    public get productNames() {
        return $$('[data-test="inventory-item-name"]');
    }

    public get inventoryItems() {
        return $$('[data-test="inventory-item"]');
    }

    public async selectSortOption(sortOption: string) {
        await this.dropdownProductSort.selectByAttribute('value', sortOption);
    }

    public itemName(item: WebdriverIO.Element) {
        return item.$('[data-test="inventory-item-name"]');
    }

    public itemAddToCartButton(item: WebdriverIO.Element) {
        return item.$('[data-test^="add-to-cart"]');
    }

    public async addRandomProductToCart(): Promise<string> {
        const items = await this.inventoryItems;
        const randomIndex = Math.floor(Math.random() * items.length);
        const item = items[randomIndex];
        const name = await this.itemName(item).getText();
        await this.itemAddToCartButton(item).click();
        return name;
    }

    public async getProductPrices(): Promise<number[]> {
        const prices: number[] = [];
        for (const el of await this.productPrices) {
            prices.push(parseFloat((await el.getText()).replace('$', '')));
        }
        return prices;
    }

    public async getProductNames(): Promise<string[]> {
        const names: string[] = [];
        for (const el of await this.productNames) {
            names.push(await el.getText());
        }
        return names;
    }

    public open() {
        return super.open(this.inventoryURL);
    }
}

export default new InventoryPage();
