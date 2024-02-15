const timeout = 5000;

// test d'un raccourcisseur d'URL
describe("Show hide options", () => {
    let page;

    test('show options', async () => {
        await page.goto('http://polr.stationmyr.net');

        // options should be hidden
        await page.waitForSelector('#options',
            { visible: false, timeout: 200 });

        //expect(displayed).toMatch(/\s*none/)

        await page.screenshot({path: './tests/img/hidden_menu.png'});
        await page.waitForSelector('#show-link-options');

        await page.$eval( '#show-link-options', el => el.click() );



        let style = await page.$eval('#options', el => el.style.display)
        expect(style).toMatch(/block/)

        await page.screenshot({path: './tests/img/hidden_menu_open.png'});
    }, timeout);



    test('hide options', async () => {
        await page.goto('http://polr.stationmyr.net');

        // options should be hidden
        await page.waitForSelector('#options',
            { visible: false, timeout: 200 });

        await page.screenshot({path: './tests/img/open_menu.png'});
        await page.waitForSelector('#show-link-options');

        await page.$eval( '#show-link-options', el => el.click() );

        //animation delay then click again
        await new Promise(resolve => setTimeout(resolve, 1000));

        await page.screenshot({path: './tests/img/open_menu_open.png'})

        await page.$eval( '#show-link-options', el => el.click() );

        //animation delay then check
        await new Promise(resolve => setTimeout(resolve, 1000));

        await page.screenshot({path: './tests/img/open_menu_hidden.png'});

        let style = await page.$eval('#options', el => el.style.display)
        expect(style).toMatch("none")

    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
