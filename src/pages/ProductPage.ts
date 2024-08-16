import { expect, Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton;
  readonly counterItems;
  readonly showCart;
  readonly checkoutBtn;
  readonly productPrice;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = this.page.locator("#product-addtocart-button");
    this.counterItems = this.page.locator(".counter-number");
    this.showCart = this.page.locator(".showcart");
    this.checkoutBtn = this.page.locator("#top-cart-btn-checkout");
    this.productPrice = this.page.locator(".product-info-main .price");
  }

  public async addItemToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  // Validate item was added to the cart request
  public async waitForAddToCartResponse(): Promise<any> {
    const response = await this.page.waitForResponse(
      (response) =>
        response.url().includes("/checkout/cart/add/") &&
        response.status() === 200
    );

    const responseJson = await response.json();
    return responseJson;
  }

  public async validateCartCounter(): Promise<void> {
    await expect(this.counterItems).toHaveText("1");
  }

  public async openCartModal(): Promise<void> {
    await this.showCart.click();
  }

  public async validateItemInCart(itemName: string): Promise<void> {
    const item = this.page.locator(
      `.minicart-items-wrapper .product-item-name >> text=${itemName}`
    );
    await expect(item).toBeVisible();
  }

  public async proceedToCheckout(): Promise<void> {
    await this.checkoutBtn.click();
  }

  public async getProductPrice(): Promise<number> {
    const priceText = await this.productPrice.textContent();
    // @ts-ignore
    const price = parseFloat(priceText.replace("$", "").trim());
    return price;
  }
}
