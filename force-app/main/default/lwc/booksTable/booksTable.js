import { LightningElement } from 'lwc';
import { showMessage } from 'c/showMessage';
import fetchBooks from './util/fetchBooks';
import mapBooks from './util/mapBooks';

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
        try{
            const response = await fetchBooks(this.query);
            this.data = mapBooks(response.items);
        }
        catch(err){
            showMessage(this, {
                title: 'Error',
                message: 'The books could not be loaded',
                variant: 'error'
            });
        }
    }

    handleRowAction(event){
        const action = event.detail.action;
        const row = event.detail.row;
        switch(action.name){
            case 'preview':
                row.previewLink ? window.open(row.previewLink, '_blank') : showMessage(this, {
                    title: 'Preview unavailable',
                    message: 'This book does not have a preview link',
                    variant: 'warning'
                });
            break;
        }
    }

}