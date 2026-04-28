import {Page,Locator,expect} from "@playwright/test"
import { CartPage } from "./CartPage"
export class DashboradPage{

page:Page
cardBody:Locator
title:Locator
toast:Locator
cartlink:Locator




constructor (page:Page)
{
this.page=page;
this.cardBody=page.locator("div .card-body")
this.title=this.cardBody.locator("h5 b")
this.toast=page.locator("#toast-container")
this.cartlink=page.locator("[routerlink='/dashboard/cart']")


}

async  addProductToCart(productName:string)
{

await this.cardBody.filter({hasText:productName}).getByRole("button",{name:"Add To Cart"}).click();
}



async getSuccessMsg()
{
    return  await this.toast.innerText()

}

async clickOnCart()
{
    await this.cartlink.click();
    return new CartPage(this.page)
}
}