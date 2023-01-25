import { createStore } from 'vuex'
import AuthModules from "./auth/auth.js";
import axios from 'axios';
import router from '@/router/index.js';
export default createStore({
  modules: {
    AuthModules
  },
  state: {
    results:[],
    pageLoading: false,
    filterdProducts: []
 
  },
  getters: {
    pageLoading(state) {
      return state.pageLoading
    },
  
  },
  mutations: {
    pageLoading(state, payload) {
      state.pageLoading = payload
    },
    searchForm(state,payload){
      axios({
        method: "GET",
        url: "filter",
        params: {
          keyword: payload,
     
        },
      })
        .then((res) => {
          state.results = res.data.data;
          router.push('/search-result')
   
        
        })
        .catch((error) => {
          console.log(error);
        });
    
    },
    SET_TOKEN(state,token){
      state.token=token
    }
  },
  actions: {
    searchForm(context,payload){
      context.commit('searchForm',payload)   
    },
  }

})
