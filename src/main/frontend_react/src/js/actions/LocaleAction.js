import {CHANGE_LOCALE} from "../constants/LocaleConstant";
import {createAction} from '../utils/CommonUtil'

export function changeLocale(){
    return function (dispatch, getState) {
        dispatch(createAction(CHANGE_LOCALE, {}));
    }
}