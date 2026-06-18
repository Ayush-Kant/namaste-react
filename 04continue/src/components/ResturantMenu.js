import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import RestaurantMenuHeader from "./RestaurantMenuHeader";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";
import ItemListMenu from "./ItemListMenu";
import RestaurantCategory from "./RestaurantCategory";

const ResturantMenu = () => {

         const { resId } = useParams();
            // console.log(resId);
    
    const restaurant = useRestaurantInfo(resId);
    const menu = useRestaurantMenu(resId);
    const [showIndex,setShowIndex] = useState(0);
    const [showItems,setShowItems] = useState(true);
    

    console.log("restaurant", restaurant);
console.log("menu", menu);

    if(!menu || !restaurant){

        return <Shimmer />;

    }

    return (

        <div>
            <div className="my-8 py-8 flex w-100% bg-orange-100 ">
                {
                
                <RestaurantMenuHeader {...restaurant.info} />
                }
                </div>
            

            {
                menu.map((category, index) => (
                    <RestaurantCategory
                        key={category.categoryId || category.title}
                        category={category}
                        showItems = {index===showIndex? true : false}
                        setShowIndex={()=> setShowIndex(index)}

                    />
                ))
            }

        </div>
    )
}
export default ResturantMenu;