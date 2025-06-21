function myFunction() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('stocks_coefs');
  let range = sheet.getDataRange();
  let rangeWithoutHeader = range.offset(1, 0, range.getNumRows() - 1, range.getNumColumns());
  let columnToSort = 4;
  rangeWithoutHeader.sort( { column : columnToSort, ascending: true } );
}
