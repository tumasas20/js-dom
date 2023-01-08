const serverAddress = 'http://localhost:3000';

const getFilms = async () => {
  const response = await fetch(`${serverAddress}/films`);
  const films = await response.json();

  return films;
}

const deleteFilm = async (id) => {
  const response = await fetch(`${serverAddress}/films/${id}`, {
    method: 'DELETE'
  });
  const films = await response.json();

  return films;
}

const createFilm = async (filmProps) => {
  const response = await fetch(`${serverAddress}/films`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(filmProps)
  });
  const films = await response.json();

  return films;
}

const updateFilm = async (id, filmProps) => {
  const response = await fetch(`${serverAddress}/films/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(filmProps)
  });
  const films = await response.json();

  return films;
}

const ApiService = {
  getFilms,
  deleteFilm,
  createFilm,
  updateFilm,
};

export default ApiService;
