import { test, expect } from '@playwright/test';

test('@sanity has title', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  //div,span,p ,h tags non interactive elements->use getByText
  page.getByText(/Automation+s\Testing+s\Practice/);
  await expect(page.getByText(/Automation\s+Testing\s+Practice/i)).toBeVisible();

})

test("@regression 2nd assignment ", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
 page.getByRole("link",{name:'GUI Elements'});
  expect(page.getByRole("link",{name:'GUI Elements'})).toBeVisible();


 
})

test("@sanity @regression 3rd assignment ", async ({ page }) => {  // "(?=.*@sanity)(?=.*@regression)" -@sanity and regression both , "@sanity|@regression"-either sanity or regression
  await page.goto("https://testautomationpractice.blogspot.com/");

 page.getByPlaceholder("Enter Name").fill("abcd")
 await expect(page.getByPlaceholder("Enter Name")).toHaveValue("abcd");
 
})
const creds=[{username:"testjoy@gmail.com",password:"Abc1@345"},{username:"testabc@gmail.com",password:"abc"}];

for(const data of creds){
test(`@regression ddt using array for ${data.username}`, async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

 await page.getByPlaceholder("email@example.com").fill(data.username)
await page.getByPlaceholder("enter your passsword").fill(data.password)
await page.locator("#login").click(); 
})

}

//--grep-invert "@regression"->sanity run which is not part of regression"

//--grep "@sanity" --grep-invert "@regression" -same