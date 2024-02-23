import {expect, should} from "chai";
import setup from "../common/setup.js";
import LoginPage from "../Pages/Login/LoginPage.js";
import { after, before } from "mocha";
let browser, element;

describe("로그인 프로세스 테스트", function() {
    this.timeout(60000);

    before(async ()=>{
        browser = await setup();
    })
    it('PIN Login. Check FrameView Loaded', async function(){
        this.timeout(30000);
        const loginPage = new LoginPage(browser);
        await loginPage.doPinLogin("112233");

        // element = await loginPage.findElementByText('오늘 보지 않기');
        // await loginPage.clickElement(element);
        element = await loginPage.findElementByText('전체메뉴');
        await loginPage.clickElement(element)
        // await remove_popup(browser); //필요없는 팝업을 제거합니다.

        expect(element).to.not.equal(undefined);
        //하단에 FrameView 메뉴가 존재하면 성공입니다.
        // await open_menu(browser);  
    })
    after(async()=>{
        await browser.deleteSession();
    })
});

