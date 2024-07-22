import { Link } from 'react-router-dom'
import failureImg from '../../assets/failureImg.jpg'
import './index.css'

interface FailureViewProps {
  hasButton?: boolean
}

const FailureView: React.FC<FailureViewProps> = ({ hasButton }) => {
  return (
    <div className='failure-container'>
      <img src={failureImg} alt='failure view' className='failure-image' />
      <h1 className='failure-heading'>Oops! Something Went Wrong</h1>
      <p className='failure-paragraph'>
        We are having some trouble to complete your request. Please try again
      </p>
      {hasButton && (
        <Link to='/'>
          <button className='button'>Go To Home Page</button>
        </Link>
      )}
    </div>
  )
}

export default FailureView
