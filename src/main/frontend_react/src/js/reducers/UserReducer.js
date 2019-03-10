import {createReducer, updateObject} from '../utils/CommonUtil';

const initialState = {
    total: 0,
    users: [],
    errMsg: '',
    loading: false
};

const loadUsers = function(state, action) {
    if(action.payload.done){
        if(action.payload.success){
            return updateObject(state, {
                errMsg: '',
                users: action.payload.users,
                total: action.payload.total,
                loading: false
            });
        } else {
            return updateObject(state, {
                errMsg: action.payload.errMsg,
                total: 0,
                loading: false
            });
        }
    } else {
        return updateObject(state, {
            errMsg: '',
            total: 0,
            loading: true
        });
    }
};

const addUser = function(state, action) {
    if(action.payload.done){
        if(action.payload.success){
            return updateObject(state, {
                errMsg: '',
            });
        } else {
            return updateObject(state, {
                errMsg: action.payload.errMsg,
            });
        }
    } else {
        return updateObject(state, {
            errMsg: '',
        });
    }
};

const ACTION_HANDLERS = {
    LOAD_USERS: loadUsers,
    ADD_USER: addUser
};

export const UserReducer = createReducer(initialState, ACTION_HANDLERS);
