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
readEntries();

function readEntries(): void {
  if (localStorage.getItem('logs')) {
    const newData: Data = JSON.parse(localStorage.getItem('logs') as string);
    data = newData;
  }
}

function writeEntries(): void {
  const logsJSON = JSON.stringify(data);
  localStorage.setItem('logs', logsJSON);
}
