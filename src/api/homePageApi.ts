import Cookies from 'js-cookie'
import {
  UpdatedData,
  CarouselImage,
  RestaurantListData,
  RestaurantList,
  Limit,
} from '../components/types' // Import necessary types

const jwtToken = Cookies.get('jwtToken')

export const fetchOffers = async (): Promise<any[]> => {
  const apiUrl = `${process.env.REACT_APP_API_URL}restaurants-list/offers`
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: 'GET',
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const fetchCarouselImagesApi = async (): Promise<UpdatedData[]> => {
  const apiUrl = `${process.env.REACT_APP_API_URL}restaurants-list/offers`
  const options = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: 'GET',
  }
  const response = await fetch(apiUrl, options)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  const updatedData: UpdatedData[] = data.offers.map(
    (eachItem: CarouselImage) => ({
      imageUrl: eachItem.image_url,
      id: eachItem.id,
    })
  )
  return updatedData
}

export const fetchRestaurantListApi = async (
  offset: number,
  limit: Limit
): Promise<{ restaurants: RestaurantList[]; total: number }> => {
  const apiUrl = `${process.env.REACT_APP_API_URL}restaurants-list?offset=${offset}&limit=${limit}`
  const options = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: 'GET',
  }
  const response = await fetch(apiUrl, options)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()

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
  return { restaurants: updatedData, total: data.total } // Return both restaurants and total
}
