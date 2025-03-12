// api/menuItemApi.ts
import Cookies from 'js-cookie'

export const fetchMenuItemDetails = async (id: string) => {
  const jwtToken = Cookies.get('jwtToken')
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}restaurants-list/${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  )

  if (!response.ok) throw new Error('Failed to fetch menu details')

  const data = await response.json()

  return {
    restaurantDetails: {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      id: data.id,
      imageUrl: data.image_url,
      itemsCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    },
    foodItems: data.food_items.map((item: any) => ({
      cost: item.cost,
      foodType: item.food_type,
      id: item.id,
      imageUrl: item.image_url,
      name: item.name,
      rating: item.rating,
    })),
  }
}
