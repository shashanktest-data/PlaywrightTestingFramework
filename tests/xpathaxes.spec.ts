import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/html_tables.asp');

//locate germany by self
page.locator("//td[text()='Germany']/self::td")
await expect(page.locator("//td[text()='Germany']/self::td")).toBeVisible();

//get all td ele from 2nd row
const secondrowtdele=page.locator("//table[@id='customers']//tr[3]/child::td");
await expect(secondrowtdele).toHaveCount(3);
await expect(secondrowtdele).toHaveText(["Centro comercial Moctezuma","Francisco Chang","Mexico"]);
await expect(secondrowtdele).toContainText(["Centro comercial Moctezuma"]);
const secondrowdata=page.locator("//table[@id='customers']//tr[3]");
 await expect(secondrowdata).toHaveCount(1);
 await expect(secondrowdata).toHaveText("Centro comercial Moctezuma Francisco Chang Mexico");

const table=page.locator("//td[text()='Germany']/parent::tr/parent::tbody/parent::table")
await expect(table).toHaveCount(1);
await expect(table).toHaveAttribute("id","customers")

const tablefordesc=page.locator("//table[@id='customers']/descendant::td")
await expect(tablefordesc).toHaveCount(18);
expect(await tablefordesc.count()).toBeGreaterThan(0)
expect(await tablefordesc.count()).toBe(18)

const following=page.locator("//table[@id='customers']/tbody//td[text()='Maria Anders']/following::td")
await expect(following).toHaveCount(36);
const followingSiblings=page.locator("//table[@id='customers']/tbody//td[text()='Maria Anders']/following-sibling::td")
await expect(followingSiblings).toHaveCount(1);
await expect(followingSiblings).toHaveText("Germany")
const precingsibling=page.locator("//table[@id='customers']/tbody//td[text()='UK']/preceding-sibling::td");
await expect(precingsibling).toHaveCount(2);
await expect(precingsibling).toHaveText(["Island Trading","Helen Bennett"]);
const preceding=page.locator("//table[@id='customers']/tbody//td[text()='UK']/preceding::td")
await expect(preceding).toHaveCount(11);

})