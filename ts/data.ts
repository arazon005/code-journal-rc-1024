/* eslint-disable @typescript-eslint/no-unused-vars */
interface Entry {
  title: string;
  url: string;
  notes: string;
  id: number;
}
interface Data {
  view: string;
  entries: Entry[];
  editing: null;
  nextEntryId: number;
}
let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
readLogs();
console.log(JSON.parse(JSON.stringify(data)));

function readLogs(): void {
  if (localStorage.getItem('logs')) {
    const newData: Data = JSON.parse(localStorage.getItem('logs') as string);
    data = newData;
  }
}

function writeLogs(): void {
  const logsJSON = JSON.stringify(data);
  localStorage.setItem('logs', logsJSON);
}
