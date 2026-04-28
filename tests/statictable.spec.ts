import { test, expect,Locator } from '@playwright/test';

test("extract texts",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const productTitles:Locator=page.locator(".product-title a");

    const table=page.locator("[name='BookTable'] tbody");
    const row=table.locator("tr");
    const rows=await row.all();
    expect(await row.count()).toBe(7);
    expect(rows.length).toBe(7);

    //for of loop->get all tds except header
    for(const data of rows.slice(1))
    {
        const tds=await data.locator("td").allInnerTexts();
        console.log(tds);
    }
console.log("##################")
    //for loop->get all tds except header
    for(let i =1;i<await row.count();i++)
    {

        const tdss=await row.nth(i).locator("td").allInnerTexts();
        console.log(tdss);
    }

    //read all data from 2nd row
    console.log("################## get data of 2nd row ##################")
   const secondrowdata:String[] = await row.nth(1).locator("td").allInnerTexts();
   console.log(secondrowdata); // [ 'Learn Selenium', 'Amit', 'Selenium', '300' ]
 

    //print bookname where author is Mukesh
    console.log("################## print bookname where author is Mukesh ##################")

    for(const req of rows.slice(1))
    {

        const bookName=await req.locator("td").nth(0).innerText();
        const authorName=await req.locator("td").nth(1).innerText();
        
        if(authorName==="Mukesh")
        {
            console.log(bookName);
            
            
        }
    }

    //get total price
    console.log("################## get total price ##################")
    let totalPrice=0;
    for(const price of rows.slice(1))
    {
        const reqprice=await price.locator("td").nth(3).innerText();
        const data=parseInt(reqprice);
        totalPrice =data+totalPrice;
    }
    console.log("total price is ",totalPrice);

})