
import {Page,Locator} from "@playwright/test"
export class OrderDetailsPage{
page:Page;
successMsg:Locator


constructor(page:Page)
{this.page=page;
    this.successMsg=page.locator("p.tagline");
   

}


async verifySuccessMsgOnOrderDetails()
{
   await this.successMsg.waitFor();
   return await this.successMsg.innerText();
}

}