const timeout = 1500;

// test d'un raccourcisseur d'URL
describe("Shorten Anonymous", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('basic shorten', async () => {
        await page.goto('http://polr.stationmyr.net');
        await page.waitForSelector('.long-link-input');
        await page.screenshot({path: './tests/img/hidden_menu.png'});
        await page.waitForSelector('#show-link-option');
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('input.result-box');
        const val = await page.$eval('input.result-box', el => el.value);
        expect(val).toMatch(/^https:\/\/polr\.stationmyr\.net\/[a-z0-9]+/);
        await page.screenshot({path: './tests/img/shorten2.png'});
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
