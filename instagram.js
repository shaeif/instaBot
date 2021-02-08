const puppeteer = require("puppeteer")

const url = "https://www.instagram.com/"

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        instagram.page = await instagram.browser.newPage()


    },
    login: async (user, pass) => {
        await instagram.page.goto(url, {
            waituntil: 'networkidel2'
        })
        await instagram.page.waitForSelector('input[name="username"]')
        console.log("Typing user details ...")
        await instagram.page.type('input[name="username"]', user);
        await instagram.page.type('input[name="password"]', pass);
        await instagram.page.click('button[type="submit"]')
        console.log("Logging in ...")
        await instagram.page.waitForNavigation();
    },
    likeByTag: async (tag, num) => {
        await instagram.page.goto(`https://www.instagram.com/explore/tags/${tag}/`, {
            waituntil: 'networkidle2'
        })
        await instagram.page.click("a", {
            waituntil: 'networkidle2'
        })
        for (let i = 0; i < num; i++) {
            await instagram.page.waitForTimeout((Math.random() * 15) * 1000)
            try {
                await instagram.page.click('svg[aria-label="Like"]')
                console.log(`[${i+1}] Like post of ${await instagram.page.$eval("a.sqdOP", el => el.textContent)}`)
            } catch {
                i--
            }
            await instagram.page.click('a.coreSpriteRightPaginationArrow')
        }
    },
    followByTag: async (tag, num) => {
        await instagram.page.goto(`https://www.instagram.com/explore/tags/${tag}/`, {
            waituntil: 'networkidle2'
        })
        await instagram.page.click("a", {
            waituntil: 'networkidle2'
        })
        for (let i = 0; i < num; i++) {
            await instagram.page.waitForTimeout(((Math.random() * 15) * 1000) + 2000)
            if (await instagram.page.$eval('.yWX7d[type="button"]', el => el.textContent) == "Follow") {
                await instagram.page.click('button.yWX7d[type="button"]')
                console.log(`[${i+1}] Followed ${await instagram.page.$eval("a.sqdOP", el => el.textContent)}`)
            } else {
                i--
                console.log(`Already following ${await instagram.page.$eval("a.sqdOP", el => el.textContent)} skipping...`)
            }
            await instagram.page.click('a.coreSpriteRightPaginationArrow')
        }
    },
    bulkUnfollow: async (user, num) => {

        await instagram.page.goto(`https://www.instagram.com/${user}/`, {
            waituntil: 'networkidle2'
        })
        await instagram.page.click(`a[href="/${user}/following/"]`)
        for (let i = 0; i < num; i++) {

            await instagram.page.waitForTimeout(((Math.random() * 15) * 1000) + 2000)
            await instagram.page.click('button.sqdOP.L3NKy._8A5w5')
            await instagram.page.waitForTimeout(1000)
            await instagram.page.click('button.aOOlW.-Cab_[tabindex="0"]')
            console.log(`[${i+1}] Unfollowed ${await instagram.page.$eval('a.FPmhX.notranslate._0imsa', el => el.textContent)}`)
            if (i % 5 == 0) {
                await instagram.page.goto(`https://www.instagram.com/${user}/`, {
                    waituntil: 'networkidle2'
                })
                await instagram.page.click(`a[href="/${user}/following/"]`)
            }
            await instagram.page.waitForTimeout(1000)
        }
    }
}



module.exports = instagram