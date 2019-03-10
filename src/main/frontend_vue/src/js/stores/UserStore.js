import axios from 'axios'
import {MUTATION_LOAD_USERS_REQUEST, MUTATION_LOAD_USERS_SUCCESS, MUTATION_LOAD_USERS_FAILED, MUTATION_ADD_USER_FAILED} from '../constants/UserConstant'

// mutation functions
const mutationLoadUsersRequest = function(state){
    state.errMsg = '';
};
const mutationLoadUsersSuccess = function(state, {users, total}){
    state.errMsg='';
    state.users=users;
    state.total=total;
};
const mutationLoadUsersFailed = function(state, {errMsg}){
    state.errMsg = errMsg;
    state.total = 0;
};
const mutationAddUserSuccess = function(state){
    state.errMsg = '';
};
const mutationAddUserFailed = function (state, {errMsg}) {
    state.errMsg = errMsg;
};

// action functions
const actionAddUser = function ({commit, dispatch}, {name, age, address}) {
    return axios.post('/api/user/add', {
        name: name,
        age: age,
        address: address
    }).then(function (resp) {
        if (!resp.data.success) {
            commit(MUTATION_ADD_USER_FAILED, {
                errMsg: resp.data.errMsg
            });
        }
    }).catch(function (error) {
        window.console.error(error);
        commit(MUTATION_ADD_USER_FAILED, {
            errMsg: error.toString()
        });
    });
};
const actionLoadUsers = function ({commit}, {page, pageSize, filters={}}) {
    commit(MUTATION_LOAD_USERS_REQUEST);
    return axios.post('/api/user/search', filters, {
        params: {
            page: page,
            pageSize: pageSize
        }
    }).then(function (resp) {
        if (resp.data.success) {
            commit(MUTATION_LOAD_USERS_SUCCESS, {
                users: resp.data.data.users,
                total: resp.data.data.total
            });
        } else {
            commit(MUTATION_LOAD_USERS_FAILED, {
                errMsg: resp.data.errMsg
            });
        }
    }).catch(function (error) {
        window.console.error(error);
        commit(MUTATION_LOAD_USERS_FAILED, {
            errMsg: error.toString()
        });
    });
};

const UserStore = {
    state: {
        total: 0,
        users: [],
        errMsg: ''
    },
    mutations: {
        MUTATION_LOAD_USERS_REQUEST : mutationLoadUsersRequest,
        MUTATION_LOAD_USERS_SUCCESS : mutationLoadUsersSuccess,
        MUTATION_LOAD_USERS_FAILED : mutationLoadUsersFailed,
        MUTATION_ADD_USER_SUCCESS : mutationAddUserSuccess,
        MUTATION_ADD_USER_FAILED : mutationAddUserFailed
    },
    actions : {
        ACTION_ADD_USER : actionAddUser,
        ACTION_LOAD_USERS : actionLoadUsers
    }
};

export default UserStore;
