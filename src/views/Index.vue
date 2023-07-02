<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div>
                <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Search For Companies</label>
                <div class="relative mt-2 flex items-center">
                    <input type="text"
                           v-model="searchTerm"
                           @input="debouncedSearch"
                           name="search"
                           id="search"
                           class="block w-full rounded-md border-0 py-1.5 pr-14 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Company Name</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">City</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Emails</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phones</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white">
                        <tr v-for="company in searchResults" :key="company.id" class="even:bg-gray-50">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{{ company.companyName }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ company.address }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ company.city }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <ul>
                                    <li v-for="email in company.emails" :key="email">
                                        {{ email.value }}
                                    </li>
                                </ul>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <ul>
                                    <li v-for="phone in company.phones" :key="phone">
                                        {{ phone.value }}
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { debounce } from 'lodash';
import { useStore } from "vuex";
import {computed, defineComponent, ref, watch} from "vue";

export default  defineComponent({
    name:'Index',
    setup() {
        const store = useStore();
        const searchTerm = ref('');

        const search = debounce(() => {
            store.commit('addressBook/setSearchTerm', searchTerm.value);
            store.dispatch('addressBook/searchCompanies');
        }, 800)

        const debouncedSearch = debounce(() => {
            search()
        }, 800);

        const searchResults = computed(() => {
            return store.state.addressBook.searchResults;
        });

        return {
            searchTerm,
            searchResults,
            debouncedSearch,
        }
    }
})
</script>