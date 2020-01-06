import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import {
  path,
  prop,
  find,
  propEq,
  eqBy,
  unionWith,
  pipe,
  not,
  is
} from 'ramda'
/*import {
  compose,
  withReducer,
  mapPropsStream,
  createEventHandler,
  pure
} from 'react-fc'
import {
  map,
  tap,
  skip,
  first,
  withLatestFrom,
  filter,
  distinctUntilChanged,
  debounceTime
} from 'rxjs/operators'*/
import { Select } from 'ui-cubic'
import { useCompareEffect } from '../../../hooks'
import { getFieldError } from '~/utils/form'
import { isNumber } from '~/utils/is'

const DEFAULT_STATE = {
  options: [],
  loading: false,
  text: '',
  dirty: false
}

const filterInitial = props => {
  const { state, input, getValue } = props
  return pipe(
    find(propEq('id', getValue(input.value))),
    Boolean,
    not
  )(state.options)
}

const getIdFromProps = props => {
  const value = path(['input', 'value'], props)
  if (is(Object, value)) return prop('id', value)
  return value
}

const fetchSubscribe = props => {
  const {
    input,
    state: { text },
    getOption,
    getOptions,
    getOptionValues,
    dispatch,
    getValue,
    getText
  } = props

  const defaultGetOptionsText = data =>
    data.map(item => {
      return {
        ...item,
        originalName: item.name,
        name: getText(item),
        id: getValue(item)
      }
    })

  const appendValueToOptions = (inputValue, options) => {
    const valueId = isNumber(parseFloat(inputValue)) ? inputValue : prop('id', inputValue)
    if (valueId) {
      // Search this value in options
      // If not found -> append it to options
      if (!find(propEq('id', valueId), options)) {
        return getOption(valueId)
          .then(item => {
            const newOption = {
              id: getValue(item),
              name: getText(item)
            }
            dispatch({
              options: [newOption, ...options],
              loading: false
            })
          })
      }
    }
  }

  getOptions(text)
    .then(data => {
      const options =
        typeof getOptionValues === 'function'
          ? getOptionValues(data)
          : defaultGetOptionsText(data)

      appendValueToOptions(prop('value', input), options)

      return dispatch({ options, loading: false })
    })
    .catch(error => {
      dispatch({ loading: false })
      return error
    })
}

const setLoading = props => props.dispatch({ loading: true })

const setLoadingAndFetch = props => {
  setLoading(props)
  fetchSubscribe(props)
}
const useFirstFetch = props => {
  const isFiltered = pipe(
    path(['parent']),
    not
  )(props)

  useCompareEffect(() => {
    if (isFiltered) {
      setLoadingAndFetch(props)
    }
  }, [])
}

const useParentChangeFetch = props => {
  const parent = prop('parent', props)
  useCompareEffect(() => {
    if (parent) {
      setLoadingAndFetch(props)
    }
  }, [parent])
}

const useOnSearchFetch = props => {
  const filter = path(['state', 'dirty'], props)
  const text = path(['state', 'text'], props)
  useCompareEffect(() => {
    if (filter) {
      setLoadingAndFetch(props)
    }
  }, [text])
}

const useInitialValues = props => {
  const id = getIdFromProps(props)
  const filterInit = filterInitial(props)
  useCompareEffect(() => {
    if (id && filterInit) {
      const { getOption, getText, getValue, state, dispatch } = props
      const id = getIdFromProps(props)
      dispatch({ loading: true })
      getOption(id).then(item => {
        const option = {
          id: getValue(item),
          name: getText(item)
        }
        const options = unionWith(eqBy(prop('id')), state.options, [option])

        dispatch({ options, loading: false })
      })
    }
  }, [id])
}

const useStaticInitialsFetch = props => {
  const value = path(['input', 'value'], props)
  const notObject = pipe(
    path(['input', 'value']),
    is(Object),
    not
  )
  const isStatic = props.isStatic
  useCompareEffect(() => {
    if (value && notObject && isStatic) {
      fetchSubscribe(props)
    }
  }, [])
}
/*
const onFetch = props => {
  const text = path(['state', 'text'], props)
  useCompareEffect(() => {
    if(text){
      setLoadingAndFetch(props)
    }

  }, [text])
  onFetchData$
    .pipe(
      debounceTime(500),
      withLatestFrom(props$),
      filter(path(['1', 'state', 'dirty'])),
      distinctUntilChanged(null, path(['1', 'state', 'text'])),
      tap(([, props]) => setLoading(props))
    )
    .subscribe(([, props]) => {
      fetchSubscribe(props)
    })
} */
/*

const enhance = compose(
  withReducer(
    'state',
    'dispatch',
    (state, action) => ({ ...state, ...action }),
    DEFAULT_STATE
  ),
  mapPropsStream(props$ => {
    const { handler: onFetchData, stream: onFetchData$ } = createEventHandler()

    // Initial fetch on select open
    onFetchData$
      .pipe(
        first(),
        withLatestFrom(props$),
        filter(
          pipe(
            path(['1', 'parent']),
            not
          )
        ),
        tap(([, props]) => setLoading(props))
      )
      .subscribe(([, props]) => fetchSubscribe(props))

    // (Child select) Fetch data when parent is chosen
    onFetchData$
      .pipe(
        withLatestFrom(props$),
        filter(path(['1', 'parent'])),
        distinctUntilChanged(null, ([, props]) => prop('parent', props)),
        tap(([, props]) => setLoading(props))
      )
      .subscribe(([, props]) => {
        fetchSubscribe(props)
      })

    // Fetch data on search
    onFetchData$
      .pipe(
        debounceTime(500),
        withLatestFrom(props$),
        filter(path(['1', 'state', 'dirty'])),
        distinctUntilChanged(null, path(['1', 'state', 'text'])),
        tap(([, props]) => setLoading(props))
      )
      .subscribe(([, props]) => {
        fetchSubscribe(props)
      })

    // (Child select) Clear child select field values if parent changes
    // #TODO
    props$
      .pipe(
        // filter(prop('parent')),
        distinctUntilChanged(null, prop('parent')),
        skip(1)
      )
      .subscribe(props => props.input.onChange(''))

    // Initial values from API
    props$
      .pipe(
        distinctUntilChanged(null, getIdFromProps),
        filter(getIdFromProps),
        filter(filterInitial)
      )
      .subscribe(props => {
        const { getOption, getText, getValue, state, dispatch } = props
        const id = getIdFromProps(props)
        dispatch({ loading: true })
        getOption(id).then(item => {
          const option = {
            id: getValue(item),
            name: getText(item)
          }
          const options = unionWith(eqBy(prop('id')), state.options, [option])

          dispatch({ options, loading: false })
        })
      })

    // Initial values from UI
    props$
      .pipe(
        first(),
        filter(path(['input', 'value'])),
        filter(
          pipe(
            path(['input', 'value']),
            is(Object),
            not
          )
        ),
        tap(props => setLoading(props))
      )
      .subscribe(props => {
        if (props.isStatic) {
          fetchSubscribe(props)
        }
      })

    return props$.pipe(
      map(props => {
        return {
          ...props,
          onFetchData
        }
      })
    )
  }),
  pure
)
*/

const getSelectedOption = (options, option) => {
  return find(propEq('id', option.id || option))(options)
}

const actionReducer = (state, action) => ({ ...state, ...action })

const SearchField = props => {
  const [state, dispatch] = useReducer(actionReducer, DEFAULT_STATE)
  const newProps = { ...props, state, dispatch }
  useFirstFetch(newProps)
  useParentChangeFetch(newProps)
  useOnSearchFetch(newProps)
  useInitialValues(newProps)
  useStaticInitialsFetch(newProps)
  const {
    //    state,
    //    dispatch,
    input,
    meta,
    label,
//    onFetchData,
    disabled,
    isClearable,
    isStatic
  } = props

  const selectedOption = getSelectedOption(state.options, input.value) || ''

  const onInputChange = (value, { action }) => {
    if (action === 'input-change') {
      if (!state.dirty) dispatch({ dirty: true })
      dispatch({ text: value })
    }
  }

  const customFilterOption = (option, rawInput) => {
    if (isStatic) {
      const words = rawInput.split(' ')
      const reducer = (acc, cur) => {
        const label = prop('label', option)
        return (acc && label) && label.toLowerCase().includes(cur.toLowerCase())
      }
      return words.reduce(reducer, true)
    }
    return true
  }

  return (
    <Select
      {...input}
      {...props}
      label={label}
      value={selectedOption}
      options={state.options}
      isLoading={state.loading}
      getOptionLabel={prop('name')}
      getOptionValue={prop('id')}
      onMenuOpen={console.warn}
      isDisabled={disabled}
      isClearable={isClearable}
      error={getFieldError(meta)}
      onInputChange={onInputChange}
      filterOption={customFilterOption}
    />
  )
}

SearchField.propTypes = {
  state: PropTypes.shape({
    options: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }),
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  onFetchData: PropTypes.func,
  isClearable: PropTypes.bool,
  isStatic: PropTypes.bool
}

SearchField.propType = {
  isClearable: true
}

export default SearchField
