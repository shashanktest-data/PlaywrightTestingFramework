import { test, expect } from '@playwright/test';

test('sorted dd', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const ddoptions=page.locator("#animals option");
  const alltextcontents:String[]=(await ddoptions.allTextContents()).map(text=>text.trim())
  console.log([...alltextcontents]) //spread operator
  expect(alltextcontents).toContain("Dog")
  //check if it is sorted
  const sortedlist:String[]=alltextcontents.sort();
  console.log([...sortedlist])
  expect(alltextcontents).toEqual(sortedlist)


});

test('duplicate option in dd', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const ddoptions=page.locator("#colors option");
  const alltextcontents:String[]=(await ddoptions.allTextContents()).map(text=>text.trim())
  console.log(alltextcontents)
  const set=new Set(alltextcontents)
  console.log(set)
  expect(alltextcontents.length).not.toEqual(set.size)
  

});