import { Module } from 'vuex';
import axios, { CancelTokenSource } from 'axios';
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
    cancelTokenSource?: CancelTokenSource;
}

const addressBookModule: Module<AddressBookState, any> = {
    namespaced: true,
    state: {
        searchTerm: '',
        searchResults: [],
        cancelTokenSource: undefined,
    },
    mutations: {
        setSearchTerm(state: AddressBookState, searchTerm: string) {
            state.searchTerm = searchTerm;
        },
        setSearchResults(state: AddressBookState, searchResults: Company[]) {
            state.searchResults = searchResults
        },
        setCancelTokenSource(state, cancelTokenSource) {
            state.cancelTokenSource = cancelTokenSource;
        },
    },
    actions: {
        async searchCompanies({commit, state}) {
            if (state.cancelTokenSource) {
                state.cancelTokenSource.cancel();
            }
            const cancelToken = axios.CancelToken;
            const source = cancelToken.source();
            commit('setCancelTokenSource', source);
            try {
                const response = await axios.get(`${API_ENDPOINT}?filter=contains(companyName,'${state.searchTerm}')&top=10&select=id,companyName,address,city,emails,phones`, {
                    headers: {
                        apikey: API_KEY
                    },
                    cancelToken: source.token,
                });

                const searchResults: Company[] = response.data
                commit('setSearchResults', searchResults);
            }catch (error){
                if (!axios.isCancel(error)){
                console.error('Error searching companies', error)
                }
            }
        }
    }
};

export default addressBookModule;