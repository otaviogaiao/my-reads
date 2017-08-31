
const api = "https://reactnd-books-api.udacity.com"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)

//Since I don't have this method on the API, I use localStorage to simulate my own.
export const getAllShelves = () => {
  return new Promise((resolve, reject) => {
    let shelves;
    if(localStorage.shelves){
      shelves = JSON.parse(localStorage.shelves)
    }else {
      shelves = []
    }
    shelves = Array.from(new Set(["read", "wantToRead", "currentlyReading"].concat(shelves)));
    localStorage.shelves = JSON.stringify(shelves);//it removes duplicates
    resolve(shelves);
  })
}

//Add new shelf. It returns true if success. Otherwise it returns false
export const addShelf = (shelf) => {
  return new Promise((resolve, reject) => {
    try{
      let shelves;
      if(localStorage.shelves){
        shelves = JSON.parse(localStorage.shelves)
      }else {
        shelves = []
      }
      if(shelves.some((element) => {return element.toLowerCase() === shelf.toLowerCase()})){
        reject("Shelf already exists.")
      }
      if(!shelf || typeof shelf !== "string" || shelf.length === 0){
        reject("You must supply a non empty string as the shelf.")
      }
      localStorage.shelves = JSON.stringify(shelves.concat([shelf]));
      resolve(true)
    }catch(err){
      reject(err)
    }
  });
}

export const SyncBooksLocal = (books) => {
  
}
