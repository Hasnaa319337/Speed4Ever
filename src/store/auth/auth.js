
export default {
    namespaced: true,

    state:{
        userToken: localStorage.getItem('speed_app_user_token'),
        userName: localStorage.getItem('speed_app_user_name'),
        userEmail: localStorage.getItem('speed_app_user_email'),
    },

    
    actions:{},
    
    mutations:{
        // Start:: Set Current User Data Mutation
        setCurrentUserData(state, payload) {
            if(payload.token) {
                state.userToken = payload.token;
                localStorage.setItem("speed_app_user_token", payload.token);
            }
            
            if(payload.name) {
                state.userName = payload.name;
                localStorage.setItem("speed_app_user_name", payload.name);
            }
            
            if(payload.email) {
                state.userEmail = payload.email;
                localStorage.setItem("speed_app_user_email", payload.email);
            }
        },
        // End:: Set Current User Data Mutation

        //start:: Delete Current User
        Logout(state){
            state.userToken = null;
            state.userName = null;
            state.userEmail = null;
            localStorage.removeItem("speed_app_user_token"),
            localStorage.removeItem("speed_app_user_name"),
            localStorage.removeItem("speed_app_user_email")
            
        },

        //End:: Delete Current User
    },

    getters:{
        // Start:: Current User Data Getter
        currentUser(state) {
            return {
                token: state.userToken,
                userName: state.userName,
                email: state.userEmail,
            }
        },
        // End:: Current User Data Getter

        //Start:: userToken Getter
        userToken(state){
            return state.userToken
        }
        //End:: userToken Getter
    },
}

