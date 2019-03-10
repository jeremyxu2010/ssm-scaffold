import _ from 'lodash'

export function noop(){}

export function isBlank(str) {
    return (!str || str.length === 0 || !str.trim());
}

// 比如对象更新，浅拷贝，注意此处返回的原始的mutable对象
export function updateObject(oldObj, newObj){
    return _.assign(oldObj, newObj);
}

// 比如对象更新，深拷贝，注意此处返回的原始的mutable对象
export function deepUpdateObject(oldObj, newObj){
    return _.merge(oldObj, newObj);
}

export function isInteger(str) {
    return (!isNaN(str - parseInt( str || 0, 10 ))) && (/^[0-9]+$/.test(str));
}
