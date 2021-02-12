export default function mapBooks(books = []){
    return books.map(book => {
        return {
             ...book.volumeInfo,
             authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'
        }
     });
}