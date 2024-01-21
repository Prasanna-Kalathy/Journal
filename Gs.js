var sheetName = 'JAN'
var scriptProp = PropertiesService.getScriptProperties()

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(2, 7, 1, 38).getValues()[0];

    console.log(headers);

    if (headers.length !== 38) {
      throw new Error("Unexpected number of headers. Please check the headers array.");
    }

    var nextRow = 4;

    var newRow = headers.map(function (header) {
      var paramValue = e.parameter[header];
      console.log(e.parameter[header]);
      return paramValue !== undefined ? paramValue : '';
    });

    sheet.getRange(nextRow, 7, 1, 3).setValues([newRow]);

    console.log(sheet.getRange(nextRow, 7, 1, 3))
    var submittedDate = e.parameter.selectedDate;
    sheet.getRange(2, 7, 1, 1).setValues([submittedDate]);

    console.log(submittedDate);
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'Success', 'row': nextRow, 'Date': submittedDate }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    Logger.log("Error: " + e.message + "\nStack trace: " + e.stack);
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function findCellAddressByDate(targetDate) {
  var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  var sheet = doc.getSheetByName(sheetName)
  var dates = sheet.getRange("F:F").getValues(); // Assuming your dates are in column F

  for (var i = 0; i < dates.length; i++) {
    if (dates[i][0] && dates[i][0] instanceof Date && dates[i][0].toDateString() === targetDate.toDateString()) {
      var row = i + 1;
      var column = 6; // Column F is the 6th column
      var cellAddress = sheet.getRange(row, column).getA1Notation();
      return cellAddress;
    }
  }
  return "Date not found in column F";
}
