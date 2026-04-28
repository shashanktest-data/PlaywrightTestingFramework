import { test, expect,chromium,Page } from '@playwright/test';
import playwright from "playwright"

let productName='ADIDAS ORIGINAL';


test.describe.configure({mode:"serial"})

test.beforeAll(async () => {

   const browser=await playwright.chromium.launch({headless:false})
      const context=await browser.newContext({viewport:{width:1280,height:720},permissions:["geolocation"]})
      const page=await context.newPage();
      
    await page.goto("/client");
    await page.locator("#userEmail").fill("testjoy@gmail.com")
    await page.locator("#userPassword").fill("Abc1@345")
    await page.locator("#login").click();

  
   
       await page.waitForURL('**/dashboard/**');
  
      await expect(page.getByRole("button", { name: "Sign Out" }))
        .toBeVisible({ timeout: 5000 });
          await context.storageState({path:"./data/loginstate.json"})
         // webcontext= await browser.newContext({storageState:"./data/loginstate.json"})
    
  
  
    
   await browser.close();
    
  })
  
  
 


export async function addToCart(page:Page,productName:string)
{

  await page.locator("div.card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" })
    .click();
}

test("checkout",async({})=>{

const browser=await playwright.chromium.launch();
const context=await browser.newContext({storageState:"./data/loginstate.json"})
const page=await context.newPage();
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
await browser.close();





})

test("remove product to cart",async({browser})=>{


const context=await browser.newContext({storageState:"./data/loginstate.json"})
const page=await context.newPage();
await page.goto("/client/#/dashboard/dash");
await page.waitForURL(/dashboard/)
await addToCart(page,'ADIDAS ORIGINAL');



await page.locator("[routerlink*='/dashboard/cart']").click();
await page.waitForURL("**/dashboard/cart");
await page.locator("button.btn-danger").click();
await expect(page.getByText("No Products in Your Cart !")).toBeVisible();
await context.close();





})

