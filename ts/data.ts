/* eslint-disable @typescript-eslint/no-unused-vars */
interface Log {
  title: string;
  url: string;
  notes: string;
  id: number;
}
let tempID: number = 1;
const entryArray: Log[] = readLogs();
const data = {
  view: 'entry-form',
  entries: entryArray,
  editing: null,
  nextEntryId: tempID,
};
console.log(JSON.parse(JSON.stringify(data)));

function readLogs(): Log[] {
  if (localStorage.getItem('logs')) {
    const newLogs: Log[] = JSON.parse(localStorage.getItem('logs') as string);
    tempID = Number(JSON.parse(localStorage.getItem('id') as string));
    return newLogs;
  } else {
    return [];
  }
}

function writeLogs(): void {
  const logsJSON = JSON.stringify(data.entries);
  const idJSON = JSON.stringify(data.nextEntryId);
  localStorage.setItem('logs', logsJSON);
  localStorage.setItem('id', idJSON);
}
