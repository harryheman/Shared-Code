const logging =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log('before', getState())
    console.log('action', action.type)
    const result = next(action)
    console.log('after', getState())
    return result
  }

const middlewares = [logging]

export default middlewares
