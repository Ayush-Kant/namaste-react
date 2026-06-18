import { useEffect, useState } from "react";
import ItemListMenu from "./ItemListMenu";

const RestaurantCategory = ({category , showItems, setShowIndex}) => {
    // const [showItems, setShowItems] = useState(false)
   // const [clicked, setClicked] = useState(false)
//    useEffect(()=>{
//     console.log(showItems);
//    },[showItems])
   
    function fetchItems(){
        // console.log("Clicked");
        // setShowItems(!showItems);
        setShowIndex()
        // setClicked(!clicked);
        // console.log(clicked);
    }
         return (
            <div >
                <span
                onClick={
                    ()=>fetchItems()
                } 
                className="w-9/12 m-auto flex justify-between border-y border-gray-200 cursor-pointer p-4 m-4 shadow-lg">
                <h2 className="font-bold text-xl p-4 my-6 ">
                    {category?.title}
                </h2>
                <h2 className="text-2xl">🔻</h2>
                </span>
                { showItems && <ItemListMenu itemCards={category?.itemCards}/>}
            </div>
    );
}
export default RestaurantCategory;