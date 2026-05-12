import { HeaderComponent } from './components/header.component.js';
import { FooterComponent } from './components/footer.component.js';

export default class Page {

    public readonly header = new HeaderComponent();
    public readonly footer = new FooterComponent();

    public open(path: string = '') {
        return browser.url(path ? `/${path}` : '/');
    }
}
