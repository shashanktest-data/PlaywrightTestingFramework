import { test, expect } from '@playwright/test';
import fs from "fs"
import * as XLSX from "xlsx"
const excelpath="tests/playwrightxlsx.xlsx"
const workbook=XLSX.readFile(excelpath);
const sheetNames=workbook.SheetNames[0]
const worksheet=workbook.Sheets[sheetNames];

//convert sheet into jso
const logindata=XLSX.utils.sheet_to_json(worksheet)







for(const data of logindata){
test(` ddt using array for ${data.username} and ${data.password}`, async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

 await page.getByPlaceholder("email@example.com").fill(data.username)
await page.getByPlaceholder("enter your passsword").fill(data.password)
await page.locator("#login").click(); 
})

}