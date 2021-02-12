import { LightningElement } from 'lwc';
import fetchBooksHelper from './fetchBooksHelper.js';

const columns = [
    { 
        label: 'Title', 
        fieldName: 'title', 
        wrapText: true,
        initialWidth: 300
    },
    { 
        label: 'Description', 
        fieldName: 'description', 
        wrapText: true,
    },
    { 
        label: 'Published', 
        fieldName: 'publishedDate', 
        hideDefaultActions: true,
        fixedWidth: 150,
    },
];

export default class BooksTable extends LightningElement {
    columns = columns;
    data = [];
    query = '';

    async handleQueryChange(event){
        this.query = event.target.value;
        if(this.query){
            try{
                const response = await fetchBooksHelper(this.query);
                const json = await response.json();
                this.data = json.items.map(book => book.volumeInfo);
            }
            catch(err){
                console.error(err);
            }
        }
    }
}