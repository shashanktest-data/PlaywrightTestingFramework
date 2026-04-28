import {test,expect} from "@playwright/test";
import { DashboradPage } from "../../pom/DashboardPage";
import { LoginPage } from "../../pom/LoginPage";
import { CartPage } from "../../pom/CartPage";
import { OrderPage } from "../../pom/OrderPage";
import { OrderHistoryPage } from "../../pom/OrderHistoryPage";
import { OrderSuccessPage } from "../../pom/OrderSuccessPage";
import singleuserrsalogin from "../../data/singleuserrsalogin.json"
import {OrderDetailsPage} from "../../pom/OrderDetailsPage"
import {TestConfig} from "../../test.config"
//const productName="ADIDAS ORIGINAL"
for(const data1 of singleuserrsalogin){
test(`@sanity Add product to cart for testingg ${data1.username}`,async({page})=>{

const config=new TestConfig();
const productName=config.productName;
const lp=new LoginPage(page)
//const cp=new CartPage(page)
await lp.goToUrl();
await lp.loginSuccess(data1.username,data1.password)
    const dp=new DashboradPage(page)
    if(data1.state==="passed")
       {
       // await page.waitForLoadState("networkidle")
        await expect(page).toHaveURL(/dashboard|shop|home/);
       }
       await dp.addProductToCart(productName)
       await expect(dp.toast).toBeVisible();
       
        await expect(dp.toast).toContainText("Product Added To Cart")
        const cp=await dp.clickOnCart()
        await expect(cp.productRow).toBeVisible();
        const productVerify=await cp.verifyProdcutExist();
        expect(productVerify).toBeTruthy();
        await cp.clickCheckout();
        const op=new OrderPage(page);
        await expect(op.paymentdiv).toBeVisible();
        await expect(op.userEmailLabel).toBeVisible();
       const osp= await op.placeOrder();
       const ordersuccessmsg=await osp.getOrderSuccessMsg()
       expect(ordersuccessmsg).toContain(" Thankyou for the order. ")
       await expect(osp.ordersuccessMsg).toBeVisible()
       await expect(osp.ordersuccessMsg).toContainText(" Thankyou for the order. ")
       const orderIddata=await osp.getOrderId()
      const orderId=orderIddata.replace("|","").trim().replace("|","");
      console.log("order id is",orderId)
       const ohp=await osp.clickorderhistorylink()
       await expect(ohp.orderrow.filter({hasText:orderId})).toBeVisible();
       await ohp.viewOrder(orderId);
       const odp=new OrderDetailsPage(page);
      const successmsg= await odp.verifySuccessMsgOnOrderDetails()
      expect(successmsg).toContain("Thank you for Shopping With Us")
       
       





    
})
}