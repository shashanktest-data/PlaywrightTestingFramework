import { test, expect } from '@playwright/test';

test('@master handle dynamic web table', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/dynamic-table');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Dynamic Table/);

  const table=page.locator(".table-striped tbody");
  expect(table).toBeVisible();
  const rows=await table.locator("tr").all();
  expect(rows.length).toBe(4);
  //for chrome process get value of cpu load
  let cpuLoad="";
  let processName="";
  for(const row of rows) //not required to use .slice(1) bcz taking rows from body itself
  {
    processName=await row.locator("td").nth(0).innerText(); //get first column data which is not changing
    console.log(processName);
    if(processName==="Chrome")
    {
       // cpuLoad=await row.locator("td:hasText('%')").innerText();
       //cpuLoad=await row.locator("td",{hasText:'%'}).innerText();
     cpuLoad=await row.locator("td").filter({hasText:/%/}).innerText();
       console.log("cpu load of chrome process is ",cpuLoad);
       break;
    }
  }

  //compare it-
  const expected=await page.locator(".bg-warning").innerText();
  const reqExpected=expected.split(":")[1].trim();
  console.log("expected cpu load is",reqExpected);

  if(expected.includes(cpuLoad))
  {
    console.log("CPU load matches expected value");
  }else{
    console.log("CPU load does not match expected value");
  }
  expect(expected).toContain(cpuLoad);
 
});

test("@regression 2nd assignment",async({page})=>{
let memory="";
    await page.goto("https://testautomationpractice.blogspot.com/");
        const table=page.locator("#taskTable tbody");
        const rows=await table.locator("tr").all();

        for(const row of rows.slice(1))
        {
            const name=await row.locator("td").nth(0).innerText();
            if(name==="Firefox")
            {
 //memory=await row.locator("td").filter({ hasNotText: /Mbps|MB\/s|%/ }).nth(1).innerText();
 memory=await row.locator("td").filter({ hasText: /MB(?!\/s)/ }).innerText();

 console.log("Memory of firefox process is ",memory);   

 break;


            }
        }
        const expectedMemory=await page.locator("#displayValues p:nth-child(2)").innerText();
        const expectedmemorydata=expectedMemory.split(":")[1].trim();
        expect(expectedMemory).toContain(memory);
        console.log(expectedmemorydata)
        if(expectedMemory.includes(memory))
        {
            console.log("Memory matches expected value");
        }else{
            console.log("Memory does not match expected value");
        }
})

test("3rd assignment", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const rows = page.locator("#taskTable tbody tr");

    // 1. Get headers dynamically
    const headers = await page.locator("#taskTable thead th").allTextContents();

    const memoryIndex = headers.findIndex(h =>
        h.trim().toLowerCase().includes("memory")
    );

    console.log("Memory column index:", memoryIndex);

    // 2. Loop rows
    for (const row of (await rows.all()).slice(1)) {

        const name = await row.locator("td").nth(0).innerText();

        if (name.trim() === "Firefox") {

            const cells = await row.locator("td").allTextContents();

            const memory = cells[memoryIndex];

            console.log("Memory Size of Firefox process:", memory);

            break;
        }
    }
});

test("4th task",async({page})=>{

let cells="";
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table=page.locator("#taskTable tbody");
    const rows=await table.locator("tr").all();

    for(const row of rows.slice(1))
    {
        const process=await row.locator("td").nth(0).innerText();
        if(process==="Chrome")
        {
         //   cells=await row.locator("td").filter({hasNotText:/MB|MB\/s|%/}).nth(1).innerText();
         cells=await row.locator("td").filter({hasText:/Mbps/}).innerText();
            console.log("Memory of chrome process is ",cells);
            break;
        }
    }

    const expectedData=await page.locator("#displayValues p:nth-child(3)").innerText();
    if(expectedData.includes(cells))
    {

        console.log("Memory of chrome process matches expected data");
    }
    expect(expectedData).toContain(cells)
})

test("Disk space of Firefox process:",async({page})=>{


  let cells="";
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table=page.locator("#taskTable tbody");
    const rows=await table.locator("tr").all();

    for(const row of rows.slice(1))
    {
        const process=await row.locator("td").nth(0).innerText();
        if(process==="Firefox")
        {
            cells= await row.locator("td").filter({ hasText: /MB\/s/ }).innerText();
            console.log("Disk space of Firefox process is ",cells);
            break;
        }
    }

    const text=await page.locator("#displayValues p:nth-child(4)").innerText();
    const expectedValue = text.split(":")[1].trim();
    expect(text).toContain(cells)
    if(text.includes(cells))
    {
        console.log("Disk space of Firefox process matches expected data");
    }
})

test("greenkart app",async({page})=>{
let firstcolumns:any
let price:any;

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    const table=page.locator(".table-bordered");
    const row=table.locator("tbody tr")
    expect(await row.count()).toBe(5)
    //check the price of rice is 37
    for(const data of await row.all())
    {
firstcolumns=await data.locator("td").nth(0).textContent() //get first column values
if(firstcolumns==="Rice")
{
    price=await data.locator("td").filter({hasText:"37"}).innerText();
   expect(price).toContain("37");
    console.log("done")
    break;
}
    }

    
})