import { useReducer } from 'react'
import { join, path } from 'ramda'
import { useStore } from 'react-redux'
import * as API from '../../../constants/api'
import axios from '../../../utils/axios'

const reducer = (state, action) => {
  return { ...state, ...action }
}

const init = { loading: false, error: null, image: null }
const IMAGE_MAX_SIZE = 1500000

const useFileUploads = params => {
  const store = useStore()
  const [state, dispatch] = useReducer(reducer, init)
  const {
    formats,
    input,
    onSuccess
  } = params

  const onChange = (ev) => {
    const file = path(['target', 'files', '0'], ev)
    const formData = new FormData()
    const types = formats || ['image/png', 'image/jpeg', 'image/gif']

    if (types.every(type => file.type !== type)) {
      const allowedFormats = join(', ', types)
      return dispatch({
        error: `Формат не поддерживается. Доступные форматы: ${allowedFormats}`
      })
    }

    if (file.size > IMAGE_MAX_SIZE) {
      return dispatch({ error: 'Too large' })
    }

    formData.append('file', file)
    dispatch({ loading: true })
    return axios(store)
      .post(API.FILE_UPLOAD, formData)
      .then(response => {
        dispatch({ loading: false, error: null })
        input.onChange(response.data)
        onSuccess && onSuccess(response.data)
        return response
      })
      .catch(newError => {
        const errorData = path(['response', 'data'], newError)
        dispatch({ loading: false, error: errorData })
      })
  }

  return [state, onChange]
}

export default useFileUploads
