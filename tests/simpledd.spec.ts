import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const dd=page.locator("#country");
  await dd.selectOption("canada") // value
  await expect(dd).toHaveValue("canada");

  // check number of dd options
  const ddoptions=page.locator("#country option");
  await expect(ddoptions).toHaveCount(10)

  //check if india is present in dd options
  for(const data of await ddoptions.all())
   
  { const text=await data.innerText();
if(text.includes("India")) //visible text or label
{
    console.log("india is present in dd options")
}
  }

});

test('DYANMIC DD flipkart', async ({ page }) => {
  await page.goto('https://flipkart.com');
  await expect(page).toHaveURL(/flipkart.com/)
   await page.waitForTimeout(3000)
  await page.keyboard.press("Escape")
  

  await page.locator("input.v1zwn25").first().fill("iphone 14");
  await page.locator("ul.VCplLH li").first().waitFor();
  const ddoptions= page.locator("ul.VCplLH")

  await ddoptions.filter({hasText:"iphone 14 pro"}).click();
  

 


})

test('DYANMIC DD bing', async ({ page }) => {
  await page.goto('https://www.bing.com/');
  
   await page.waitForTimeout(3000)
 
  

  await page.locator(".sb_form_q").first().fill("playwright");
  await page.locator("ul[role='listbox'] li").first().waitFor();
  const ddoptionscontents= await page.locator("ul[role='listbox'] li").allTextContents();
  console.log(ddoptionscontents)
  for(const data of await page.locator("ul[role='listbox'] li").all())
  {
if(await data.textContent()==="playwright python")
{
    console.log("playwright python found")
    await data.click();
    break;
}
  }

 
  

 


})

test('DYANMIC DD amazon', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  
   await page.waitForTimeout(3000)
 
  

  await page.locator("#twotabsearchtextbox").first().fill("selenium");
  await page.locator(".left-pane-results-container div[role='button']").first().waitFor();
  const ddoptionscontents= await page.locator(".left-pane-results-container div[role='button']").allTextContents();
  console.log(ddoptionscontents)
  for(const data of await page.locator(".left-pane-results-container div[role='button']").all())
  {
if(await data.textContent()==="selenium 100 mcg")
{
    console.log("selenium 100 mcg found")
    await data.click();
    break;
}
  }


 


})

test('multi select dd', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  
   await page.waitForTimeout(3000)

   const dd=page.locator("#colors");
  // await dd.selectOption(["red","blue"])
  //await dd.selectOption([{label:"Red"},{label:"Blue"}])
  await dd.selectOption([{index:0},{index:1}])
   await expect(dd).toHaveValues(["red","blue"]) // tohavevalue work with value only
 
  const ddoption=page.locator("#colors option");
  console.log((await ddoption.allTextContents()).map(text=>text.trim()))
  for(const data of await ddoption.all())
  {
    if(await data.innerText()=="Blue")
    {
        console.log("Blue option is present in multi dd")
        
    }
  }



})

