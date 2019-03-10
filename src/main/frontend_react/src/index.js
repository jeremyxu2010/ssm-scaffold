import 'bootstrap/dist/css/bootstrap.css';
import './css/antd.css';
import './css/sb-admin-2.css';

import React from 'react'
import {render} from 'react-dom'
import {Provider, connect} from 'react-redux'
import {Router, IndexRoute, Route, browserHistory} from 'react-router'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {default as reduxThunkMiddleware} from 'redux-thunk'

import {UserReducer as userState} from './js/reducers/UserReducer.js'
import {I18nReducer as i18nState} from './js/reducers/I18nReducer.js'
const rootReducer = combineReducers({
    userState,
    i18nState
});
//尝试使用预加载的状态
let APP_PRELOADED_STATE = window.APP_PRELOADED_STATE || {};
const store = createStore(rootReducer, APP_PRELOADED_STATE, applyMiddleware(reduxThunkMiddleware));

//界面国际化
import {IntlProvider, addLocaleData} from 'react-intl'
import intlZH from 'react-intl/locale-data/zh'
import intlEN from 'react-intl/locale-data/en'
addLocaleData([...intlZH, ...intlEN]);
import en_US from './js/i18n/en_US'
import zh_CN from './js/i18n/zh_CN'
const SUPPORTED_LOCALES = {
    'zh': zh_CN,
    'en': en_US
};

import IndexApp from './js/components/IndexApp'
import UserComponent from './js/components/UserComponent'
import WelcomeComponent from './js/components/WelcomeComponent'

const routes = (
<Router history={browserHistory}>
    <Route path="/" component={IndexApp}>
        <IndexRoute component={WelcomeComponent}/>
        <Route path="user" component={UserComponent}/>
    </Route>
</Router>
);

class RootComp extends React.Component {
    render(){
        return (
            <IntlProvider locale={this.props.locale} messages={this.props.messages}>
                {routes}
            </IntlProvider>
        )
    }
}

const ROOT = connect(state => (
    {
        locale: state.i18nState.locale,
        messages: SUPPORTED_LOCALES[state.i18nState.locale]
    }
))(RootComp);

//如果组件需要读取store里的状态或需要触发action，则需要用decorator方式注入必要的属性
render(
  <Provider store={store}>
      <ROOT/>
  </Provider>,
  document.getElementById('root')
);



