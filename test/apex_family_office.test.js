import {expect} from "chai";
import setup from "../common/setup.js";
import LoginPage from "../Pages/Login/LoginPage.js";
import { after, before } from "mocha";
import MenuPage from "../Pages/menu/MenuPage.js";
import ApexFamilyOfficePage from "../Pages/Apex_family_office/ApexFamilyOfficePage.js";
import {Selector, attribute, component} from "../common/selector.js";
import AccountPage from "../Pages/AccountPage/AccountPage.js";
import ErrorPage from "../Pages/ErrorPage/ErrorPage.js";
let browser, element;

describe("APEX Family Office Test", function() {
    this.timeout(60000);

    before(async ()=>{
        browser = await setup();
    })
    it('아들(김신영)에게 결혼 기념<임신축하금>으로 100만원을 2024년 03월 15일에 증여합니다. ', async function(){
        this.timeout(60000);
        const loginPage = new LoginPage(browser);
        await loginPage.doPinLogin("112233");

        await loginPage.wait(3000);
        await loginPage.clickElement(await loginPage.findElementWithRetry(new Selector(component.button, attribute.text, '전체메뉴').getSelector()))

        const menuPage = new MenuPage(browser);
        await menuPage.goToMenu('APEX 패밀리서비스');

        const apexPage = new ApexFamilyOfficePage(browser);
        await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'selfServiceBtn').getSelector()));
        await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.editText, attribute.resourceId, 'accPass').getSelector()));

        const accPage = new AccountPage(browser);

        await accPage.setPassword('0000');

        await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.button, attribute.text, "확인").getSelector()));

        element = await apexPage.findElementWithRetry(new Selector(component.view, attribute.resourceId, "typeSubState").getSelector());
        let btnReq = await apexPage.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'btnReq').getSelector());
        if(await element.getText() === '신청'){
            expect(await btnReq.getText()).to.equal('추가등록');
        }else{
            expect(await btnReq.getText()).to.equal('신규등록');
        }
        await apexPage.clickElement(btnReq);
        await apexPage.clickElement(await apexPage.findMomentItem('아들'));

        await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'nextBtn').getSelector()));
        let nameTf = new Selector(component.editText, attribute.resourceId, 'nameTf').getSelector();
        await apexPage.clickElement(await apexPage.findElementWithRetry(nameTf));
        await apexPage.setElementText(await apexPage.findElementWithRetry(nameTf), '김신영');
        await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'role').getSelector()));
        
        await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'nextBtn').getSelector()));

        await apexPage.clickElement(await apexPage.findMomentItem('결혼'));

        await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.editText, attribute.resourceId, 'moneyTxf').getSelector()));
        await apexPage.setElementText(await apexPage.findElementWithRetry(new Selector(component.editText, attribute.resourceId, 'moneyTxf').getSelector()), 1000000);
        await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'btnReq').getSelector()));

        //await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'role').getSelector()));


        await apexPage.clickElement(await apexPage.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'nextBtn').getSelector()));

        btnReq = await apexPage.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'btnReq').getSelector());
        expect(await btnReq.getText()).to.equal('확인');

        
    })
    after(async()=>{
        const errorPage = new ErrorPage(browser);
        await errorPage.getErrorMsg();

        await browser.deleteSession();
    })
});

