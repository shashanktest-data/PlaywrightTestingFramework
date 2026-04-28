import { test, expect,chromium,Page } from '@playwright/test';
import playwright from "playwright"
//import global-setup from "./Mypractice/global-setup"

let productName='ADIDAS ORIGINAL';



test.describe.configure({mode:"serial"})


  
 


export async function addToCart(page:Page,productName:string)
{

  await page.locator("div.card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" })
    .click();
}

test("checkout",async({page})=>{



await page.goto("/client/#/dashboard/dash");
await page.locator("div.card-body")
    .filter({ hasText: "ADIDAS ORIGINAL" })
    .getByRole("button", { name: "Add To Cart" })
    .click();

  await expect(page.locator("[routerlink*='/dashboard/cart']"))
    .toHaveCount(1);
await page.locator("[routerlink*='/dashboard/cart']").click();
await page.waitForSelector("div.cart")
await page.locator(".totalRow .btn-primary").click();
await expect(page.getByText("testjoy@gmail.com")).toBeVisible();
await page.locator("[placeholder='Select Country']").pressSequentially("ind",{ delay: 100 });
await page.waitForSelector(".list-group button");
const options=page.locator(".list-group button");
for(const option of await options.all())
{

  if(await option.textContent()===" India")
  {
    await option.click();
    break;
  }
}
await page.locator("a.action__submit").click();
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();






})

test("remove product to cart",async({page})=>{




await page.goto("/client/#/dashboard/dash");
await page.waitForURL(/dashboard/)
await addToCart(page,'ADIDAS ORIGINAL');



await page.locator("[routerlink*='/dashboard/cart']").click();
await page.waitForURL("**/dashboard/cart");
await page.locator("button.btn-danger").click();
await expect(page.getByText("No Products in Your Cart !")).toBeVisible();






})

