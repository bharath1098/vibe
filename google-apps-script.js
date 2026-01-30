/**
 * Google Apps Script for Travibe Contact Form
 * 
 * Instructions:
 * 1. Create a Google Sheet with headers: Timestamp, Name, Email, Phone, Company, Message, Investing, Partnership
 * 2. In your Google Sheet, go to Extensions → Apps Script
 * 3. Paste this script
 * 4. Run intialSetup() ONCE to set up the spreadsheet ID
 * 5. Save the script (Ctrl+S or Cmd+S)
 * 6. Click Deploy → New deployment
 * 7. Choose type: Web app
 * 8. Execute as: Me
 * 9. Who has access: Anyone
 * 10. Click Deploy
 * 11. Copy the Web App URL
 */

var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
  Logger.log('Spreadsheet ID saved: ' + activeSpreadsheet.getId())
}

function doPost(e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    Logger.log('=== POST Request Received ===')
    Logger.log('Parameters: ' + JSON.stringify(e.parameter))
    
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    Logger.log('Sheet headers: ' + headers.join(', '))

    var nextRow = sheet.getLastRow() + 1

    // Map headers to parameter values, handling timestamp and boolean values
    var newRow = headers.map(function(header) {
      if (header === 'Timestamp' || header === 'timestamp') {
        return new Date()
      }
      
      var value = e.parameter[header] || e.parameter[header.toLowerCase()]
      
      // Handle boolean/checkbox fields
      if ((header === 'Investing' || header === 'investing' || 
           header === 'Partnership' || header === 'partnership')) {
        if (value === 'true' || value === true) {
          return 'Yes'
        } else {
          return 'No'
        }
      }
      
      return value || ''
    })

    Logger.log('New row data: ' + JSON.stringify(newRow))
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    Logger.log('✓ Data appended successfully to row: ' + nextRow)

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (error) {
    Logger.log('✗ Error: ' + error.toString())
    Logger.log('Stack: ' + (error.stack || 'No stack trace'))
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

// Handle GET requests (fallback method)
function doGet(e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    Logger.log('=== GET Request Received (Fallback) ===')
    Logger.log('Parameters: ' + JSON.stringify(e.parameter))
    
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      if (header === 'Timestamp' || header === 'timestamp') {
        return new Date()
      }
      
      var value = e.parameter[header] || e.parameter[header.toLowerCase()]
      
      if ((header === 'Investing' || header === 'investing' || 
           header === 'Partnership' || header === 'partnership')) {
        if (value === 'true' || value === true) {
          return 'Yes'
        } else {
          return 'No'
        }
      }
      
      return value || ''
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
    Logger.log('✓ Data appended via GET method to row: ' + nextRow)

    return HtmlService.createHtmlOutput(`
      <script>
        window.top.postMessage({success: true, message: 'Form submitted successfully'}, '*');
      </script>
      <p>Form submitted successfully! You can close this window.</p>
    `)
  } catch (error) {
    Logger.log('GET Error: ' + error.toString())
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  } finally {
    lock.releaseLock()
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
    },
    parameter: {},
    queryString: '',
    contentLength: -1,
    parameters: {}
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
  
  // Check if data was added
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  Logger.log('Last row in sheet: ' + lastRow);
}

