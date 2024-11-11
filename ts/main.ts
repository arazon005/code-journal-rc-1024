const $imageInput = document.querySelector('.photo-url');
const $image = document.querySelector('img');
if (!$imageInput) throw new Error('$imageInput query failed');
if (!$image) throw new Error('$image query failed');

$imageInput.addEventListener('input', (event) => {
  const input = event.target as HTMLInputElement;
  if (input.value === '') {
    $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  } else {
    $image.setAttribute('src', input.value);
  }
});

const $submit = document.querySelector('#entry') as HTMLFormElement;
if (!$submit) throw new Error('$submit query failed');
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLTextAreaElement;
}
$submit.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $submit.elements as FormElements;
  const newLog: Log = {
    title: $formElements.title.value,
    url: $formElements.photo.value,
    notes: $formElements.notes.value,
    id: data.nextEntryId - 1,
  };
  data.nextEntryId++;
  data.entries.push(newLog);
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  console.log(data.entries);
  $submit.reset();
});
