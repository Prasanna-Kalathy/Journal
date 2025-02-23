function doGet(e) {
  const sheet = SpreadsheetApp.openById('1hq7L6vX-LK5IG5F1gcRcVEk9b4V-NPq9BeO-Lik8SwQ').getSheetByName('Routine');
  const number = e.parameter.number; // Get the number from the request parameter

  // Find the row with the given number
  const data = sheet.getRange('A2:G39').getValues();
  const row = data.find(row => row[0] == number);

  let result = { found: false };
  if (row) {
    result = { found: true, tasks: row[3], entry: row[4], taskType: row[5], screenVal: row[6]}; // Assuming column D is the 4th column (index 3)
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    var params = e.parameter;
    var number = params.timeslot;
    var selectedDate = params.datepicker; // Adjust according to your HTML form field names
    var text = params.text;
    var Category = params.Category;
    var ScreenTime = params.ScreenTime;

    // Get the spreadsheet by its ID
    var ss = SpreadsheetApp.openById('1hq7L6vX-LK5IG5F1gcRcVEk9b4V-NPq9BeO-Lik8SwQ');
    var sheet = ss.getSheetByName('JAN'); // Change to your sheet name

    // Find the column based on the dropdown number in range G2:AR2
    var headers = sheet.getRange("G2:AR2").getValues()[0]; // Assuming headers are in the second row
    var columnIndex = headers.indexOf(number);

    if (columnIndex >= 0) {
        // Calculate rowIndex based on selectedDate
        var rowIndex = (parseInt(selectedDate.substring(0, 2), 10))*3 + 1;

        // Write data to the spreadsheet
        sheet.getRange(rowIndex, columnIndex + 7).setValue(text); // Write text to the found column
        sheet.getRange(rowIndex + 1, columnIndex + 7).setValue(Category); // Write Category to the next row
        sheet.getRange(rowIndex + 2, columnIndex + 7).setValue(ScreenTime); // Write ScreenTime to the next row

        // Return success message
        return ContentService.createTextOutput(JSON.stringify({ result: 'Success', column: columnIndex + 7, row:rowIndex, slot: number, Date: selectedDate })).setMimeType(ContentService.MimeType.JSON);
    } else {
        // Return error message if column not found
        return ContentService.createTextOutput(JSON.stringify({ result: 'Error', message: 'Column not found for number ' + number })).setMimeType(ContentService.MimeType.JSON);
    }
}
