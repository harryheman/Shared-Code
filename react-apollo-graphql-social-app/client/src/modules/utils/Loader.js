// Индикатор загрузки

import Spinner from 'react-loader-spinner'

const loaderStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

export const Loader = () => (
  <Spinner
    type='Oval'
    color='#00bfff'
    height={60}
    width={60}
    style={loaderStyles}
  />
)
