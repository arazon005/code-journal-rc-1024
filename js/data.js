'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
readLogs();
console.log(JSON.parse(JSON.stringify(data)));
function readLogs() {
  if (localStorage.getItem('logs')) {
    const newData = JSON.parse(localStorage.getItem('logs'));
    data = newData;
  }
}
function writeLogs() {
  const logsJSON = JSON.stringify(data);
  localStorage.setItem('logs', logsJSON);
}
