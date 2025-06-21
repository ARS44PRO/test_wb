function myFunction() {
  function onEdit(e) {
  let range = SpreadsheetApp.getActiveSpreadsheet().getDataRange();
  let columnToSort = 1;
  let sheet = e.range.getSheet();
  range.sort( { column : columnToSort, ascending: true } );
}
}
