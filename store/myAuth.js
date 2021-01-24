import http from "../repositories/Repository.js";

export const state = () => ({
    isLoggedIn: false,
    loggedInUser: {}
});

export const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
    setLoggedInUser(state, payload) {
        state.loggedInUser = payload;
    }
};

export const getters = {
    loggedInUser: state => {
        return state.loggedInUser
      }
}
export const actions = {
    login({ commit }, payload) {
       
            return new Promise((resolve, reject) => {
                http
                .post("login" , payload)
                .then( async (data) => {
                    const token = data.data.access_token
                    localStorage.setItem("token", token);
                    commit('setIsLoggedIn', true);
                    resolve(data);
                })
                .catch(e => {
                  localStorage.removeItem("token");
                  commit('setIsLoggedIn', false);
                  reject(e.response.data);
                })
              })
        
        
    },
    register(payload) 
    {
        console.log(payload)

        return new Promise((resolve, reject) => {
            http
            .post("register" , payload)
            .then( async (data) => {
               
                resolve(data);
            })
            .catch(e => {
                
                reject(e.response.data);
            })
          })
    },
    logout({ commit }, ) {
        console.log('logout')
        return new Promise((resolve) => {
            localStorage.removeItem('token')
            commit('setIsLoggedIn' , false)
            commit('setLoggedInUser' , {})
            resolve(true)
          })
    
    
},
    getUser({commit}) {
        return new Promise((resolve, reject) => {
            http
            .get("user")
            .then( async (data) => {
                commit('setIsLoggedIn', true);
                commit('setLoggedInUser', data.data);
                resolve(data.data);
            })
            .catch(e => {
              localStorage.removeItem("token");
              commit('setIsLoggedIn', false);
              commit('setLoggedInUser', {});
              reject(e.response.data);
            })
          })
    }
};
