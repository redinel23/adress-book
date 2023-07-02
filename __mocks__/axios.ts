import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('https://api.example.com/search').reply(200, [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
]);

export default mock;
