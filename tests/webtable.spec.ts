import {test,expect,Page, Locator} from "@playwright/test";
test("web table validation",async({page})=>{

    await page.goto("https://practice-automation.com/tables/");
    const table=page.locator(".wp-block-table");
    //row validation including header and data row
    const row=table.locator("tr")
    expect(await row.count()).toBe(4)
    const cell=table.locator("tr td");

    //total rows
    const rows=await row.all();

    //total columns validation
    const columns=table.locator("tbody tr td strong");
    const columnscount=await columns.count();
    expect(columnscount).toBe(2)

    //total cells and print those cells
    for(const req of rows.slice(1))
    {
const td=await req.locator("td").allTextContents();
console.log("print cell data td",td)
    }

    //print 2nd row data
    const secondrowdata=await row.nth(1).locator("td").allInnerTexts();
    console.log("second row data",secondrowdata);

    //total price



})

test("pagination table validation",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const table=page.locator("#productTable");
    //number of rows
    const rows= table.locator("tbody tr");
    expect(await rows.count()).toBe(5)
    //num of columns
    const columns=table.locator("thead tr th");
    expect(await columns.count()).toBe(4)
    //select particular checkbox

    const matched= rows.filter({
        has:page.locator("td"),
        hasText:"Smartwatch"

    })
    await matched.locator("input").check();

    async function selectCheckbox(rows:Locator,page:Page,productName:string)
    {

     const matchedrow= rows.filter({
        has:page.locator("td"),
        hasText:productName

    })
    await matchedrow.locator("input").check();
    }

    await selectCheckbox(rows,page,"Laptop");
    await selectCheckbox(rows,page,"Tablet");
console.log("########### ...get cell data using for of loop...###########")
    //get cell data
    for(const req of (await rows.all()))
    {
        const cellData=await req.locator("td").allTextContents();
        console.log(cellData.slice(0,3));
    }
console.log("###########")
    //get cell data using index

    for(let i=0;i<await rows.count();i++)
    {
        const cellData=await rows.nth(i).locator("td").allTextContents();
        console.log(cellData.slice(0,3));
    }

    console.log("###########")

    //get cell data using index and outer and inner loop

    for(let i=0;i<await rows.count();i++)
    {

        const tds=rows.nth(i).locator("td");
        
        for(let j=0;j<await tds.count()-1;j++)
        {await tds.nth(j).allTextContents();

            console.log(await tds.nth(j).allTextContents())
        }
    }
 console.log("###########--pages cell data--###########")
    //get all pagination data
    const paginationData=page.locator(".pagination li a");
    for(let p=0;p<await paginationData.count();p++)
    {
        if(p>0)
        {

            await paginationData.nth(p).click();
        }
       for(const reqdata of (await rows.all()))
        {
            const cellData=await reqdata.locator("td").allTextContents();
            console.log(cellData.slice(0,3));

        
        }}       
    
})