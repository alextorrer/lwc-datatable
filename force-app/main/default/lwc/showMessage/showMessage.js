import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const showMessage = (options) => {
    const event = new ShowToastEvent({
        title: options.title,
        message: options.message,
        variant: options.variant
    });
    this.dispatchEvent(event);
}

export {showMessage};