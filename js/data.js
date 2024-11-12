'use strict';
let tempID = 1;
const entryArray = readLogs();
const data = {
  view: 'entry-form',
  entries: entryArray,
  editing: null,
  nextEntryId: tempID,
};
console.log(JSON.parse(JSON.stringify(data)));
function readLogs() {
  if (localStorage.getItem('logs')) {
    const newLogs = JSON.parse(localStorage.getItem('logs'));
    tempID = Number(JSON.parse(localStorage.getItem('id')));
    return newLogs;
  } else {
    return [];
  }
}
function writeLogs() {
  const logsJSON = JSON.stringify(data.entries);
  const idJSON = JSON.stringify(data.nextEntryId);
  localStorage.setItem('logs', logsJSON);
  localStorage.setItem('id', idJSON);
}
