
import {Page,Locator} from "@playwright/test"
export class OrderHistoryPage{
page:Page;
orderrow:Locator


constructor(page:Page)
{this.page=page;
    this.orderrow=page.locator("tbody tr");
   

}


async viewOrder(orderId:string)
{
   await this.orderrow.first().waitFor();
   await this.orderrow.filter({hasText:orderId}).getByRole("button",{name:"View"}).click();
}

}