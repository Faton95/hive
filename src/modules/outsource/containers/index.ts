import {injectReducers} from "etc/reducers";

export const getOutSourceListContainer = store =>
  import(/* webpackChunkName: "outsource" */ '../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "outsource" */ './OutsourceListContainer'))
    .then(module => module.default)


export { default as OutsourceDetailContainer } from './OutsourceDetailContainer'
export { default as OutsourceCreateContainer } from './OutsourceCreateContainer'
export { default as OutsourceUpdateContainer } from './OutsourceUpdateContainer'
