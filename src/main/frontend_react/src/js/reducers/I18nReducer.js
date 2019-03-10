/*
 *
 *  I18nReducer.js         2017年01月25日 15:55:23
 *  @Copyright:Copyright © 2017 VIVO Communication Technology Co., Ltd. All rights reserved.
 *  @Company:Vivo----http://www.vivo.com.cn/
 *
 */

import {createReducer, updateObject} from '../utils/CommonUtil'

//import {CHANGE_LOCALE} from "../constants/LocaleConstant";

const initialState = {
    locale: 'zh'
};

const changeLocale = function(state, action) {
    if(state.locale === 'zh'){
        return updateObject(state, {
            locale: 'en'
        });
    } else if(state.locale === 'en'){
        return updateObject(state, {
            locale: 'zh'
        });
    } else {
        return state;
    }
};

const ACTION_HANDLERS = {
    CHANGE_LOCALE : changeLocale
};

export const I18nReducer = createReducer(initialState, ACTION_HANDLERS);

