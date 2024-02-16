const timeout = 5000;

// test d'un raccourcisseur d'URL
describe("Shorten link is working", () => {
    let page;

    test('get a usable link', async () => {
        await page.goto('http://polr.stationmyr.net');
        await page.waitForSelector('.long-link-input');
        await page.type('.long-link-input', 'https://www.google.com/search?q=meteo+france');
        await page.screenshot({path: './tests/img/meteo.png'});
        await page.waitForSelector('#shorten');
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('input.result-box');
        const shortenURL = await page.$eval('input.result-box', el => el.value);

        await page.screenshot({path: './tests/img/meteo_short.png'});

        // try if shorten is ok

        await page.goto(shortenURL);
        await page.waitForSelector('cite:first-of-type')
        const googleLink = await page.$eval('cite:first-of-type', e => e.innerHTML);
        expect(googleLink).toContain('https://meteofrance.com')
        await page.screenshot({path: './tests/img/meteo_expect.png'});

    }, timeout);



    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
