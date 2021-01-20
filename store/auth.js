import axios from "../repositories/Repository.js";

export const state = () => ({
    isLoggedIn: false
});

export const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
};

export const actions = {
    login({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            axios
            .post("http://192.168.1.40:8000/api/login" , payload)
            .then( async (data) => {
             console.log(data)
              resolve(data);
            })
            .catch(e => {
              reject(e);
            })
          })
    },
    setAuthStatus({ commit, state }, payload) {
        commit('setIsLoggedIn', payload);
        const cookieParams = {
            isLoggedIn: state.isLoggedIn
        };

        this.$cookies.set('auth', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    }
};
