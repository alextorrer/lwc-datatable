const url = "https://www.googleapis.com/books/v1/volumes?langRestrict=en";

export default function fetchBooksHelper(query){
    return fetch(`${url}&q=${query}`);
}