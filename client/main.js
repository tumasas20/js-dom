import AlertComponent from "./components/alert-component.js";
import FilmFormComponent from "./components/film-form-component.js";
import FilmsTableComponent from "./components/films-table-component.js";
import ContainerComponent from "./components/container-component.js";
import FlexContainerComponent from "./components/flex-container-component.js";
import ApiService from "./services/api-service.js";

let filmsTableComponent;
let filmFormComponent;
let alertComponent;

let films;
let editedRowId = null;

const handleFilmDelete = async (id) => {
  try {
    await ApiService.deleteFilm(id);
    films = await ApiService.getFilms();
    filmsTableComponent.renderFilms(films, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleFilmCreate = async (filmProps) => {
  try {
    await ApiService.createFilm(filmProps);
    films = await ApiService.getFilms();
    filmsTableComponent.renderFilms(films, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleFilmUpdate = async (filmProps) => {
  try {
    await ApiService.updateFilm(editedRowId, filmProps);
    films = await ApiService.getFilms();
    editedRowId = null;
    filmFormComponent.disableEditing();
    filmsTableComponent.renderFilms(films, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleFilmEdit = (filmProps) => {
  if (editedRowId === filmProps.id) editedRowId = null;
  else editedRowId = filmProps.id;

  filmsTableComponent.renderFilms(films, editedRowId);
  if (editedRowId === null) {
    filmFormComponent.disableEditing();
    filmFormComponent.onSubmit = handleFilmCreate;
  } else {
    filmFormComponent.enableEditing(filmProps);
    filmFormComponent.onSubmit = handleFilmUpdate;
  }
}

(async function initialize() {
  const rootHtmlElement = document.querySelector('#root');
  const containerComponent = new ContainerComponent();
  alertComponent = new AlertComponent();
  containerComponent.addComponents(alertComponent);
  rootHtmlElement.append(containerComponent.htmlElement);
  try {
    films = await ApiService.getFilms();
    filmsTableComponent = new FilmsTableComponent({
      films,
      onDelete: handleFilmDelete,
      onEdit: handleFilmEdit,
    });
    filmFormComponent = new FilmFormComponent({
      onSubmit: handleFilmCreate,
    });
    const flexContainerComponent = new FlexContainerComponent();
    flexContainerComponent.addComponents(filmsTableComponent, filmFormComponent);
    containerComponent.addComponents(flexContainerComponent);
  } catch (error) {
    alertComponent.show(error.message);
  }
})();
