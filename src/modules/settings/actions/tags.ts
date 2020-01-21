import { sprintf } from 'sprintf-js'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../../utils/axios'
import * as API from '../../../constants/api'
import * as actionTypes from '../../../constants/actionTypes'

export const tagsListFetch = (data) => {

    return (dispatch, getState) => {
        const payload = axios({ dispatch, getState })
            .get(API.TAGS_LIST, { params: data })
            .then(getPayloadFromSuccess)
            .catch(getPayloadFromError)

        return dispatch({
            payload,
            type: actionTypes.TAGS_LIST
        })
    }
}
export const tagsCreateAction = (data) => {
    return (dispatch, getState) => {
        const payload = axios({ dispatch, getState })
            .post(API.TAGS_CREATE, data)
            .then(getPayloadFromSuccess)
            .catch(getPayloadFromError)

        return dispatch({
            payload,
            type: actionTypes.TAGS_CREATE
        })
    }
}

export const tagsUpdateAction = (id, data) => {
    return (dispatch, getState) => {
        const payload = axios({ dispatch, getState })
            .put(sprintf(API.TAGS_UPDATE, id), data)
            .then(getPayloadFromSuccess)
            .catch(getPayloadFromError)

        return dispatch({
            payload,
            type: actionTypes.TAGS_UPDATE
        })
    }
}
export const tagsItemFetch = (id) => {
    return (dispatch, getState) => {
        const payload = axios({ dispatch, getState })
            .get(sprintf(API.TAGS_ITEM, id))
            .then(getPayloadFromSuccess)
            .catch(getPayloadFromError)

        return dispatch({
            payload,
            type: actionTypes.TAGS_ITEM
        })
    }
}

export const tagsDeleteAction = (id) => {
    return (dispatch, getState) => {
        const payload = axios({ dispatch, getState })
            .delete(sprintf(API.TAGS_DELETE, id))
            .then(getPayloadFromSuccess)
            .catch(getPayloadFromError)

        return dispatch({
            payload,
            type: actionTypes.TAGS_DELETE
        })
    }
}
