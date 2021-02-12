const url = "https://www.googleapis.com/books/v1/volumes?langRestrict=en";

export default function fetchBooks(query){
    return fetch(`${url}&q=${query}`).then(response => response.json());
}