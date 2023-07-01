import { Module } from 'vuex';
import axios from 'axios';
import { API_ENDPOINT, API_KEY } from "@/config/apiConfig";

interface Company {
    id: number;
    companyName: string;
    address: string;
    city: string;
    emails: string[];
    phones: string[];
}

interface AddressBookState {
    searchTerm: string;
    searchResults: Company[];
}

const addressBookModule: Module<AddressBookState, any> = {
    namespaced: true,
    state: {
        searchTerm: '',
        searchResults: [],
    },
    mutations: {
        setSearchTerm(state: AddressBookState, searchTerm: string) {
            state.searchTerm = searchTerm;
        },
        setSearchResults(state: AddressBookState, searchResults: Company[]) {
            state.searchResults = searchResults
        }
    },
    actions: {
        async searchCompanies({commit, state}) {
            try {
                const response = await axios.get(`${API_ENDPOINT}?filter=contains(companyName,'${state.searchTerm}')&top=10&select=id,companyName,address,city,emails,phones`, {
                    headers: {
                        apikey: API_KEY
                    }
                });

                const searchResults: Company[] = response.data
                commit('setSearchResults', searchResults);
            }catch (error){
                console.error('Error searching companies', error)
            }
        }
    }
};

export default addressBookModule;