import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchInput;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.locator("#search");
  }

  async goToUrl(url: string) {
    await this.page.goto(url);
  }

  public async searchItem(item: string): Promise<void> {
    await this.searchInput.click();
    await this.searchInput.fill(item);
    await this.searchInput.press("Enter");
  }

  public async selectItemByText(itemName: string): Promise<void> {
    await this.page.locator(`.product-item-name >> text=${itemName}`).click();
  }
}
