import { test, expect,Locator } from '@playwright/test';

test("extract texts",async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");
    const productTitles:Locator=page.locator(".product-title a");

    //1st approach to get text of first product

    const firstproducttitle:String=await productTitles.nth(0).innerText();
    console.log(firstproducttitle)
     const firstproducttitle1:String|null=await productTitles.nth(0).textContent();
     console.log(firstproducttitle1)

     //2nd approach to get text of all products using for loop
     console.log("#### get text of all products using for loop ####")
     const count=await productTitles.count();
     for(let i=0;i<count;i++)
     {
        const text:String|null=await productTitles.nth(i).textContent();
        console.log(text?.trim());
     }

     //3rd approach
     console.log("########### ...get text using for of loop...###########")

     for(const data of await productTitles.all())
     {
        console.log(await data.innerText());
     }

     //compare allinnretexts and alltestcontents
     console.log("########### ...compare allinnretexts and alltestcontents without loop...###########")
     const allInnerTexts:String[]=await productTitles.allInnerTexts();
     const allTextContents:String[]=await productTitles.allTextContents();
     console.log("allInnerTexts",allInnerTexts);
     const mappeddatas:String[]=allTextContents.map(Text=>Text.trim());
     console.log("allTextContents",mappeddatas);

     //use of all
     console.log("########### ...get text using for of loop with all...###########")

     const allProductLocators:Locator[]=await productTitles.all();
       console.log(await allProductLocators[1].innerText())
        for(const data of allProductLocators)
        {
            console.log(await data.innerText());
          
        }



    
})