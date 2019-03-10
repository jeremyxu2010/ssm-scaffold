import Vue from 'vue'
import {MUTATION_CHANGE_LOCALE} from '../constants/LocaleConstant'

// mutation functions
let mutationChangeLocale = function(state){
    if(state.locale === 'zh_CN'){
        state.locale = 'en_US';
    } else if(state.locale === 'en_US'){
        state.locale = 'zh_CN';
    }
};

// action functions
let actionChangeLocale = function({commit, state}){
    commit(MUTATION_CHANGE_LOCALE);
    Vue.config.lang = state.locale;
};

const I18nStore = {
    state: {
        locale: 'zh_CN'
    },
    mutations: {
        MUTATION_CHANGE_LOCALE : mutationChangeLocale
    },
    actions: {
        ACTION_CHANGE_LOCALE : actionChangeLocale
    }
};

export default I18nStore;
