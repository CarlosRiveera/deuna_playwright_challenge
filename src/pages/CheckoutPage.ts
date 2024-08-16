import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly email;
  readonly firstName;
  readonly lastName;
  readonly company;
  readonly address;
  readonly city;
  readonly region;
  readonly postcode;
  readonly telephone;
  readonly radioDate;
  readonly continueBtn;
  readonly addressDetail;
  readonly placeOrderBtn;
  readonly totalPriceElement;

  constructor(page: Page) {
    this.page = page;
    this.email = this.page.locator("#customer-email-fieldset #customer-email");
    this.firstName = this.page.locator('[name="firstname"]');
    this.lastName = this.page.locator('[name="lastname"]');
    this.company = this.page.locator('[name="company"]');
    this.address = this.page.locator('[name="street[0]"]');
    this.city = this.page.locator('[name="city"]');
    this.region = this.page.locator('[name="region"]');
    this.postcode = this.page.locator('[name="postcode"]');
    this.telephone = this.page.locator('[name="telephone"]');
    this.radioDate = this.page.locator(".radio[checked='true']");
    this.continueBtn = this.page.locator(".continue");
    this.addressDetail = this.page.locator(".billing-address-details");
    this.placeOrderBtn = this.page.locator('[title="Place Order"]');
    this.totalPriceElement = this.page.locator(".grand.totals .price");
  }

  public async waitForLoaderToDisappear(): Promise<void> {
    await this.page.waitForSelector(".loader", { state: "hidden" });
  }

  public async fillBillingInformation(
    email: string,
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    city: string,
    region: string,
    postcode: string,
    telephone: string
  ): Promise<void> {
    await this.email.fill(email);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.company.fill(company);
    await this.address.fill(address);
    await this.city.fill(city);
    await this.page.selectOption('[name="country_id"]', "SV");
    await this.region.fill(region);
    await this.postcode.fill(postcode);
    await this.telephone.fill(telephone);

    // This wait it's because of the radio button section that updates after selecting the country
    await this.page.waitForTimeout(1000);
  }

  public async validateShippingRateRadio(): Promise<void> {
    await expect(this.radioDate).toBeVisible();
    await expect(this.radioDate).toBeChecked();
  }

  public async clickNext(): Promise<void> {
    await this.continueBtn.click();
  }

  public async validateBillingDetails(
    firstName: string,
    lastName: string,
    address: string
  ): Promise<void> {
    await expect(this.addressDetail).toContainText(firstName);
    await expect(this.addressDetail).toContainText(lastName);
    await expect(this.addressDetail).toContainText(address);
  }

  public async validateTotalPrice(expectedPrice: number): Promise<void> {
    const totalPriceText = await this.totalPriceElement.textContent();
    // @ts-ignore
    const totalPrice = parseFloat(totalPriceText.replace("$", "").trim());
    expect(totalPrice).toBe(expectedPrice);
  }

  public async placeOrder(): Promise<void> {
    await this.placeOrderBtn.click();
  }

  public async validateOrderSuccess(): Promise<void> {
    const successResponse = await this.page.waitForResponse(
      (response) =>
        response.url().includes("/checkout/onepage/success/") &&
        response.status() === 200
    );

    expect(successResponse.status()).toBe(200);
  }
}
