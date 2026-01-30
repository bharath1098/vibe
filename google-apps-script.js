/**
 * Google Apps Script for Travibe Contact Form
 * 
 * Instructions:
 * 1. Create a Google Sheet with headers: Timestamp, Name, Email, Phone, Company, Message, Investing, Partnership
 * 2. Copy this script into Apps Script (Extensions → Apps Script)
 * 3. Replace SPREADSHEET_ID with your sheet's ID
 * 4. Deploy as Web App with "Anyone" access
 * 5. Copy the Web App URL and use it in ContactUs.tsx
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your Google Sheet ID

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Parse the POST data
    const data = JSON.parse(e.postData.contents);
    
    // Prepare row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.message || '',
      data.investing ? 'Yes' : 'No',
      data.partnership ? 'Yes' : 'No'
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for testing in Apps Script editor)
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890',
        company: 'Test Company',
        message: 'This is a test message',
        investing: true,
        partnership: false
      })
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

