import 'bootstrap/dist/css/bootstrap.css'
import './css/sb-admin-2.css'
import 'element-ui/lib/theme-default/index.css'

import Vue from 'vue'
import Vuex from 'vuex'
import IndexApp from './js/components/IndexApp.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import ELENLocale from 'element-ui/lib/locale/lang/en'
import ELZHLocale from 'element-ui/lib/locale/lang/zh-CN'
import VueI18n from 'vue-i18n';

import UserComponent from './js/components/UserComponent.vue'
import WelcomeComponent from './js/components/WelcomeComponent.vue'

import I18nStore from './js/stores/I18nStore'
import UserStore from './js/stores/UserStore'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.use(Vuex);

import en_US from './js/i18n/en_US'
import zh_CN from './js/i18n/zh_CN'
import {updateObject} from './js/utils/CommonUtil'

Vue.locale('en_US', updateObject(ELENLocale, en_US));
Vue.locale('zh_CN', updateObject(ELZHLocale, zh_CN));

const store = new Vuex.Store({
    modules: {
        i18nStore: I18nStore,
        userStore: UserStore
    }
});

Vue.config.lang = store.state.i18nStore.locale;

const routes = [
    { path: '/', component: WelcomeComponent },
    { path: '/user', component: UserComponent }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

const app = new Vue({
    router,
    store,
    render: h => h(IndexApp)
}).$mount('#root');


