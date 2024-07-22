import { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Cookies from 'js-cookie'
import Header from '../Header'
import ItemCard from '../ItemCard'
import { PiLessThan } from 'react-icons/pi'
import { PiGreaterThan } from 'react-icons/pi'
import FailureView from '../FailureView'
import './index.css'
import Footer from '../Footer'
import {
  CarouselImage,
  UpdatedData,
  RestaurantList,
  RestaurantListData,
  Limit,
  apiStatusConstants,
  ApiStatus,
} from '../types'

import LoadingView from '../LoadingView'

const Home = () => {
  const [carouselImages, setCarouselImages] = useState<UpdatedData[]>([])
  const [restaurantList, setRestaurantList] = useState<RestaurantList[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [activePage, setActivePage] = useState<number>(1)
  const [apiStatus, setApiStatus] = useState<ApiStatus>(
    apiStatusConstants.initial
  )
  const limit: Limit = 9
  useEffect(() => {
    getCarouselImages()
  }, [activePage])

  useEffect(() => {
    setApiStatus(apiStatusConstants.inProgress)
    getRestaurantList()
  }, [activePage])

  const getCarouselImages = async (): Promise<void> => {
    const jwtToken = Cookies.get('jwtToken')
    const apiUrl = `${process.env.REACT_APP_API_URL}restaurants-list/offers`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData: UpdatedData[] = data.offers.map(
        (eachItem: CarouselImage) => ({
          imageUrl: eachItem.image_url,
          id: eachItem.id,
        })
      )
      setCarouselImages(updatedData)
      console.log(carouselImages)
    }
  }

  const currentSlide = 0

  const onclickBackPage: () => void = () => {
    if (activePage > 1) {
      setActivePage(prevVal => prevVal - 1)
      const newOffset = (activePage - 1) * limit
      setOffset(newOffset)
    }
  }

  const onclickRightPage: () => void = () => {
    if (restaurantList.length === limit) {
      setActivePage(prevVal => prevVal + 1)
      const newOffset = (activePage - 1) * limit
      setOffset(newOffset)
    }
  }

  const getRestaurantList = async (): Promise<void> => {
    const jwtToken = Cookies.get('jwtToken')
    const apiUrl = `${process.env.REACT_APP_API_URL}restaurants-list?offset=${offset}&limit=${limit}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      setApiStatus(apiStatusConstants.success)
      const updatedData: RestaurantList[] = data.restaurants.map(
        (eachItem: RestaurantListData) => ({
          costForTwo: eachItem.cost_for_two,
          cusine: eachItem.cusine,
          groupByTime: eachItem.group_by_time,
          hasOnlineDelivery: eachItem.has_online_delivery,
          hasTableBooking: eachItem.has_table_booking,
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          isDeliveryingNow: eachItem.is_delivering_now,
          location: eachItem.location,
          menuType: eachItem.menu_type,
          name: eachItem.name,
          opensAt: eachItem.opens_at,
          userRating: eachItem.user_rating,
        })
      )
      setRestaurantList(updatedData)
      console.log(restaurantList)
      console.log(restaurantList)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderSuccessView = () => {
    return (
      <div className='home-container'>
        <div className='carousel-container'>
          <Carousel
            selectedItem={currentSlide}
            showThumbs={false}
            showStatus={false}
            autoPlay
            infiniteLoop
          >
            {carouselImages.map((element: UpdatedData) => (
              <div key={element.id}>
                <img src={element.imageUrl} alt='' />
              </div>
            ))}
          </Carousel>
        </div>

        {/* <div className='sort-by-card'>
        <div className='sort-by-paragraph-container'>
            <p>Popular Restaurants</p>
            <p>Select your favourite restaurant special dish and make your day happy...</p>
        </div>
        <div className='sort-by-action-container'>
            <option className=''>
                <select >Sort by Lowest</select>
                <select>Sort by Higest</select>
            </option>
        </div>
        <br/>
  </div> */}
        <ul className='menu-items-container'>
          {restaurantList.map((eachItem: RestaurantList) => (
            <ItemCard
              eachItem={eachItem}
              data-testid={`restaurant-item-${eachItem.id}`}
            />
          ))}
        </ul>
        <div className='page-container'>
          <button
            type='button'
            onClick={onclickBackPage}
            className='page-button'
            style={{ marginRight: '5px' }}
          >
            <PiLessThan
              style={{
                color: '#334155',
                width: '12px',
                height: '7px',
                fontWeight: 'bold',
              }}
            />
          </button>
          <p
            style={{
              color: '#334155',
              fontFamily: 'Bree Serif',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            {activePage}
          </p>

          <button
            type='button'
            onClick={onclickRightPage}
            className='page-button'
            style={{ marginLeft: '5px' }}
          >
            <PiGreaterThan
              style={{
                color: '#334155',
                width: '12px',
                height: '7px',
                fontWeight: 'bold',
              }}
            />
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const renderLoadingView = (): JSX.Element => <LoadingView />

  const renderFailureView = (): JSX.Element => <FailureView />

  const renderHomeView = (): JSX.Element | null => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      {renderHomeView()}
    </div>
  )
}

export default Home
