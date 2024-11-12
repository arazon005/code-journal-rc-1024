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
  const newLog = {
    title: $formElements.title.value,
    url: $formElements.photo.value,
    notes: $formElements.notes.value,
    id: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.push(newLog);
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  writeLogs();
  $submit.reset();
});
// functions
function renderEntry(entry) {
  const $list = document.createElement('li');
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  const $column1 = document.createElement('div');
  $column1.setAttribute('class', 'column-half');
  $column1.textContent = `<img src=${entry.url}/>`;
  $row.appendChild($column1);
  const $column2 = document.createElement('div');
  $column2.setAttribute('class', 'column-half');
  $column2.textContent = `<h2>${entry.title}</h2><p>${entry.notes}</p`;
  $row.appendChild($column2);
  $list.appendChild($row);
  return $list;
}
