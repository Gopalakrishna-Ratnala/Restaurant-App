import React, { useState } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Rating,
  Box,
  Button,
  Stack,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { FoodItem } from '../types'

const FoodItemCard = ({ foodItem }: { foodItem: FoodItem }) => {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const handleAdd = () => setIsAdded(true)
  const increment = () => setQuantity(prev => prev + 1)
  const decrement = () => {
    if (quantity === 1) setIsAdded(false)
    setQuantity(prev => Math.max(1, prev - 1))
  }

  return (
    <Card
      sx={{
        borderRadius: '16px',
        boxShadow: '0px 4px 16px rgba(123, 135, 148, 0.16)',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s',
        },
      }}
    >
      <CardMedia
        component='img'
        height='200'
        image={foodItem.imageUrl}
        alt={foodItem.name}
        sx={{
          borderRadius: '16px 16px 0 0',
          objectFit: 'cover',
          position: 'relative',
        }}
      />

      {/* Food Type Badge */}
      <Chip
        label={foodItem.foodType}
        size='small'
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          bgcolor: foodItem.foodType === 'VEG' ? '#137946' : '#E43B31',
          color: 'white',
          fontWeight: 600,
          borderRadius: '4px',
        }}
      />

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant='h6' fontWeight={600} color='text.primary'>
            {foodItem.name}
          </Typography>
          <Typography variant='body1' fontWeight={600} color='primary.main'>
            ₹{foodItem.cost.toFixed(2)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
              value={foodItem.rating}
              precision={0.1}
              readOnly
              size='small'
              sx={{ color: '#FFB800' }}
            />
            <Typography variant='body2' color='text.secondary'>
              {foodItem.rating}
            </Typography>
          </Box>

          {isAdded ? (
            <Stack direction='row' alignItems='center' spacing={1}>
              <IconButton
                size='small'
                onClick={decrement}
                sx={{
                  border: '1px solid #475569',
                  borderRadius: '4px',
                  p: 0.5,
                }}
              >
                <RemoveIcon fontSize='small' />
              </IconButton>
              <Typography variant='body1'>{quantity}</Typography>
              <IconButton
                size='small'
                onClick={increment}
                sx={{
                  border: '1px solid #475569',
                  borderRadius: '4px',
                  p: 0.5,
                }}
              >
                <AddIcon fontSize='small' />
              </IconButton>
            </Stack>
          ) : (
            <Button
              variant='outlined'
              onClick={handleAdd}
              sx={{
                color: '#F7931E',
                border: '2px solid #F7931E',
                borderRadius: '8px',
                px: 2,
                py: 0.5,
                '&:hover': {
                  border: '2px solid #F7931E',
                  backgroundColor: 'rgba(247, 147, 30, 0.04)',
                },
              }}
            >
              ADD
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default FoodItemCard
