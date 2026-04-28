
import {Page,Locator} from "@playwright/test"
import { OrderHistoryPage } from "./OrderHistoryPage";
export class OrderSuccessPage{
page:Page;
ordersuccessMsg:Locator
orderhistorylink:Locator
orderiddata:Locator


constructor(page:Page)
{this.page=page;
   this.ordersuccessMsg=page.locator("td h1")
   this.orderhistorylink=page.locator("label[routerlink='/dashboard/myorders']")
   this.orderiddata=page.locator(".em-spacer-1 label.ng-star-inserted")

}


async getOrderSuccessMsg()
{
    return await this.ordersuccessMsg.textContent();
}

async clickorderhistorylink()
{
    await this.orderhistorylink.click();
    return new OrderHistoryPage(this.page)
}

async getOrderId()
{
    return await this.orderiddata.innerText();
}

}