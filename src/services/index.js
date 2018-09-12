const baseURL = "/swapi.co/api/"

export const getPerson = (person) => {
  return fetch(`${baseURL}/people/person`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'appliction/json'
    }
  }).then(console.log)
}
