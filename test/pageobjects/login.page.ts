import Page from './page.js';

class LoginPage extends Page {

    public get inputUsername() {
        return $('[data-test="username"]');
    }

    public get inputPassword() {
        return $('[data-test="password"]');
    }

    public get btnLogin() {
        return $('input[data-test="login-button"]');
    }

    public get errorIconUsername() {
        return $('//input[@data-test="username"]//following-sibling::*[name()="svg"][@data-prefix="fas"]');
    }

    public get errorIconPassword() {
        return $('//input[@data-test="password"]//following-sibling::*[name()="svg"][@data-prefix="fas"]');
    }

    public get errorMessage() {
        return $('[data-test="error"]');
    }

    public async setUsername(username: string) {
        await this.inputUsername.addValue(username);
    }

    public async setPassword(password: string) {
        await this.inputPassword.addValue(password);
    }

    public async clickBtnLogin() {
        await this.btnLogin.click();
    }

    public open () {
        return super.open('');
    }
}

export default new LoginPage();
