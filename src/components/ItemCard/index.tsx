import React from "react";

import { BsStarFill } from "react-icons/bs";

import "./index.css";




interface UserRating {
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
        userRating: UserRating;
    }

interface ItemCardProps {   
    eachItem: RestaurantList;
}
        

const ItemCard: React.FC<ItemCardProps> = ({eachItem}) => {
    console.log(eachItem.userRating);
    const userRating: UserRating = eachItem.userRating;
    const updatedUserRating = {
        rating: userRating.rating,
        ratingColor: userRating.rating_color,
        ratingText: userRating.rating_text,
        totalReviews: userRating.total_reviews,
    }
    return (
        <li className="item-card-container">
            <img src={eachItem.imageUrl} alt ="" className="menu-item-img"/>
            <div className="menu-item-content">
                <p className="item-name">{eachItem.name}</p>
                <p className="item-type">{eachItem.menuType}</p>
                <div className="rating-container">
                    <BsStarFill style={{color:"yellow"}}/>
                    <span className="rating">{eachItem.userRating.rating}</span> <span className="review">({`${updatedUserRating.totalReviews} ratings`})</span>
                </div>
            </div>
        </li>
    );
}

export default ItemCard;