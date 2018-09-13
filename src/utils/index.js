const baseURL = "https://swapi.co/api/"

export const getPerson = (person) => {
  return fetch(person, {
    method: 'GET',
  }).then(res => res.json())
}

export const getFilm = (film) => {
  return fetch(film, {
    method: 'GET',
  }).then(res => res.json())
}
