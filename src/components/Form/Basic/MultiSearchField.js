import React from 'react'
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
  is, isEmpty
} from 'ramda'
import {
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
} from 'rxjs/operators'
import { Select } from 'ui-cubic'
import { getFieldError } from '~/utils/form'

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

const fetchSubscribe = props => {
  const {
    state: { text },
    getOptions,
    dispatch,
    getValue,
    getText
  } = props

  const defaultGetOptionsText = data =>
    data.map(item => ({
      ...item,
      name: getText(item),
      id: getValue(item)
    }))

  getOptions(text)
    .then(data => {
      const options = defaultGetOptionsText(data)
      dispatch({ options, loading: false })
    })
    .catch(error => {
      dispatch({ loading: false })
      return error
    })
}

const setLoading = props => props.dispatch({ loading: true })

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
      .subscribe(([, props]) => fetchSubscribe(props))

    // (Child select) Clear child select field values if parent changes
    props$
      .pipe(
        filter(prop('parent')),
        distinctUntilChanged(null, prop('parent')),
        skip(1)
      )
      .subscribe(props => props.input.onChange(''))

    // Initial values from API
    props$
      .pipe(
        distinctUntilChanged(null, path(['input', 'value', 'id'])),
        filter(path(['input', 'value', 'id'])),
        filter(filterInitial)
      )
      .subscribe(props => {
        const { input, getOption, getText, getValue, state, dispatch } = props

        dispatch({ loading: true })
        getOption(input.value.id).then(item => {
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
        filter(pipe(
          path(['input', 'value']),
          is(Array)
        )),
        filter(pipe(
          path(['input', 'value']),
          isEmpty,
          not
        )),
        tap(props => setLoading(props))
      )
      .subscribe(props => fetchSubscribe(props))

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

const SearchField = enhance(props => {
  const {
    state,
    dispatch,
    input,
    meta,
    label,
    onFetchData,
    disabled,
    isClearable,
    ...defaultProps
  } = props

  const onInputChange = (value, { action }) => {
    if (action === 'input-change') {
      if (!state.dirty) dispatch({ dirty: true })
      dispatch({ text: value })
    }
    if (action === 'set-value') {
      dispatch({ text: '' })
    }
  }

  return (
    <Select
      {...input}
      {...defaultProps}
      isMulti={true}
      label={label}
      isDisabled={disabled}
      isClearable={isClearable}
      options={state.options}
      isLoading={state.loading}
      onMenuOpen={onFetchData}
      getOptionLabel={prop('name')}
      getOptionValue={prop('id')}
      onInputChange={onInputChange}
      error={getFieldError(meta)}
    />
  )
})

SearchField.propTypes = {
  state: PropTypes.shape({
    options: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }),
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  onFetchData: PropTypes.func,
  isClearable: PropTypes.bool
}

SearchField.propType = {
  isClearable: true
}

export default SearchField
