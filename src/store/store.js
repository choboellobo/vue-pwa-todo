import Vuex from 'vuex'
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
// modules
import Wallet from './modules/wallet'

Vue.use(VueLocalStorage)
Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {Wallet},
    state: {
        user: JSON.parse(Vue.localStorage.get('user', null)),
        featureDiscovery: JSON.parse(Vue.localStorage.get('featureDiscovery', null))
    },
    getters: {
        getUserData(store) {
            return store.user
        },
        getFeatureDiscovery(store) {
            return store.featureDiscovery
        }
    },
    mutations: {
        setUserData(state, payload){
            if(payload) Vue.localStorage.set('user', JSON.stringify(payload));
            else Vue.localStorage.remove('user')
            state.user = payload
        },
        updateFeatureDiscovery(state, payload) {
            if(!state.featureDiscovery) state.featureDiscovery = {}
            Vue.set(state.featureDiscovery, payload.key , true )
            Vue.localStorage.set('featureDiscovery', JSON.stringify(state.featureDiscovery))
        }
    },

})
