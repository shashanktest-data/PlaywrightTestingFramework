import { test, expect,chromium } from '@playwright/test';
import playwright from "playwright";

test('has title', async ({ }) => {
    const browser=await playwright.chromium.launch();
    const context=await browser.newContext();
    const page=await context.newPage();
   // console.log("num of pages",context.pages().length)

  await page.goto('https://www.leafground.com/window.xhtml');

  const [newPage]=await Promise.all([context.waitForEvent("page"),page.locator("//span[text()='Open']").click()]);
   const pages=context.pages();
    console.log("num of pages",context.pages().length)
  await newPage.waitForLoadState();
  await newPage.bringToFront();
  await newPage.waitForURL("https://www.leafground.com/dashboard.xhtml")
  const email=newPage.locator("#email")
  await email.fill("abcd");
 await expect(email).toHaveValue("abcd");
 
  await newPage.close();
  await page.bringToFront();
 await  page.close();



});


test('multiple popups', async () => {

  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.leafground.com/window.xhtml');

  const mainpage = page;

  // 👇 Proper way: listen on context for multiple pages
  const [newPage1, newPage2] = await Promise.all([
    context.waitForEvent("page"),
    context.waitForEvent("page"),
    mainpage.locator("//span[text()='Open with delay']").click()
  ]);

  // Wait for both popups to fully load
  await Promise.all([
    newPage1.waitForLoadState("domcontentloaded"),
    newPage2.waitForLoadState("domcontentloaded")
  ]);
 


 await expect(newPage1.locator("//span[text()='Customer Analytics Table']")).toBeVisible();
  await Promise.all([
    newPage1.close(),
    newPage2.close()
  ]);
await expect(mainpage.locator("//span[text()='Open with delay']")).toBeEnabled();
  await mainpage.close();
  await browser.close();

});

test('has title window', async ({ }) => {
    const browser=await playwright.chromium.launch();
    const context=await browser.newContext();
    const page=await context.newPage();

  await page.goto('https://www.leafground.com/window.xhtml');

  const [newPage]=await Promise.all([context.waitForEvent("page"),page.locator("//span[text()='Open Multiple']").click()]);
  await newPage.waitForLoadState();
  await newPage.bringToFront();
  
await expect(newPage.locator("//span[text()='Customer Analytics Table']")).toBeVisible();
 
  await newPage.close();
  await page.bringToFront();
 await  page.close();



});

test('new tab testing with context', async ({ }) => {
    const browser=await playwright.chromium.launch();
    const context=await browser.newContext();
    const Parentpage=await context.newPage();
   // console.log("num of pages",context.pages().length)

  await Parentpage.goto('https://testautomationpractice.blogspot.com/');

  const [childPage]=await Promise.all([context.waitForEvent("page"),Parentpage.locator("//button[text()='New Tab']").click()])

const pages=context.pages();
    console.log("num of pages",context.pages().length)

  console.log("num of pages",await pages[0].title()) //use when more than two tabs
  console.log("num of pages",await pages[1].title())
   // console.log("num of pages",await Parentpage.title()) //use when more than two tabs
  //console.log("num of pages",await childPage.title())
  

})

test('new tab testing without context', async ({ }) => { // use when exact two tabs 
    const browser=await playwright.chromium.launch();
    const context=await browser.newContext();
    const Parentpage=await context.newPage();
   // console.log("num of pages",context.pages().length)

  await Parentpage.goto('https://testautomationpractice.blogspot.com/');

  const [childPage]=await Promise.all([context.waitForEvent("page"),Parentpage.locator("//button[text()='New Tab']").click()])



  console.log("title1",await Parentpage.title())
  console.log("title2",await childPage.title())

})

test('multiple tabs using index', async ({ }) => {
    const browser=await playwright.chromium.launch();
    const context=await browser.newContext();
    const page=await context.newPage();
   // console.log("num of pages",context.pages().length)

  await page.goto('https://testautomationpractice.blogspot.com/');

await Promise.all([context.waitForEvent("page"),page.locator("//button[text()='Popup Windows']").click()])

const allpopupwindows=context.pages();
    console.log("num of pages",context.pages().length)

  console.log(allpopupwindows[0].url()) //use when more than two tabs
  console.log(allpopupwindows[1].url())

  for(const data of allpopupwindows)
  {
    const title=await data.title();
    if(title.includes("Selenium"))
    {
       await data.locator(".alert-heading a").click();
        await data.close(); //close selenium popup
      
  console.log("selenium done")
  await data.close();
    }
  }
  await page.waitForTimeout(3000)
 

})

test("unpredictable multiple popups",async({browser})=>{

  const context=await browser.newContext();
  const page=await context.newPage();

  await page.goto("https://testautomationpractice.blogspot.com/");
  await Promise.all([context.waitForEvent("page"),page.getByRole("button",{name:"Popup Windows"}).click()]);
  const allpages=context.pages();
  console.log("num of pages", allpages.length)
  console.log(await allpages[0].title())
   console.log(await allpages[1].title())
   for(const data of allpages)
  {

    //await data.waitForLoadState("domcontentloaded")
  console.log( data.url());
console.log(await data.title());

if((await data.title()).includes("Playwright"))
{
  //data.waitForLoadState();
  await data.locator("//a[text()='Get started']").click();
  await data.waitForTimeout(2000)
  await expect(data.locator("//h1[text()='Installation']")).toContainText("Installation");
  console.log("playwright done")
  await data.close();
}

else if((await data.title()).includes("Selenium"))
{
   await expect(data.locator("h4.selenium-ide")).toBeVisible()
            await data.waitForTimeout(2000)
  console.log("selenium done")
  await data.close();
}
 


  }
  await page.waitForTimeout(3000)
  await page.close();
  await context.close();
  await browser.close();
    
  
  

})