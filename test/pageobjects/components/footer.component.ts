export class FooterComponent {

    public get linkTwitter() {
        return $('[data-test="social-twitter"]');
    }

    public get linkFacebook() {
        return $('[data-test="social-facebook"]');
    }

    public get linkLinkedin() {
        return $('[data-test="social-linkedin"]');
    }

    public async clickTwitter() {
        await this.linkTwitter.click();
    }

    public async clickFacebook() {
        await this.linkFacebook.click();
    }

    public async clickLinkedin() {
        await this.linkLinkedin.click();
    }
}
