import Loader from 'react-loader-spinner'
import './index.css'

const LoadingView = () => {
  return (
    <div className='loader-container' data-testid='loader'>
      <Loader type='TailSpin' color='#F7931E' height='50' width='50' />
    </div>
  )
}

export default LoadingView
