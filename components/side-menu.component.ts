import { Locator, Page } from '@playwright/test';

export class SideMenuComponent {
  paymentButton: Locator;

  constructor(page: Page) {
    this.paymentButton = page.getByRole('link', { name: 'płatności' });
  }
}
