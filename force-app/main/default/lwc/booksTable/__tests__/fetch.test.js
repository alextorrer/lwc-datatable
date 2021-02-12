import fetchBooks from '../util/fetchBooks';

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => Promise.resolve({ kind: 'books#volumes' })
    });
});

beforeEach(() => {
    fetch.mockClear();
});

describe('fetch-books-unit-test', () => {
    it('contains items', async () => {
        const json = await fetchBooks('salesforce');
        await expect(json.kind).toBe('books#volumes');
    });
});