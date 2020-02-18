import {injectReducers} from "etc/reducers";

export const getOutSourceListContainer = store =>
  import(/* webpackChunkName: "outsource" */ '../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "outsource" */ './OutsourceListContainer'))
    .then(module => module.default)

export const getOutSourceDetailContainer = store =>
  import(/* webpackChunkName: "outsource" */ '../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "outsource" */ './OutsourceDetailContainer'))
    .then(module => module.default)

export const getOutSourceCreateContainer = store =>
  import(/* webpackChunkName: "outsource" */ '../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "outsource" */ './OutsourceCreateContainer'))
    .then(module => module.default)

export const getOutSourceUpdateContainer = store =>
  import(/* webpackChunkName: "outsource" */ '../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "outsource" */ './OutsourceUpdateContainer'))
    .then(module => module.default)
