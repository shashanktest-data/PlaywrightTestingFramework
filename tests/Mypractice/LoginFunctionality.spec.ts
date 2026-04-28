import {test,expect} from "@playwright/test"
import { LoginPage } from "../../pom/LoginPage"
import rsalogin from "../../data/rsalogin.json"
for(const data of rsalogin)
{
test(`login validation ${data.username}`,async({page})=>{


   const lp=new LoginPage(page);
   await lp.goToUrl();
   await lp.loginSuccess(data.username,data.password)
   if(data.state==="passed")
   {
    await page.waitForLoadState("networkidle")
   }else
   {
    await expect(lp.errorMessage).toBeVisible();
   }

})

}