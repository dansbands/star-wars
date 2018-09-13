const baseURL = "https://swapi.co/api/"

export const getPerson = (person) => {
  console.log('gettingPerson', person);
  return fetch(person.url, {
    method: 'GET',
  }).then(res => res.json())
  .catch((err) => {
    console.log('error', err);
      // return findPerson(person)
   })
}

export const getFilm = (film) => {
  return fetch(film, {
    method: 'GET',
  }).then(res => res.json())
}

// export const findPerson = (person) => {
//   return fetch(`${baseURL}people/?search=${person.name}`, {
//     method: 'GET',
//   })
//   // .then(console.log)
//   .then(res => res.json())
//   .then(data => data.results[0])
// }
