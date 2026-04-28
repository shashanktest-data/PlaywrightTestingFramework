import { test, expect } from '@playwright/test';
import fs from "fs"
import {parse} from "csv-parse/sync"
const csvpath="tests/data.csv"
const filecontent=fs.readFileSync(csvpath,"utf-8")
const records=parse(filecontent,{columns:true,skipEmptyLines:true})




for(const data of records){
test(` ddt using array for ${data.username} and ${data.password}`, async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

 await page.getByPlaceholder("email@example.com").fill(data.username)
await page.getByPlaceholder("enter your passsword").fill(data.password)
await page.locator("#login").click(); 
})

}