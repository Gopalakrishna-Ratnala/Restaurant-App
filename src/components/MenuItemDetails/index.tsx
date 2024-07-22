import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import { BsStarFill } from 'react-icons/bs'
import './index.css'
import FoodItemCard from '../FoodItemCard'
import { apiStatusConstants } from '../types'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import {
  MenuItemDetailsData,
  UpdatedFoodItemsObjectTypes,
  MenuItemDetailsProps,
} from '../types'
import Footer from '../Footer'

// Assuming you're using React Router, define the expected props structure

const MenuItemDetails: React.FC<MenuItemDetailsProps> = ({ match }) => {
  const { id } = match.params
  console.log(id)

  const [menuItemDetails, setMenuItemDetails] = useState<MenuItemDetailsData>(
    {} as MenuItemDetailsData
  )
  const [foodItemsList, setFoodItemsList] = useState<
    UpdatedFoodItemsObjectTypes[]
  >([])

  const [apiStatus, setApiStatus] = useState<string>(apiStatusConstants.initial)

  useEffect(() => {
    setApiStatus(apiStatusConstants.inProgress)
    const getMenuItems = async () => {
      const URL = `${process.env.REACT_APP_API_URL}restaurants-list/${id}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwtToken')}`,
        },
      }
      const response = await fetch(URL, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData: MenuItemDetailsData = {
          costForTwo: data.cost_for_two,
          cuisine: data.cuisine,
          foodItems: data.food_items,
          id: data.id,
          imageUrl: data.image_url,
          itemsCount: data.items_count,
          location: data.location,
          name: data.name,
          opensAt: data.opens_at,
          rating: data.rating,
          reviewsCount: data.reviews_count,
        }
        const foodItems = updatedData.foodItems.map(eachItem => ({
          cost: eachItem.cost,
          foodType: eachItem.food_type,
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          name: eachItem.name,
          rating: eachItem.rating,
        }))
        setApiStatus(apiStatusConstants.success)
        setMenuItemDetails(updatedData)
        setFoodItemsList(foodItems)
      }
      if (response.status === 401) {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getMenuItems()
  }, [id]) // Depend on `id` to refetch when it changes

  const renderSuccessView = () => {
    return (
      <div>
        <div className='selected-card-item-container'>
          <div className='selected-item-container'>
            <img
              src={menuItemDetails.imageUrl}
              alt=''
              className='selected-item-img'
            />
            <div className='selected-item-content'>
              <p className='selected-item-name'>{menuItemDetails.name}</p>
              <p className='selected-item-cuisine'>{menuItemDetails.cuisine}</p>
              <p className='selected-item-location'>
                {menuItemDetails.location}
              </p>
              <div className='selected-item-rating-cost-container'>
                <div className='selected-rating-container'>
                  <div className='selected-rating-star-container'>
                    <BsStarFill
                      style={{ color: '#FFFFFF', fontSize: '12px' }}
                    />
                    <span className='selected-rating'>
                      {menuItemDetails.rating}
                    </span>
                  </div>
                  <span className='selected-review'>
                    {menuItemDetails.reviewsCount}+ rating
                  </span>
                </div>
                <hr
                  style={{
                    width: '1px',
                    height: '50px',
                    backgroundColor: '#E2E8F0',
                    margin: 'auto',
                    border: 'none',
                  }}
                />
                <div className='selected-item-cost-container'>
                  <span className='selected-item-cost'>
                    $ {menuItemDetails.costForTwo}
                  </span>
                  <span className='selected-item-cost-text'>cost for two</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className='food-items-list-container'>
          {foodItemsList.map(eachItem => (
            <FoodItemCard foodItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  const renderLoadingView = () => <LoadingView />

  const renderFailureView = () => <FailureView hasButton={true} />

  const renderItemDetailsView = () => {
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
      {renderItemDetailsView()}
    </div>
  )
}

export default MenuItemDetails
