import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { texts } from "../data/text";
import { testUser } from "../data/userData";

test.describe("Purchase flow", () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let checkoutPage: CheckoutPage;
  let productPrice, expectedTotalPrice;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    checkoutPage = new CheckoutPage(page);

    await homePage.goToUrl("https://magento.softwaretestingboard.com/");
  });

  test("Add item to cart - proceed to checkout", async ({ page }) => {
    await homePage.searchItem(texts.backpack);
    await homePage.selectItemByText(texts.backpack);

    await productPage.addItemToCart();
    await productPage.waitForAddToCartResponse();
    await productPage.validateCartCounter();

    await productPage.openCartModal();
    await productPage.validateItemInCart(texts.backpack);

    productPrice = await productPage.getProductPrice();

    await productPage.proceedToCheckout();

    await checkoutPage.waitForLoaderToDisappear();
    await checkoutPage.fillBillingInformation(
      testUser.email,
      testUser.firstName,
      testUser.lastName,
      testUser.company,
      testUser.address,
      testUser.city,
      testUser.region,
      testUser.postcode,
      testUser.telephone
    );

    await checkoutPage.validateShippingRateRadio();
    await checkoutPage.clickNext();

    await checkoutPage.validateBillingDetails(
      testUser.firstName,
      testUser.lastName,
      testUser.address
    );

    expectedTotalPrice = productPrice + 5;
    await checkoutPage.validateTotalPrice(expectedTotalPrice);

    await checkoutPage.placeOrder();

    await checkoutPage.validateOrderSuccess();
  });

  test.afterEach(async ({ page }) => {
    console.log("Test completed with github actions");
  });
});
