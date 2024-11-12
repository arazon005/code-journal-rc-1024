'use strict';
// event listeners and dom activities
const $imageInput = document.querySelector('.photo-url');
const $image = document.querySelector('img');
if (!$imageInput) throw new Error('$imageInput query failed');
if (!$image) throw new Error('$image query failed');
$imageInput.addEventListener('input', (event) => {
  const input = event.target;
  if (input.value === '') {
    $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  } else {
    $image.setAttribute('src', input.value);
  }
});
const $submit = document.querySelector('#entry');
if (!$submit) throw new Error('$submit query failed');
$submit.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $submit.elements;
  const newEntry = {
    title: $formElements.title.value,
    url: $formElements.photo.value,
    notes: $formElements.notes.value,
    id: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.push(newEntry);
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  writeLogs();
  $submit.reset();
});
const $entryList = document.querySelector('.entry-list');
if (!$entryList) throw new Error('$entryList query failed');
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
  toggleNoEntries();
});
const $li = document.querySelector('.no-entries');
if (!$li) throw new Error('$ul query failed');
const $headerAnchor = document.querySelector('.header-anchor');
if (!$headerAnchor) throw new Error('$anchor query failed');
const $dataView = document.querySelectorAll('.view');
if (!$dataView) throw new Error('$dataView query failed');
$headerAnchor.addEventListener('click', () => {
  viewSwap('entries');
});
// functions
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderEntry(entry) {
  const $list = document.createElement('li');
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  const $column1 = document.createElement('div');
  $column1.setAttribute('class', 'column-half');
  const $image = document.createElement('img');
  $image.setAttribute('src', entry.url);
  $column1.appendChild($image);
  $row.appendChild($column1);
  const $column2 = document.createElement('div');
  $column2.setAttribute('class', 'column-half');
  const $title = document.createElement('h2');
  $title.textContent = entry.title;
  $column2.appendChild($title);
  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $column2.appendChild($notes);
  $row.appendChild($column2);
  $list.appendChild($row);
  return $list;
}
function toggleNoEntries() {
  if (!data.entries) {
    $li.setAttribute('class', 'no-entries');
  } else {
    $li.setAttribute('class', 'no-entries hidden');
  }
}
function viewSwap(view) {
  if (view === 'entries' || view === 'entry-form') {
    data.view = view;
  }
  for (let i = 0; i < $dataView.length; i++) {
    if (data.view === $dataView[i].getAttribute('data-view')) {
      $dataView[i].setAttribute('class', 'view');
    } else {
      $dataView[i].setAttribute('class', 'view hidden');
    }
  }
}
