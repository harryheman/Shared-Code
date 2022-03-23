// "Входная точка" для Webpack - главный файл приложения

import React from 'react'
import ReactDOM from 'react-dom'
// Провайдер Apollo с дочерним компонентом App
import ApolloProvider from './ApolloProvider'

const root$ = document.getElementById('root')
ReactDOM.render(<ApolloProvider />, root$)
