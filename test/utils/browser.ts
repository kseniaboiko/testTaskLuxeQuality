export async function waitTabOpen(): Promise<void> {
    await browser.waitUntil(
        async () => (await browser.getWindowHandles()).length > 1,
        {
            timeout: browser.options.waitforTimeout,
            timeoutMsg: 'New tab did not open in time',
        }
    );
}

export async function switchNewTab(): Promise<void> {
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
}
