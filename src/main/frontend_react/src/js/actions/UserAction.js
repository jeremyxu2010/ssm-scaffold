import axios from 'axios'

import {LOAD_USERS, ADD_USER} from "../constants/UserConstant";
import {createAction} from "../utils/CommonUtil";

export function addUser(name, age, address) {
    return function (dispatch, getState) {
        return axios.post('/api/user/add', {
            name: name,
            age: age,
            address: address
        }).then(function (resp) {
            if (!resp.data.success) {
                dispatch(createAction(ADD_USER,
                    {
                        done: true,
                        success: false,
                        errMsg: resp.data.errMsg
                    }
                ));
            }
        }).catch(function (error) {
            window.console.error(error);
            dispatch(createAction(ADD_USER,
                {
                    done: true,
                    success: false,
                    errMsg: error.toString()
                }
            ));
        });
    }
}

export function loadUsers(page, pageSize, filters = {}) {
    return function (dispatch, getState) {
        dispatch(createAction(LOAD_USERS,
            {
                done: false
            }
        ));
        return axios.post('/api/user/search', filters, {
            params: {
                page: page,
                pageSize: pageSize
            }
        }).then(function (resp) {
            if (resp.data.success) {
                dispatch(createAction(LOAD_USERS,
                    {
                        done: true,
                        success: true,
                        users: resp.data.data.users,
                        total: resp.data.data.total
                    }
                ));
            } else {
                dispatch(createAction(LOAD_USERS,
                    {
                        done: true,
                        success: false,
                        errMsg: resp.data.errMsg
                    }
                ));
            }
        }).catch(function (error) {
            window.console.error(error);
            dispatch(createAction(LOAD_USERS,
                {
                    done: true,
                    success: false,
                    errMsg: error.toString()
                }
            ));
        });
    };
}


