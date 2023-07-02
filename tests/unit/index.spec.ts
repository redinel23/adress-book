import { mount } from '@vue/test-utils';
import Index from '@/views/Index.vue';
import { createStore } from 'vuex';

describe('Index', () => {
    it('displays search results correctly', () => {
        const searchResults = [
            {
                id: 1,
                companyName: 'Company A',
                address: '123 Main St',
                city: 'City A',
                emails: ['email1@example.com', 'email2@example.com'],
                phones: ['1234567890', '9876543210'],
            },
            {
                id: 2,
                companyName: 'Company B',
                address: '456 Elm St',
                city: 'City B',
                emails: ['email3@example.com'],
                phones: ['9876543210'],
            },
            {
                id: 3,
                companyName: 'Company C',
                address: '789 Oak St',
                city: 'City C',
                emails: ['def'],
                phones: ['5555555555'],
            },
             {
                 id: 4,
                 companyName: 'Company D',
                 address: '321 Pine St',
                 city: 'City D',
                 emails: ['abc'],
                 phones: ['5151'],
             },
        ];

        const store = createStore({
            modules: {
                addressBook: {
                    namespaced: true,
                    state: {
                        searchResults,
                    },
                },
            },
        });

        const wrapper = mount(Index, {
            global: {
                plugins: [store],
            },
        });

        const tableRows = wrapper.findAll('tbody tr');
        expect(tableRows.length).toBe(searchResults.length);

        tableRows.forEach((row, index) => {
            const company = searchResults[index];
            const companyColumns = row.findAll('td');

            expect(companyColumns[0].text()).toBe(company.companyName);
            expect(companyColumns[1].text()).toBe(company.address);
            expect(companyColumns[2].text()).toBe(company.city);

            const emailListItems = companyColumns[3].findAll('li');
            expect(emailListItems.length).toBe(company.emails.length);

            const phoneListItems = companyColumns[4].findAll('li');
            expect(phoneListItems.length).toBe(company.phones.length);
        });
    });
});
