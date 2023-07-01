import { createStore } from 'vuex';
import addressBookModule from "@/store/modules/addressBook";

export default createStore({
    modules: {
        addressBook: addressBookModule
    }
})