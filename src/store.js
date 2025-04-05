import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const storeData = {
    state: {
        score: sessionStorage.getItem('current-score') || 0
    }
};

const store = new Vuex.Store(storeData);

export default store;
