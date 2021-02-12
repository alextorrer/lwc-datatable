import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const showMessage = (page, options) => {
    const event = new ShowToastEvent({
        title: options.title,
        message: options.message,
        variant: options.variant
    });
    page.dispatchEvent(event);
}

export {showMessage};