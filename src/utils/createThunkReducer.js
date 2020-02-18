import createReducer from './createReducer'

const initialState = {
  data: null,
  error: null,
  loading: true,
  success: false,
  failed: false
}

const createGetThunkReducer = actionName => {
  return createReducer(initialState, {
    [`${actionName}_PENDING`] (state) {
      return {
        ...state,
        loading: true
      }
    },
    [`${actionName}_FULFILLED`] (state, action) {
      return {
        ...state,
        data: action.payload,
        error: null,
        success: true,
        loading: false,
        failed: false
      }
    },
    [`${actionName}_REJECTED`] (state, action) {
      return {
        ...state,
        data: null,
        error: action.payload,
        loading: false,
        success: false,
        failed: true
      }
    },
    [`${actionName}_CLEAR`] () {
      return initialState
    }
  })
}

const postInitialState = {
  data: null,
  error: null,
  loading: false,
  success: false,
  failed: false
}

const createPostThunkReducer = actionName => {
  return createReducer(postInitialState, {
    [`${actionName}_PENDING`] (state) {
      return {
        ...state,
        loading: true
      }
    },
    [`${actionName}_FULFILLED`] (state, action) {
      return {
        ...state,
        data: action.payload,
        error: null,
        success: true,
        loading: false,
        failed: false
      }
    },
    [`${actionName}_REJECTED`] (state, action) {
      return {
        ...state,
        data: null,
        error: action.payload,
        loading: false,
        success: false,
        failed: true
      }
    },
    [`${actionName}_CLEAR`] () {
      return postInitialState
    }
  })
}

export default createGetThunkReducer
export { createGetThunkReducer, createPostThunkReducer }
