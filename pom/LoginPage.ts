import {Page,Locator,expect} from "@playwright/test"
export class LoginPage{

page:Page
userEmailInput:Locator
userPasswordInput:Locator
loginButton:Locator
errorMessage:Locator



constructor (page:Page)
{
this.page=page;
this.userEmailInput=page.locator("#userEmail")
this.userPasswordInput=page.locator("#userPassword")
this.loginButton=page.locator("#login")
this.errorMessage=page.locator("#toast-container")

}

async goToUrl()
{
    await this.page.goto("/client")

}

async isLoginPageExist()
{
    const title=await this.page.title();
    if(title)
    {
        return true;
    }else
    {
        return false;
    }
}

async loginSuccess(email:string,pwd:string)
{

    await this.userEmailInput.fill(email)
    await this.userPasswordInput.fill(pwd)
    await this.loginButton.click()
}

async getErrorMessage()
{

    return await this.errorMessage.textContent();
}



}