import {Page,Locator,expect} from "@playwright/test"
export class CartPage{

page:Page
productRow:Locator
checkoutButton:Locator





constructor (page:Page)
{
this.page=page;
this.productRow=page.locator(".cart li")
this.checkoutButton=page.locator(".totalRow button.btn-primary")

}

async verifyProdcutExist()
{
return await this.productRow.textContent();
}

async clickCheckout()
{
    await this.checkoutButton.click();
}


}