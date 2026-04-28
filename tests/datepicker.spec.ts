import { test, expect,Page } from '@playwright/test';

test('DATE PICKER WITH FUTURE SELECTION', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const datepickerfield=page.locator("#datepicker")
  //target date
  const year="2026";
  const month="June"
  const date=10
await datepickerfield.click();
while(true)
{
const currentmonth=await page.locator(".ui-datepicker-month").innerText()
const currentyear=await page.locator(".ui-datepicker-year").innerText();

if(currentyear===year&&currentmonth===month)
{
break;
}
//future
await page.locator(".ui-icon-circle-triangle-e").click();

}

const allDates=await page.locator(".ui-datepicker-calendar tbody td").all();

for(const reqdate of allDates)
{
   const dateText= await reqdate.innerText();
   if(dateText===date.toString())
   {
    await reqdate.click();
    break;
   }
}

});

test('DATE PICKER WITH PAST SELECTION', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const datepickerfield=page.locator("#datepicker")
  //target date
  const year="2026";
  const month="March"
  const date=11
await datepickerfield.click();

while(true)
{
    const actualyaer=await page.locator(".ui-datepicker-year").innerText();
    const actualmonth=await page.locator(".ui-datepicker-month").innerText();
    if(actualmonth===month && actualyaer===year)
    {
        break;
    }
    await page.locator(".ui-icon-circle-triangle-w").click();
}

const actualdate=page.locator(".ui-datepicker-calendar tbody tr td")
for(const reqdate of await actualdate.all())
{
const actualdatetext=await reqdate.innerText();
if(actualdatetext===date.toString())
{
    await reqdate.click();
    break;
}

}



})

test("date picker using function",async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');


  //target date
  const year="2026";
  const month="March"
  const date=11
  await selectDate("2024","September","10",page,true);


    async function selectDate(year:String,month:String,date:String,page:Page,isFuture:boolean)
{


  const datepickerfield=page.locator("#datepicker")
  //target date
 // const year="2026";
 // const month="March"
  //const date=11
await datepickerfield.click();

while(true)
{
    const actualyaer=await page.locator(".ui-datepicker-year").innerText();
    const actualmonth=await page.locator(".ui-datepicker-month").innerText();
    if(actualmonth===month && actualyaer===year)
    {
        break;
    }
    if(isFuture)
    {
//future
await page.locator(".ui-icon-circle-triangle-e").click();
    }else{
    await page.locator(".ui-icon-circle-triangle-w").click();
    }
}

const actualdate=page.locator(".ui-datepicker-calendar tbody tr td")
for(const reqdate of await actualdate.all())
{
const actualdatetext=await reqdate.innerText();
if(actualdatetext===date.toString())
{
    await reqdate.click();
    break;
}

}



}
})