
import {Page,Locator} from "@playwright/test"
import { OrderSuccessPage } from "./OrderSuccessPage";
export class OrderPage{
page:Page;
paymentdiv:Locator
userEmailLabel:Locator
selectcountry:Locator
ddoption:Locator
placeOrderBtn:Locator


constructor(page:Page)
{this.page=page;
    this.paymentdiv=page.locator("div.payment__shipping")
    this.userEmailLabel=page.locator("div .mt-5 label")
    this.selectcountry=page.locator("[placeholder='Select Country']")
    this.ddoption=page.locator(".ta-results button")
    this.placeOrderBtn=page.locator("a.ng-star-inserted")


}


async placeOrder()
{

    await this.selectcountry.pressSequentially("ind")
   await this.ddoption.first().waitFor();
    for(const data of await this.ddoption.all())
    {
        const countrytext=await data.textContent();
        if(countrytext?.trim()==="India")
        {
            await data.click();
            break;
        }
    }
    await this.placeOrderBtn.click();
    return new OrderSuccessPage(this.page)

}






}