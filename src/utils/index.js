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

// The directions explicitly say to only use the endpoints in characters.json
// If we wanted to fix this, and only had those endpoints available,
// we could use the api's query endpoint, as shown below,
// and call it in the error handling, as shown above, commented out.
// This would alleviate any pain points for the user, who knows that Obi Wan appeared in Episodes I-VI

// export const findPerson = (person) => {
//   return fetch(`${baseURL}people/?search=${person.name}`, {
//     method: 'GET',
//   })
//   // .then(console.log)
//   .then(res => res.json())
//   .then(data => data.results[0])
// }
