class FilmFormComponent {
  htmlElement;
  onSubmit;
  titleInput;
  yearInput;
  scarryInput;
  formNameElement;
  submitButton;

  constructor({ onSubmit }) {
    this.htmlElement = document.createElement('form');
    this.htmlElement.className = 'shadow p-3';
    this.htmlElement.innerHTML = `
      <h2 class="h5 text-center">Create Film</h2>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" name="title">
      </div>
      <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input type="number" class="form-control" id="year" name="year">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="scarry" name="scarry">
        <label class="form-check-label" for="scarry">Scarry</label>
      </div>
      <button type="submit" class="btn btn-success w-100">Create film</button>`;
    this.onSubmit = onSubmit;
    this.titleInput = this.htmlElement.querySelector('[name=title]');
    this.yearInput = this.htmlElement.querySelector('[name=year]');
    this.scarryInput = this.htmlElement.querySelector('[name=scarry]');
    this.formNameElement = this.htmlElement.querySelector('h2');
    this.submitButton = this.htmlElement.querySelector('button');

    this.htmlElement.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = {
      title: formData.get('title'),
      year: formData.get('year'),
      scarry: Boolean(formData.get('scarry')),
    }

    this.onSubmit(values);

    event.target.reset();
  }

  enableEditing = ({ title, year, scarry }) => {
    this.titleInput.value = title;
    this.yearInput.value = year;
    this.scarryInput.checked = scarry;
    this.formNameElement.innerText = 'Update Film';
    this.submitButton.innerText = 'Update Film';
    this.submitButton.className = 'btn btn-warning w-100';
  }

  disableEditing = () => {
    this.htmlElement.reset();
    this.formNameElement.innerText = 'Create Film';
    this.submitButton.innerText = 'Update Film';
    this.submitButton.className = 'btn btn-success w-100';
  }
}

export default FilmFormComponent;
