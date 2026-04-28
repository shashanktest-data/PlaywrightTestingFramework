import { test, expect ,chromium} from '@playwright/test';
import playwright from "playwright"

test('has title', async ({  }) => {

    const browser=await playwright.chromium.launch();
    const context=await browser.newContext();
    const page1=await context.newPage();
    const page2=await context.newPage();
    console.log("num of pages",context.pages().length)
  await page1.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page1).toHaveTitle(/Playwright/);

  await page2.goto('https://google.com/');

  // Expect a title "to contain" a substring.
  await expect(page2).toHaveTitle(/google/i);
});

test('multiple context and multiple pages', async ({  }) => {

    const browser=await playwright.chromium.launch();
    const context1=await browser.newContext();
     const context2=await browser.newContext();
    const page1=await context1.newPage();
    const page2=await context2.newPage();
    console.log("num of pages",context1.pages().length)
    console.log("num of pages",context2.pages().length)
  await page1.goto('https://demowebshop.tricentis.com/login');
  await page1.locator("#Email").fill("test11@pw.com")
  await page1.locator("#Password").fill("abc123")
  await page1.locator(".login-button").click();
  await expect(page1.getByRole("link",{name:"test11@pw.com"})).toBeVisible();



   await page2.goto('https://demowebshop.tricentis.com/login');
  await page2.locator("#Email").fill("ab@pw.com")
  await page2.locator("#Password").fill("abc123qq")
  await page2.locator(".login-button").click();
  await expect(page2.getByText("Login was unsuccessful. Please correct the errors and try again.")).toBeVisible();
  

});