import { Page, expect } from '@playwright/test';

export class TaxCreditSurveyPage {

  constructor(public page: Page) {
    this.page = page;
  }

  // Type First Name
  async enterFirstName(firstName: string) {
    await this.page.locator('//label[text() = "First Name"]/following-sibling::div/input')
      .fill(firstName);
  };

  // Type Last Name
  async enterLastName(lastName: string) {
    await this.page.locator('//label[text() = "Last Name"]/following-sibling::div/input')
      .fill(lastName);
  };

  // Type Email Address
  async enterEmailAddress(emailAddress: string) {
    await this.page.locator('//label[text() = "Email Address"]/following-sibling::div/input')
      .fill(emailAddress);
  };

  // Type Stree Address
  async enterStreetAddress(streetAddress: string) {
    await this.page.locator('//label[text() = "Street Address"]/following-sibling::div/input')
      .fill(streetAddress);
  };

  // Type City name
  async enterCity(cityName: string) {
    await this.page.locator('//label[text() = "City"]/following-sibling::div/input')
      .fill(cityName);
  };

  // Type Zip Code
  async enterZipCode(zipCode: string) {
    await this.page.locator('//label[text() = "Zip Code"]/following-sibling::div/input')
      .fill(zipCode);
  };

  // Click Next button
  async clickNext() {
    await this.page.locator('input[value="Next"]')
      .click();
  };

  /**
   * Clicks on all "No" options in the survey.
   */
  async clickAllNoOptions() {
    // Locate all "No" labels/Inputs
    const noOptions = this.page.locator('label:has-text("No")');

    // Get the count of all "No" options
    const noOptionsCount = await noOptions.count();

    // Loop through each "No" option and click on it
    for (let i = 0; i < noOptionsCount; i++) {
      await noOptions.nth(i).click();
    }
  };

  // Validates header title
  async validateInstructionTextIsDisplayed(heading: string) {
    // Locator for the instruction text
    const headerText = this.page.locator('label strong');

    // Assertion to check if the text is correct
    await expect(headerText)
      .toHaveText(heading);
  };

  // Grab text value from input field
  async verifyInputValue(expectedValue: string): Promise<void> {
    const inputSelector = 'div[id*=SurveyControl] input';

    // Retrieves value of input field
    const inputValue = await this.page.inputValue(inputSelector);

    // Asserts input field's value matches the expected value for first and last name.
    expect(inputValue).toBe(expectedValue);
  };

  // Click Submit form button
  async clickSubmitForm() {
    await this.page.locator('input[value="Submit form"]')
      .click();
  };

  // Validates user is taken to expected URL
  async validateCurrentUrl(expectedUrl: string): Promise<void> {
    // Gets the current page URL
    const currentUrl = this.page.url();

    // Assert that the current URL matches the expected URL
    expect(currentUrl).toBe(expectedUrl);
  }

}
