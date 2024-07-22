export interface CarouselImage {
  id: number
  image_url: string
}

export interface UpdatedData {
  imageUrl: string
  id: number
}

export interface UserRatingData {
  rating: number
  rating_color: string
  rating_text: string
  total_reviews: number
}

export interface RestaurantList {
  costForTwo: number
  cusine: string
  groupByTime: boolean
  hasOnlineDelivery: boolean
  hasTableBooking: number
  id: string
  imageUrl: string
  isDeliveryingNow: number
  location: string
  menuType: string
  name: string
  opensAt: number
  userRating: UserRatingData
}

export interface RestaurantListData {
  cost_for_two: number
  cusine: string
  group_by_time: boolean
  has_online_delivery: boolean
  has_table_booking: number
  id: string
  image_url: string
  is_delivering_now: number
  location: string
  menu_type: string
  name: string
  opens_at: number
  user_rating: UserRatingData
}

export type Limit = number

export interface FoodItem {
  cost: number
  foodType: string
  id: string
  imageUrl: string
  name: string
  rating: number
  quantity?: number
}

export interface RouteParams {
  id: string
}

export interface Match {
  params: RouteParams
}

export interface MenuItemDetailsProps {
  match: Match
}

export interface FoodItemsObject {
  cost: number
  food_type: string
  id: string
  image_url: string
  name: string
  rating: number
}

export interface UpdatedFoodItemsObjectTypes {
  cost: number
  foodType: string
  id: string
  imageUrl: string
  name: string
  rating: number
}

export interface MenuItemDetailsData {
  costForTwo: number
  cuisine: string
  foodItems: FoodItemsObject[]
  id: string
  imageUrl: string
  itemsCount: number
  location: string
  name: string
  opensAt: string
  rating: number
  reviewsCount: number
}

export interface UserRating {
  rating: number
  rating_color: string
  rating_text: string
  total_reviews: number
}

export interface RestaurantList {
  costForTwo: number
  cusine: string
  groupByTime: boolean
  hasOnlineDelivery: boolean
  hasTableBooking: number
  id: string
  imageUrl: string
  isDeliveryingNow: number
  location: string
  menuType: string
  name: string
  opensAt: number
  userRating: UserRating
}

export interface ItemCardProps {
  eachItem: RestaurantList
}

export interface ApiStatusConstants {
  initial: string
  success: string
  failure: string
  inProgress: string
}

export const apiStatusConstants: { [key: string]: ApiStatus } = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Both are same we can use any one of them
// export const apiStatusConstants:  Record<string, ApiStatus> = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

export type ApiStatus = 'INITIAL' | 'SUCCESS' | 'FAILURE' | 'IN_PROGRESS'
