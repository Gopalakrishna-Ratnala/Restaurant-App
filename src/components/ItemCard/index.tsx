import React from 'react'

import { BsStarFill } from 'react-icons/bs'

import './index.css'
import { Link } from 'react-router-dom'

import { ItemCardProps, UserRating } from '../types'

const ItemCard: React.FC<ItemCardProps> = ({ eachItem }) => {
  const userRating: UserRating = eachItem.userRating
  const updatedUserRating = {
    rating: userRating.rating,
    ratingColor: userRating.rating_color,
    ratingText: userRating.rating_text,
    totalReviews: userRating.total_reviews,
  }
  const ItemColor = eachItem.menuType === 'VEG' ? 'green' : 'red'
  return (
    <Link to={`/restaurant/${eachItem.id}`} className='link-item'>
      <li className='item-card-container'>
        <img src={eachItem.imageUrl} alt='' className='menu-item-img' />
        <div className='menu-item-content'>
          <p className='item-name'>
            {eachItem.name.length > 13
              ? eachItem.name.slice(0, 14) + '...'
              : eachItem.name}
          </p>
          <p className='item-type' style={{ color: ItemColor }}>
            {eachItem.menuType}
          </p>
          <div className='rating-container'>
            <div className='rating-star-container'>
              <BsStarFill style={{ color: '#FFCC00' }} />
              <span className='rating'>{eachItem.userRating.rating}</span>
            </div>

            <span className='review'>
              ({`${updatedUserRating.totalReviews} ratings`})
            </span>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ItemCard
