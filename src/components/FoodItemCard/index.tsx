import { BsStarFill } from 'react-icons/bs'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import React, { useState, useContext } from 'react'
import './index.css'
// import CartContext from '../../context/CartContext'

import { FoodItem } from '../types'

const FoodItemCard: React.FC<{ foodItem: FoodItem }> = ({ foodItem }) => {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const onClickAdd = () => {
    setIsAdded(true)
    console.log(foodItem)
    // addCartItem({ ...foodItem, quantity })
  }
  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decrementQuantity = () => {
    if (quantity === 1) {
      setIsAdded(false)
    } else if (quantity >= 1) {
      setQuantity(quantity - 1)
    }
  }

  // const { addCartItem, cartList } = useContext(CartContext)

  return (
    <li className='food-list-item-container'>
      <img
        src={foodItem.imageUrl}
        alt={foodItem.name}
        className='food-item-img'
      />
      <div className='food-item-content-container'>
        <p className='food-item-name'>{foodItem.name}</p>
        <p className='food-item-cost'>{`$${foodItem.cost}.00`}</p>
        <p style={{ margin: '5px' }}>
          <BsStarFill
            className=''
            style={{ color: '#FFCC00', fontSize: '14px' }}
          />
          <span className='food-item-rating'>{foodItem.rating}</span>
        </p>

        {isAdded ? (
          <div className='buttons-container'>
            <Button
              variant='outlined'
              size='small'
              sx={{
                color: '#475569',
                border: '1px solid #475569',
                ':hover': { border: '1px solid #475569' },
                borderRadius: '3px',
                backgroundColor: 'transparent',
              }}
              onClick={decrementQuantity}
            >
              -
            </Button>
            <p style={{ marginLeft: '5px', marginRight: '5px' }}>{quantity}</p>
            <Button
              variant='outlined'
              size='small'
              sx={{
                color: '#475569',
                border: '1px solid #475569',
                ':hover': { border: '1px solid #475569' },
                borderRadius: '3px',
                backgroundColor: 'transparent',
              }}
              onClick={incrementQuantity}
            >
              +
            </Button>
          </div>
        ) : (
          <Stack direction='row' spacing={2}>
            <Button
              variant='outlined'
              sx={{
                color: '#F7931E',
                border: '2px solid #F7931E',
                ':hover': { border: '2px solid #F7931E' },
                borderRadius: '10px',
              }}
              onClick={() => onClickAdd()}
            >
              ADD
            </Button>
          </Stack>
        )}
      </div>
    </li>
  )
}

export default FoodItemCard
