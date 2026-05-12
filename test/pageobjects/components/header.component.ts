export class HeaderComponent {

    public get btnBurgerMenu() {
        return $('#react-burger-menu-btn');
    }

    public get bmItemList() {
        return $('.bm-item-list');
    }

    public get btnLogout() {
        return $('[data-test="logout-sidebar-link"]');
    }

    public get linkCart() {
        return $('a[data-test="shopping-cart-link"]');
    }

    public get shoppingCartBadge() {
        return $('[data-test="shopping-cart-badge"]');
    }

    public async clickBurgerMenu() {
        await this.btnBurgerMenu.click();
    }

    public async clickLogout() {
        await this.btnLogout.click();
    }

    public async clickCart() {
        await this.linkCart.click();
    }
}
