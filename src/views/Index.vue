<template>
<div>
    <input type="text" v-model="searchTerm" placeholder="Search" @input="debounceSearch"/>
    <table>
        <thead>
        <tr>
            <th>Company Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Emails</th>
            <th>Phones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="company in searchResults" :key="company.id">
            <td>{{company.companyName}}</td>
            <td>{{company.address}}</td>
            <td>{{company.city}}</td>
            <td>
                <ul>
                    <li v-for="email in company.emails" :key="email">
                       {{ email.value }}
                    </li>
                </ul>
            </td>
            <td>
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
        }, 500)

        const debouncedSearch = watch(searchTerm, search);

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