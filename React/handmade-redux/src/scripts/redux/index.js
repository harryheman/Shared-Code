import { useState, useEffect } from 'react'
import { areObjectsEqual } from '../utils'
import reducer from './reducer'
import middlewares from './middlewares'
import * as TYPES from './types'

// common actions
const setLoading = (value) => ({
  type: TYPES.SET_LOADING,
  value
})

const setError = (error) => ({
  type: TYPES.SET_ERROR,
  error
})

function validateAction(action) {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!')
  }
  if (!action.type) {
    throw new Error('Action must have a type!')
  }
}

function createStore(reducer, middleware) {
  let state

  const subscribers = []

  function _dispatch(action) {
    validateAction(action)

    if (action.type === TYPES.ASYNC) {
      /*
      if (state.loading) {
        console.log('Async action is in progress')
        const timerId = setTimeout(() => {
          _dispatch(action)
          clearTimeout(timerId)
        }, 250)
        return
      }
      */

      return performAsyncAction(action)
    }

    state = reducer(state, action)

    subscribers.forEach((sub) => {
      const newMappedState = Object.keys(state).reduce((obj, key) => {
        if (key in sub.mappedState) {
          obj[key] = state[key]
        }
        return obj
      }, {})

      if (!areObjectsEqual(sub.mappedState, newMappedState)) {
        sub.handler()
        sub.mappedState = newMappedState
      }
    })
  }

  async function performAsyncAction(action) {
    _dispatch(setLoading(true))

    const { fetcher, onResult } = action

    try {
      const result = await fetcher()

      if (typeof onResult === 'function') {
        _dispatch(onResult(result))
      }
    } catch (error) {
      _dispatch(setError(error))
    } finally {
      _dispatch(setLoading(false))
    }
  }

  const getState = () => state

  const store = {
    dispatch: _dispatch,
    getState,
    subscribe(sub) {
      subscribers.push(sub)

      return () => {
        const index = subscribers.indexOf(sub)
        if (index > -1) {
          subscribers.splice(index, 1)
        }
      }
    }
  }

  if (middleware) {
    const dispatch = (action) => store.dispatch(action)
    store.dispatch = middleware({
      dispatch,
      getState
    })(_dispatch)
  }

  _dispatch({ type: '@@redux/INIT' })

  return store
}

const applyMiddleware = (middlewares) => (store) => {
  if (!middlewares.length) {
    return (dispatch) => dispatch
  }
  if (middlewares.length === 1) {
    return middlewares[0](store)
  }
  const boundMiddlewares = middlewares.map((mw) => mw(store))
  return boundMiddlewares.reduce((a, b) => (next) => a(b(next)))
}

const store = createStore(reducer, applyMiddleware(middlewares))

const mapStateToProps = (keys) => {
  const state = store.getState()

  const mappedKeys = keys.reduce((obj, key) => {
    if (key in state) {
      obj[key] = state[key]
    }
    return obj
  }, {})

  return mappedKeys
}

const mapMethodsToProps = (methods) => {
  const dispatch = store.dispatch

  const mappedMethods = Object.keys(methods).reduce((obj, key) => {
    const { type } = methods[key]()
    if (type in TYPES) {
      obj[key] = (...args) => dispatch(methods[key](...args))
    }
    return obj
  }, {})

  return mappedMethods
}

const connect =
  (keys = [], methods = {}) =>
  (Component) =>
  (props) => {
    const [state, setState] = useState({
      ...mapStateToProps(keys),
      ...mapMethodsToProps(methods)
    })

    useEffect(() => {
      const unsubscribe = store.subscribe({
        handler() {
          setState((state) => ({ ...state, ...mapStateToProps(keys) }))
        },
        mappedState: mapStateToProps(keys)
      })
      return () => {
        unsubscribe()
      }
    }, [])

    return <Component {...state} {...props} />
  }

export default connect
