// tests/e2e.test.js
const { test, expect } = require('@playwright/test');

// Define the application URLs - matching your actual running ports
const frontendUrl = 'http://localhost:3001';  // Frontend React app URL
const backendUrl = 'http://localhost:3000/users';  // Backend API URL

test.describe('STEM Database Application E2E Tests', () => {
  test('should display the application title', async ({ page }) => {
    // Navigate to the frontend app
    await page.goto(frontendUrl);
    
    // Check if the main title is displayed
    await expect(page.locator('h1')).toContainText('Female in STEM Database');
  });

  test('should add a new profile and display it in the list', async ({ page }) => {
    // Navigate to the frontend app
    await page.goto(frontendUrl);
    
    // Generate unique test data
    const testName = `Test User ${Date.now()}`;
    const testHobby = 'Coding';
    const testAchievement = 'Created AI';
    
    // Fill the form
    await page.fill('input[name="femaleinstem"]', testName);
    await page.fill('input[name="hobby"]', testHobby);
    await page.fill('input[name="achievement"]', testAchievement);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for the alert and close it
    await page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('User added successfully');
      await dialog.accept();
    });
    
    // Wait for the user list to update
    await page.waitForTimeout(1000);
    
    // Check if the newly added user appears in the table
    const tableContent = await page.textContent('table');
    expect(tableContent).toContain(testName);
    expect(tableContent).toContain(testHobby);
    expect(tableContent).toContain(testAchievement);
  });

  test('should delete a profile', async ({ page }) => {
    // Navigate to the frontend app
    await page.goto(frontendUrl);
    
    // Generate unique test data for a user to delete
    const testName = `Delete Test ${Date.now()}`;
    const testHobby = 'Testing';
    const testAchievement = 'QA Expert';
    
    // Setup dialog handlers before triggering dialogs
    page.on('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });
    
    // Add a new user first
    await page.fill('input[name="femaleinstem"]', testName);
    await page.fill('input[name="hobby"]', testHobby);
    await page.fill('input[name="achievement"]', testAchievement);
    await page.click('button[type="submit"]');
    
    // Wait for the user list to update
    await page.waitForTimeout(2000);
    
    // Find the row with our test user
    const tableContent = await page.textContent('table');
    expect(tableContent).toContain(testName);
    
    // Find and click the delete button for the newly added user
    const deleteButtons = await page.locator('table tbody tr button').all();
    let buttonFound = false;
    
    for (let i = 0; i < deleteButtons.length; i++) {
      const row = await page.locator('table tbody tr').nth(i);
      const text = await row.textContent();
      
      if (text.includes(testName)) {
        console.log(`Found row with text: ${text}`);
        await deleteButtons[i].click();
        buttonFound = true;
        break;
      }
    }
    
    expect(buttonFound).toBeTruthy(); // Make sure we found and clicked a button
    
    // Wait for the deletion to complete
    await page.waitForTimeout(2000);
    
    // Verify the user was deleted
    const tableContentAfterDelete = await page.textContent('table');
    const userStillExists = tableContentAfterDelete.includes(testName);
    
    // If the user still exists, log more info for debugging
    if (userStillExists) {
      console.log(`User ${testName} still exists in the table after delete operation`);
      console.log(`Table content after delete: ${tableContentAfterDelete}`);
    }
    
    expect(userStillExists).toBeFalsy();
  });
});