import { test, expect,chromium } from '@playwright/test';
import playwright from "playwright"
import rsalogin from "../../data/rsalogin.json"

const staticdata=[{username:"testjoy@gmail.com",password:"Abc1@345",state:"success"},{username:"testjoy2@gmail.com",password:"abc",state:"failure"}];

for(const loginData of rsalogin)
{



test(`login ddt using json ${loginData.username}`, async ({ page }) => {
  await page.goto("/client");
  await page.locator("#userEmail").fill(loginData.username)
  await page.locator("#userPassword").fill(loginData.password)
  await page.locator("#login").click();
  if(page.url().includes("dashboard"))
  {
    await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible()
  }else
  {
    await expect(page.locator("#toast-container")).toBeVisible();
  }

  

  
})


}



for(const data of staticdata)
{

test(`login ddt using staticdataArray ${data.username}`, async ({  }) => {
    const browser=await playwright.chromium.launch({headless:false})
    const context=await browser.newContext({viewport:{width:1280,height:720},permissions:["geolocation"]})
    const page=await context.newPage();
    
  await page.goto("/client");
  await page.locator("#userEmail").fill(data.username)
  await page.locator("#userPassword").fill(data.password)
  await page.locator("#login").click();
  //await page.waitForURL('**/dashboard/**')

  if(data.state==="success")
  {
     await page.waitForURL('**/dashboard/**');

    await expect(page.getByRole("button", { name: "Sign Out" }))
      .toBeVisible({ timeout: 5000 });
       // await context.storageState({path:"./data/loginstate.json"})
       // webcontext= await browser.newContext({storageState:"./data/loginstate.json"})
  }else if(data.state==="failure")
  {
     await expect(page.locator("#toast-container"))
      .toBeVisible({ timeout: 5000 });

 
    await expect(page).not.toHaveURL(/dashboard/);
   
  }


  

  
})

}


