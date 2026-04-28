import{test,expect} from "@playwright/test";

test("pagination table validation",async({page})=>{

    await page.goto("https://datatables.net/examples/basic_init/alt_pagination.html");
    const table=page.locator(".dataTable tbody");
    const rows=await table.locator("tr").all();
    expect(rows.length).toBe(10);   

    const pagination=await page.locator(".dt-paging nav button").all();

    for(const button of pagination)
    {
        if(await button.isEnabled())
        {
            await button.click();
           // break;
        }

        for(const row of rows)
        {

            const data=await row.locator("td").allTextContents();
            console.log(data)
        }

    }

})