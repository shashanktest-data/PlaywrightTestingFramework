import { chromium } from '@playwright/test';

async function globalSetup() {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  await page.fill("#userEmail", "testjoy@gmail.com");
  await page.fill("#userPassword", "Abc1@345");
  await page.click("#login");

  await page.waitForURL("**/dashboard/**");

  // save auth state
  await context.storageState({ path: "./data/loginstate.json" });

  await browser.close();
}

export default globalSetup;