import loginPage from '../pageobjects/login.page.js'
import { LOGIN_CREDENTIALS } from "../data/login.js"

class LoginService {

   public async setSessionCookie() {
        await loginPage.open();
        await browser.setCookies({
            name: 'session-username',
            value: LOGIN_CREDENTIALS.STANDARD_USER.username,
        });
    }

    public async loginUserLoginPage() {
        await loginPage.setUsername(LOGIN_CREDENTIALS.STANDARD_USER.username);
        await loginPage.setPassword(LOGIN_CREDENTIALS.STANDARD_USER.password);
        await loginPage.clickBtnLogin();
    }
}

export default new LoginService();