import { test, expect, Locator } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const firstname=page.getByPlaceholder("Enter Name");
  await expect(firstname).toBeVisible();
 
  await expect(firstname).toHaveAttribute("maxlength","15");
  await firstname.fill("abcd")
  console.log("enetred value in text box",await firstname.inputValue())
    await expect(firstname).toHaveValue("abcd");
    expect(await firstname.inputValue()).toBe("abcd")
 
})

test('radio button using label', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
 await page.getByRole("radio",{name:"Female"}).check()
 await expect(page.getByRole("radio",{name:"Female"})).toBeChecked();
 
})

test('radio button using input tag', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  expect(await page.locator(".form-group div [id='female']").isChecked()).toBeFalsy();
  expect(await page.locator(".form-group div [id='female']").isChecked()).toBe(false);
  await page.locator(".form-group div [id='female']").check();
  await expect(page.locator(".form-group div [id='female']")).toBeChecked();
  expect(await page.locator(".form-group div [id='female']").isChecked()).toBeTruthy()

 
})


test('check box using label', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
 await page.getByLabel("Sunday").check();
await expect(page.getByLabel("Sunday")).toBeChecked();
 
})

test('check all checkboxes using iteration', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
const checkboxes=page.locator(".form-group input[type='checkbox']")
const count=await checkboxes.count()
for(let i=0;i<count;i++)
{
    await checkboxes.nth(i).check();
    await expect(checkboxes.nth(i)).toBeChecked();
}
 
})

test('check all checkboxes using array and all()', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
const checkboxes:Locator=page.locator(".form-group input[type='checkbox']")

for(const req of await checkboxes.all())
{
    await req.check();
    await expect(req).toBeChecked();
}
 
})

test('check all checkboxes using their labels', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
const checkboxes=page.getByLabel(/Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/)


for(const req of await checkboxes.all())
{
    await req.check();
    await expect(req).toBeChecked();
}

for(const req1 of (await checkboxes.all()).slice(-3))
{
    const data=await req1.uncheck()
    await expect(req1).not.toBeChecked();
}
 
})

test('check INDEX BASED checkboxes', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
const index=[1,3,4];

const checkboxlist=page.locator(".form-check [type='checkbox']")
for(const data1 of index)
{
    await checkboxlist.nth(data1).check();
    await expect(checkboxlist.nth(data1)).toBeChecked();
}
 
})

    test('check random checkboxes', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const days=page.getByLabel(/Sunday|Monday|Wednesday/);

    for(const data of await days.all())
    {

        await data.check();
        await expect(data).toBeChecked();
    }


})

  test('check checkbox on the basis of label array', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const dayslabels=["Sunday","Monday","Wednesday"];

    for(const data of dayslabels)
    {

       if(data.toLowerCase()===dayslabels[0].toLowerCase())
       {
        
        await page.getByLabel(data).check();
        await expect(page.getByLabel(data)).toBeChecked();
       }
    }

})

test('check checkbox on the basis of label', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const reqday="Monday"
    const days:string[]=["Sunday","Monday","Wednesday"]

    for(const data of days)
    {

       if(data.toLowerCase()===reqday.toLowerCase())
       {
        
        await page.getByLabel(data).check();
        await expect(page.getByLabel(data)).toBeChecked();
       }
    }


})