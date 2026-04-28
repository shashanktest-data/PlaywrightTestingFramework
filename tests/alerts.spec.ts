import { test, expect,Page } from '@playwright/test';

 
 test('simple alerts', async ({ page }) => {
     
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.waitForTimeout(3000)

  //simple alert
page.once("dialog",async (dialog)=>{
  expect(dialog.type()).toContain("alert")
  expect(dialog.message()).toContain("I am an alert box!")
  await dialog.accept();

})

await page.getByRole("button",{name:"Simple Alert"}).click();



 
 })

  test('confirmation alerts', async ({ page }) => {
     
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.waitForTimeout(3000)

  //simple alert
page.once("dialog",async (dialog)=>{
  expect(dialog.type()).toContain("confirm")
  expect(dialog.message()).toContain("Press a button!")
  await dialog.accept();

})

await page.getByRole("button",{name:"Confirmation Alert"}).click();



 
 })

   test('popup alerts', async ({ page }) => {
     
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.waitForTimeout(3000)

  //simple alert
page.once("dialog",async (dialog)=>{
  expect(dialog.type()).toContain("prompt")
  expect(dialog.message()).toContain("Please enter your name:")
  await dialog.accept("Harry Potter");

})

await page.getByRole("button",{name:"Prompt Alert"}).click();



 
 })
 