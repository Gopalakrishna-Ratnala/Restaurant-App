import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Container,
  Grid,
  Typography,
  Rating,
  Divider,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material'
import Header from '../Header'
import FoodItemCard from '../FoodItemCard'
import Footer from '../Footer'
import { fetchMenuItemDetails } from '../../api/menuItemApi'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

const MenuItemDetails = () => {
  const { id } = useParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { data, isLoading, isError } = useQuery({
    queryKey: ['menuItem', id],
    queryFn: () => fetchMenuItemDetails(id!),
  })

  if (isLoading) return <LoadingView />
  if (isError) return <FailureView hasButton={true} />

  const restaurantDetails = data?.restaurantDetails
  const foodItems = data?.foodItems

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header />
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Box
          sx={{
            bgcolor: 'grey.900',
            borderRadius: 4,
            p: 4,
            mb: 4,
            color: 'common.white',
          }}
        >
          <Grid container spacing={4} alignItems='center'>
            <Grid item xs={12} md={6}>
              <Avatar
                src={restaurantDetails?.imageUrl}
                variant='rounded'
                sx={{
                  width: '100%',
                  height: { xs: 200, md: 280 },
                  borderRadius: 2,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant='h3'
                gutterBottom
                sx={{ fontWeight: 600, textAlign: 'start' }}
              >
                {restaurantDetails?.name}
              </Typography>

              <Typography
                variant='body1'
                gutterBottom
                sx={{ textAlign: 'start' }}
              >
                {restaurantDetails?.cuisine}
              </Typography>

              <Typography
                variant='body1'
                gutterBottom
                sx={{ textAlign: 'start' }}
              >
                {restaurantDetails?.location}
              </Typography>

              <Stack
                direction='row'
                spacing={4}
                divider={
                  <Divider
                    orientation='vertical'
                    flexItem
                    sx={{ backgroundColor: '#ffffff' }}
                  />
                }
                sx={{ mt: 3 }}
              >
                <Box>
                  <Stack direction='column' alignItems='center' spacing={1}>
                    <Rating
                      value={restaurantDetails?.rating}
                      precision={0.1}
                      readOnly
                      size={isMobile ? 'small' : 'medium'}
                    />
                    <Typography variant='body2'>
                      ({restaurantDetails?.reviewsCount}+ Ratings)
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant='h6' sx={{ fontWeight: 600 }}>
                    ₹{restaurantDetails?.costForTwo?.toLocaleString()}
                  </Typography>
                  <Typography variant='caption'>Cost for two</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          {foodItems?.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box
                sx={{
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease',
                  },
                }}
              >
                <FoodItemCard foodItem={item} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  )
}

export default MenuItemDetails
