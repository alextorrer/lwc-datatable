import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchBooksHelper from './fetchBooksHelper.js';

const actions = [
    { label: 'Preview book', name: 'preview'}
]

const columns = [
    { 
        label: 'Title', 
        fieldName: 'title', 
        wrapText: true,
        initialWidth: 200
    },
    { 
        label: 'Description', 
        fieldName: 'description', 
        wrapText: true,
    },
    { 
        label: 'Authors', 
        fieldName: 'authors',
        initialWidth: 180,
        wrapText: true
    },
    { 
        label: 'Published', 
        fieldName: 'publishedDate', 
        hideDefaultActions: true,
        fixedWidth: 150,
    },
    
    {
        type: 'action',
        typeAttributes:{
            rowActions: actions,
            menuAlignment: 'auto'
        }
    }
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
                this.data = json.items.map(book => {
                   return {
                        authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
                        ...book.volumeInfo
                   }
                });
            }
            catch(err){
                this.showToast({
                    title: 'Error',
                    message: 'Ocurrió un error al cargar los libros',
                    variant: 'error'
                });
            }
        }
    }

    handleRowAction(event){
        const action = event.detail.action;
        const row = event.detail.row;
        switch(action.name){
            case 'preview':
                row.previewLink ? window.open(row.previewLink, '_blank') : this.showToast({
                    title: 'Preview unavailable',
                    message: 'This book does not have a preview link',
                    variant: 'warning'
                });
            break;
        }
    }

    showToast(options){
        const event = new ShowToastEvent({
            title: options.title,
            message: options.message,
            variant: options.variant || 'info'
        });
        this.dispatchEvent(event);
    }

}