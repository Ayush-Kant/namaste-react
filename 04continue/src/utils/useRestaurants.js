import { useEffect, useState } from "react";

const useRestaurants = () => {
    const [restaurants,setRestaurants] = useState([]);

    useEffect(()=>{
        fetchRestaurants()
    },[]);

    const fetchRestaurants = async () => {
        const data = await 
        fetch(
            "https://foody-backend-6uzs.onrender.com/api/restaurants"
        )
            const json = await data.json();

             const restaurantsData = json?.data?.cards
             ?.find(
                    (card) =>
                         card?.card?.card
                            ?.id === "restaurant_grid_listing_v2"
                    )
                    ?.card?.card?.gridElements?.infoWithStyle?.restaurants 
                    || [];
                    setRestaurants(restaurantsData);
    }
    return restaurants;

}
export default useRestaurants;