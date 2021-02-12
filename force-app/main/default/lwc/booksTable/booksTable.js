import { LightningElement } from 'lwc';

const columns = [
    { 
        label: 'Title', 
        fieldName: 'title', 
        hideDefaultActions: true, 
        cellAttributes: {
            alignment: 'center'
        } 
    },
    { 
        label: 'Year', 
        fieldName: 'publishedDate', 
        hideDefaultActions: true,
        cellAttributes: {
            alignment: 'center'
        } 
    },
    { 
        label: 'Description', 
        fieldName: 'description', 
        hideDefaultActions: true,
        cellAttributes: {
            alignment: 'center'
        }
    },
];

export default class BooksTable extends LightningElement {
    columns = columns;
    data = [];
    query = 'salesforce';
}