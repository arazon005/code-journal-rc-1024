'use strict';
// event listeners and dom activities
const $imageInput = document.querySelector('.photo-url');
const $image = document.querySelector('img');
const $ul = document.querySelector('ul');
const $titleInput = document.querySelector('.title-input');
const $notesInput = document.querySelector('.notes-input');
const $entryHeader = document.querySelector('.entry-header');
if (!$imageInput) throw new Error('$imageInput query failed');
if (!$image) throw new Error('$image query failed');
if (!$ul) throw new Error('$ul query failed');
if (!$titleInput) throw new Error('$titleInput query failed');
if (!$notesInput) throw new Error('$notesInput query failed');
if (!$entryHeader) throw new Error('$entryHeader query failed');
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
  if (data.editing) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing.id === data.entries[i].id) {
        newEntry.id = data.editing.id;
        data.entries[i] = newEntry;
        const $listElements = document.querySelectorAll('li');
        for (let i = 0; i < $listElements.length; i++) {
          if (
            $listElements[i].getAttribute('data-entry-id') ===
            String(newEntry.id)
          ) {
            while ($listElements[i].firstChild) {
              $listElements[i].removeChild($listElements[i].firstChild);
            }
            $listElements[i].remove();
          }
        }
        $ul.prepend(renderEntry(data.entries[i]));
        $entryHeader.textContent = 'New Entry';
      }
    }
  } else {
    data.nextEntryId++;
    $ul.prepend(renderEntry(newEntry));
    data.entries.push(newEntry);
  }
  toggleNoEntries();
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  writeEntries();
  viewSwap('entries');
  $submit.reset();
});
const $entryList = document.querySelector('.entry-list');
if (!$entryList) throw new Error('$entryList query failed');
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  toggleNoEntries();
});
$ul.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  $entryHeader.textContent = 'Edit Entry';
  if ($eventTarget.getAttribute('id') === 'pencil-icon') {
    for (let i = 0; i < data.entries.length; i++) {
      if (
        $eventTarget.closest('li')?.getAttribute('data-entry-id') ===
        String(data.entries[i].id)
      ) {
        data.editing = {
          title: data.entries[i].title,
          url: data.entries[i].url,
          notes: data.entries[i].notes,
          id: data.entries[i].id,
        };
      }
    }
    if (data.editing) {
      $imageInput.setAttribute('value', data.editing.url);
      $image.setAttribute('src', data.editing.url);
      $titleInput.setAttribute('value', data.editing.title);
      $notesInput.textContent = data.editing.notes;
      viewSwap('entry-form');
    }
  }
});
const $li = document.querySelector('.no-entries');
if (!$li) throw new Error('$li query failed');
const $headerAnchor = document.querySelector('.header-anchor');
if (!$headerAnchor) throw new Error('$headerAnchor query failed');
const $newEntryAnchor = document.querySelector('.new-entry');
if (!$newEntryAnchor) throw new Error('$newEntryAnchor query failed');
$headerAnchor.addEventListener('click', () => {
  data.editing = null;
  viewSwap('entries');
});
$newEntryAnchor.addEventListener('click', () => {
  data.editing = null;
  $entryHeader.textContent = 'New Entry';
  $imageInput.setAttribute('value', '');
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  $titleInput.setAttribute('value', '');
  $notesInput.textContent = '';
  viewSwap('entry-form');
});
const $dataView = document.querySelectorAll('.view');
if (!$dataView) throw new Error('$dataView query failed');
// functions
function renderEntry(entry) {
  const $list = document.createElement('li');
  $list.setAttribute('data-entry-id', String(entry.id));
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
  const $pencilIcon = document.createElement('a');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil');
  $pencilIcon.setAttribute('id', 'pencil-icon');
  $title.appendChild($pencilIcon);
  $column2.appendChild($title);
  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $column2.appendChild($notes);
  $row.appendChild($column2);
  $list.appendChild($row);
  return $list;
}
function toggleNoEntries() {
  if (data.entries.length === 0) {
    $li.setAttribute('class', 'no-entries');
  } else {
    $li.setAttribute('class', 'no-entries hidden');
  }
}
function viewSwap(view) {
  console.log(data.editing);
  if (view === 'entries' || view === 'entry-form') {
    data.view = view;
    writeEntries();
  }
  for (let i = 0; i < $dataView.length; i++) {
    if (data.view === $dataView[i].getAttribute('data-view')) {
      $dataView[i].setAttribute('class', 'view');
    } else {
      $dataView[i].setAttribute('class', 'view hidden');
    }
  }
}
