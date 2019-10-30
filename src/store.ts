import Vue from 'vue';
import Vuex from 'vuex';
import CompanyStatus from './Models/DataBase/CompanyStatus';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    AmoCrmBaseUrl: 'https://technovik.amocrm.ru/',
    AmoCrmUserLogin: 'v.arkhangelsky@technovik.ru',
    AmoCrmUserPassword: '62224bdf2a291f97c61524e5a91df09f56eba10d',
    CompanyStatuses: [],
    AllDeals: [],
  },
  mutations: {
    SET_COMPANY_STATUSES: (state, payload) => {
      state.CompanyStatuses = payload;
    },
    SET_ALL_DEALS: (state, payload) => {
      state.AllDeals = payload;
    },
  },
  actions: {
    
  },
  getters: {
    AmoCrmBaseUrl: state => {
      return state.AmoCrmBaseUrl;
    },
    AmoCrmUserLogin: state => {
      return state.AmoCrmUserLogin;
    },
    AmoCrmUserPassword: state => {
      return state.AmoCrmUserPassword;
    },
    CompanyStatuses: state => {
      return state.CompanyStatuses;
    },
    ALL_DEALS: state => {
      return state.AllDeals;
    },
    
  },
});
