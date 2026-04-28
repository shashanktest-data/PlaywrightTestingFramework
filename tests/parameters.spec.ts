import { test, expect } from '@playwright/test';
import loginjson from "./login.json"


const creds=[{username:"testjoy@gmail.com",password:"Abc1@345"},{username:"testabc@gmail.com",password:"abc"}];

for(const data of creds){
test(` ddt using array for ${data.username}`, async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

 await page.getByPlaceholder("email@example.com").fill(data.username)
await page.getByPlaceholder("enter your passsword").fill(data.password)
await page.locator("#login").click(); 
})

}
const login=[
    ["testjoy@gmail.com","Abc1@345"], //2d array
    ["testabc@gmail.com","abc"]
];
for(const [email,password] of login){
test(` ddt using array for ${email} and ${password}`, async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

 await page.getByPlaceholder("email@example.com").fill(email)
await page.getByPlaceholder("enter your passsword").fill(password)
await page.locator("#login").click(); 
})

}

for(const reqjson of loginjson){
test(` ddt using array for ${reqjson.username} and ${reqjson.password}`, async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

 await page.getByPlaceholder("email@example.com").fill(reqjson.username)
await page.getByPlaceholder("enter your passsword").fill(reqjson.password)
await page.locator("#login").click(); 
})

}