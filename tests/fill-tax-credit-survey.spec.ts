import { test, expect } from '@playwright/test';
import { TaxCreditSurveyPage } from './src/pages/TaxCreditSurveyPage';

const firstname: string = 'Joe';
const lastname: string = 'Sample';
const emailAddress: string = 'zyztest1001@taxcc.bg';
const streetAddress: string = 'Street line 1';
const city: string = 'Monterey Park';
const zipCode: string = '91754';
const heading1: string = 'At this time, please answer Yes or No to the following questions:';
const heading2: string = 'Additional Information';
const expectedUrl: string = 'https://www.experian.com/employer-services/';

test('Complete Tax Credit Survey form', async ({ page }) => {
  await page.goto('/automation-challenge');
  
  // Expect a title "to contain" Tax Credit Survey.
  await expect(page).toHaveTitle(/Tax Credit Survey/);

  // Initialize the SurveyPage object
  const surveyPage = new TaxCreditSurveyPage(page);

  // Enter first name
  await surveyPage.enterFirstName(firstname);

  // Enter last name
  await surveyPage.enterLastName(lastname);

  // Enter email address
  await surveyPage.enterEmailAddress(emailAddress);

  // Enter street address
  await surveyPage.enterStreetAddress(streetAddress);

  // Enter city
  await surveyPage.enterCity(city);

  // Enter Zip code
  await surveyPage.enterZipCode(zipCode);

  // Click Next
  await surveyPage.clickNext();

  // Validates header text
  await surveyPage.validateInstructionTextIsDisplayed(heading1);

  // 3. Answer “NO” to all questions under:
  // “At this time, please answer Yes or No to the following questions:” 
  // and click on Next button
  await surveyPage.clickAllNoOptions();

  // Click Next
  await surveyPage.clickNext();

  // Validates header text
  await surveyPage.validateInstructionTextIsDisplayed(heading2);

  // 4. Verify the name in the text field matches what you entered in Step 2.
  await surveyPage.verifyInputValue(`${firstname} ${lastname}`);

  // Click Submit Form button
  await surveyPage.clickSubmitForm();

  // 5. Validates expected url with current url
  await surveyPage.validateCurrentUrl(expectedUrl);

});