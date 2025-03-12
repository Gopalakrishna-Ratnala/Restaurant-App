import React, { useState, useEffect } from 'react'
import { Container, Box, Grid, Pagination } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import Cookies from 'js-cookie'
import Header from '../Header'
import ItemCard from '../ItemCard'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'
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
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {
  fetchCarouselImagesApi,
  fetchRestaurantListApi,
} from '../../api/homePageApi'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  // const [carouselImages, setCarouselImages] = useState<UpdatedData[]>([])
  // const [restaurantList, setRestaurantList] = useState<RestaurantList[]>([])
  const [offset, setOffset] = useState<number>(0)
  // const [totalPages, setTotalPages] = useState<number>(0)
  const [activePage, setActivePage] = useState<number>(1)
  // const [apiStatus, setApiStatus] = useState<ApiStatus>(
  //   apiStatusConstants.initial
  // )
  const limit: Limit = 9

  // useEffect(() => {
  //   getCarouselImages()
  // }, [activePage])

  // useEffect(() => {
  //   setApiStatus(apiStatusConstants.inProgress)
  //   getRestaurantList()
  // }, [activePage, offset])

  const carouselQuery = useQuery({
    queryKey: ['carouselImages'],
    queryFn: fetchCarouselImagesApi,
  })

  const restaurantQuery = useQuery({
    queryKey: ['restaurantList', activePage, offset, limit],
    queryFn: () => fetchRestaurantListApi(offset, limit),
  })

  // const getCarouselImages = async (): Promise<void> => {
  //   const jwtToken = Cookies.get('jwtToken')
  //   const apiUrl = `${process.env.REACT_APP_API_URL}restaurants-list/offers`
  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //     method: 'GET',
  //   }
  //   const response = await fetch(apiUrl, options)
  //   const data = await response.json()
  //   if (response.ok) {
  //     const updatedData: UpdatedData[] = data.offers.map(
  //       (eachItem: CarouselImage) => ({
  //         imageUrl: eachItem.image_url,
  //         id: eachItem.id,
  //       })
  //     )
  //     setCarouselImages(updatedData)
  //   }
  // }

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setActivePage(page)
    const newOffset = (page - 1) * limit
    setOffset(newOffset)
  }

  // const getRestaurantList = async (): Promise<void> => {
  //   const jwtToken = Cookies.get('jwtToken')
  //   const apiUrl = `${process.env.REACT_APP_API_URL}restaurants-list?offset=${offset}&limit=${limit}`
  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //     method: 'GET',
  //   }
  //   const response = await fetch(apiUrl, options)
  //   const data = await response.json()
  //   console.log(data, 'data')
  //   if (response.ok) {
  //     setApiStatus(apiStatusConstants.success)
  //     setTotalPages(Math.ceil(data.total / limit))
  //     const updatedData: RestaurantList[] = data.restaurants.map(
  //       (eachItem: RestaurantListData) => ({
  //         costForTwo: eachItem.cost_for_two,
  //         cusine: eachItem.cusine,
  //         groupByTime: eachItem.group_by_time,
  //         hasOnlineDelivery: eachItem.has_online_delivery,
  //         hasTableBooking: eachItem.has_table_booking,
  //         id: eachItem.id,
  //         imageUrl: eachItem.image_url,
  //         isDeliveryingNow: eachItem.is_delivering_now,
  //         location: eachItem.location,
  //         menuType: eachItem.menu_type,
  //         name: eachItem.name,
  //         opensAt: eachItem.opens_at,
  //         userRating: eachItem.user_rating,
  //       })
  //     )
  //     setRestaurantList(updatedData)
  //   } else {
  //     setApiStatus(apiStatusConstants.failure)
  //   }
  // }

  const renderSuccessView = () => {
    const { data: carouselImages } = carouselQuery
    const { data: restaurantListData } = restaurantQuery
    const restaurantList = restaurantListData?.restaurants || []
    const total = restaurantListData?.total || 0
    const totalPages = Math.ceil(total / limit)
    return (
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Roboto',
          mt: 4,
        }}
      >
        {/* Carousel Section */}
        <Box
          sx={{
            width: '1110px',
            height: '320px',
            borderRadius: '8px',
            overflow: 'hidden',
            mb: 4,
          }}
        >
          <Carousel
            selectedItem={0}
            showThumbs={false}
            showStatus={false}
            autoPlay
            infiniteLoop
          >
            {carouselImages?.map((element: UpdatedData) => (
              <Box key={element.id}>
                <img
                  src={element.imageUrl}
                  alt=''
                  style={{
                    width: '100%',
                    height: '320px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Carousel>
        </Box>

        {/* Restaurant List Section */}
        <Grid container spacing={2} sx={{ width: '1110px', mb: 4 }}>
          {restaurantList?.map((eachItem: RestaurantList) => (
            <Grid item xs={12} sm={6} md={4} key={eachItem.id}>
              <ItemCard
                eachItem={eachItem}
                data-testid={`restaurant-item-${eachItem.id}`}
              />
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={totalPages}
          page={activePage}
          onChange={handlePageChange}
          color='primary'
          sx={{ mb: 4 }}
        />
        <Footer />
      </Container>
    )
  }

  const renderLoadingView = (): JSX.Element => <LoadingView />

  const renderFailureView = (): JSX.Element => <FailureView />

  // const renderHomeView = (): JSX.Element | null => {
  //   switch (apiStatus) {
  //     case apiStatusConstants.success:
  //       return renderSuccessView()
  //     case apiStatusConstants.inProgress:
  //       return renderLoadingView()
  //     case apiStatusConstants.failure:
  //       return renderFailureView()
  //     default:
  //       return null
  //   }
  // }

  const renderHomeView = (): JSX.Element | null => {
    if (carouselQuery.isLoading || restaurantQuery.isLoading) {
      return renderLoadingView()
    } else if (carouselQuery.isError || restaurantQuery.isError) {
      return renderFailureView()
    } else {
      return renderSuccessView()
    }
  }

  return (
    <>
      <Header />
      {renderHomeView()}
    </>
  )
}

export default Home
