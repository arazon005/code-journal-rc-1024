'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
readEntries();
function readEntries() {
  if (localStorage.getItem('logs')) {
    const newData = JSON.parse(localStorage.getItem('logs'));
    data = newData;
  }
}
function writeEntries() {
  const logsJSON = JSON.stringify(data);
  localStorage.setItem('logs', logsJSON);
}
