import Page from './page.js';
import { generateRandomName } from '../utils/random.js';

class CheckoutInfoPage extends Page {

    public get firstName() {
        return $('[data-test="firstName"]');
    }

    public get lastName() {
        return $('[data-test="lastName"]');
    }

    public get postalCode() {
        return $('[data-test="postalCode"]');
    }

    public get btnContinue() {
        return $('[data-test="continue"]');
    }

    public async fillForm() {
        await this.firstName.addValue(generateRandomName());
        await this.lastName.addValue(generateRandomName());
        await this.postalCode.addValue(generateRandomName());
    }

    public async clickContinue() {
        await this.btnContinue.click();
    }
}

export default new CheckoutInfoPage();
