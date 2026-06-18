import { useState, useEffect } from "react";
import useRestaurants from "./useRestaurants";
    
   
    const useRestaurantInfo = (resId)=>{
    //   const [restaurantInfo, setRestaurantInfo] = useState(null);
    //   useEffect(() => {
    //     fetchMenu();
    // }, [resId]);
    const restaurants = useRestaurants();
    // const fetchMenu = async () => {
        
        const restaurantInfo =restaurants
        .find(
            (res)=>String(res?.info?.id)===String(resId)
        );
    //     setRestaurantInfo(restaurant);
         
    // }
    return restaurantInfo;
}

export default useRestaurantInfo;