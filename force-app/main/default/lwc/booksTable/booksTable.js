import { LightningElement } from 'lwc';
import fetchBooksHelper from './fetchBooksHelper.js';
import { showMessage } from 'c/showMessage';

const actions = [
    { label: 'Preview book', name: 'preview'}
]

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
        label: 'Authors', 
        fieldName: 'authors',
        initialWidth: 200,
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
                this.data = response.items.map(book => {
                   return {
                        authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
                        ...book.volumeInfo
                   }
                });
            }
            catch(err){
                showMessage({
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
                row.previewLink ? window.open(row.previewLink, '_blank') : showMessage({
                    title: 'Preview unavailable',
                    message: 'This book does not have a preview link',
                    variant: 'warning'
                });
            break;
        }
    }

}