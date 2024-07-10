import React from 'react';
import{useState, useEffect} from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Cookies from 'js-cookie';
import Header from "../Header"
import ItemCard from '../ItemCard';
import { FaSquarePinterest } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import FooterLogo from "../../assets/FooterLogo.jpg";
import { PiLessThan } from "react-icons/pi";
import { PiGreaterThan } from "react-icons/pi";


import "./index.css";

interface CarouselImage {
    id: number;
    image_url: string;
  }

interface UpdatedData {
    imageUrl: string;
    id: number;
}  


interface UserRatingData {
    rating: number;
    rating_color: string;
    rating_text: string;
    total_reviews: number;
}

interface RestaurantList {
    costForTwo: number;
    cusine: string;
    groupByTime: boolean;
    hasOnlineDelivery: boolean;
    hasTableBooking: number;
    id: string;
    imageUrl: string;
    isDeliveryingNow: number;
    location: string;
    menuType: string;
    name: string;
    opensAt: number;
    userRating: UserRatingData;
}

interface RestaurantListData {
    cost_for_two: number;
    cusine: string;
    group_by_time: boolean;
    has_online_delivery: boolean;
    has_table_booking: number;
    id: string;
    image_url: string;
    is_delivering_now: number;
    location: string;
    menu_type: string;
    name: string;
    opens_at: number;
    user_rating: UserRatingData;
}



const Home = () => {
    const [carouselImages, setCarouselImages] = useState<UpdatedData[]>([]);
    const [restaurantList, setRestaurantList] = useState<RestaurantList[]>([]);
    const [limit, setLimit] = useState<number>(9);
    const [offset, setOffset] = useState<number>(0);
    useEffect(() => {   
        getCarouselImages();                    
    }, []);

    useEffect(() => {
        getRestaurantList();
    }   ,[offset, limit])

    const getRestaurantList = async () => {
        const jwtToken = Cookies.get('jwtToken');
        const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}`;
        const options = {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
          }
       const response= await fetch(apiUrl, options)
        const data = await response.json();
        console.log(data);
        if(response.ok){
            const updatedData:RestaurantList[] = data.restaurants.map((eachItem:RestaurantListData) => ({
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
                userRating: eachItem.user_rating
            }))
            setRestaurantList(updatedData)
            console.log(restaurantList)   
            console.log(restaurantList)
        }
    }


    const getCarouselImages = async () => { 
        const jwtToken = Cookies.get('jwtToken');
        const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers';
        const options = {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
          }
       const response= await fetch(apiUrl, options)
        const data = await response.json();
        console.log(data);
        if(response.ok){
            const updatedData:UpdatedData[] = data.offers.map((eachItem:CarouselImage) => ({
                imageUrl: eachItem.image_url,
                id: eachItem.id
            }))
            setCarouselImages(updatedData)
            console.log(carouselImages)   
        }   
    }

    const currentSlide = 0; 

    const onclickBackPage = () => { 
        if(offset>0){
            setOffset((prevVal)=> prevVal - 9)
            setLimit((prevVal)=> prevVal - 9)
        }
        console.log(offset, limit)
        getRestaurantList()
    }

    const onclickRightPage = () => {
        setOffset((prevVal)=> prevVal + 9)
        setLimit((prevVal)=> prevVal + 9)
        console.log(offset, limit)
        getRestaurantList()
    }


  return (
    <div>
    <Header/>
    <div className='home-container'> 

      <div className='carousel-container'>
            <Carousel selectedItem={currentSlide} showThumbs={false} showStatus={false} autoPlay infiniteLoop>
                {carouselImages.map((element:UpdatedData) => (
                <div key={element.id}>
                    <img src={element.imageUrl} alt="" />
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
        {restaurantList.map((eachItem:RestaurantList) => (
            <ItemCard 
                eachItem={eachItem}       
            />  ))}
      </ul>
      <div className='page-container'>
        <button type='button' onClick={onclickBackPage} className='page-button' style={{marginRight: "5px"}}><PiLessThan />
        </button>
        <p> {offset} to {limit} </p>
        <button type='button' onClick={onclickRightPage} className='page-button' style={{marginLeft: "5px"}}><PiGreaterThan /></button>
      </div>
      <div className='footer-container'>
        <div className='footer-logo-heading-container'>
            <img src={FooterLogo} alt ='footerlogo' className='footer-image'/>
            <p className='footer-heading'>Tasty Kitchens</p>
        </div>
        <p className='footer-msg'>The only thing we are serious about is food.</p>
        <p className='footer-msg'>Contact us on</p>
        <div>
            <FaSquarePinterest className='footer-icons'/>
            <FaInstagram   className='footer-icons'/>
            <FaTwitter className='footer-icons'/>
            <FaFacebookSquare className='footer-icons'/>  
        </div>
      </div>

    </div>
      
    </div>
  );
};

export default Home;