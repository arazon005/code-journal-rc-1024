interface Log {
  title: string;
  url: string;
  notes: string;
  id: number;
}
const entryArray: Log[] = [];
const data = {
  view: 'entry-form',
  entries: entryArray,
  editing: null,
  nextEntryId: 1,
};
