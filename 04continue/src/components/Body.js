import ResturantCard from "./ResturantCards";
import { ResturantCardPromoted } from "./ResturantCards";

//import resList from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import useRestaurants from "../utils/useRestaurants";
import useOnlineStatus from "../utils/useOnlineStatus";
import OfflineStatus from "./offlineStatus";
import UserContext from "../utils/UserContext";

const Body = () =>{
    const [listOfResturants, setListOfResturants] = useState([]);
     const [filteredListOfResturants, setFilteredListOfResturants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const restaurants = useRestaurants();

    const PromotedRestaurants = ResturantCardPromoted(ResturantCard)

      console.log("Body Rendered");
    useEffect( () => {
            setListOfResturants(restaurants);
                setFilteredListOfResturants(restaurants);
    },[restaurants]);
    useEffect(()=>{
        console.log("resturants modified - filteredListOfResturants dependent useEffect called");
    },[filteredListOfResturants]);

    
//     const fetchData = () => {
// //         const data = await fetch("https://corsproxy.io/?url="+"https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.3709&lng=85.3387&page_type=DESKTOP_WEB_LISTING")
// //             const json = await data.json();
// //             console.log(json);

// //              const restaurants = json?.data?.cards?.find(
// //     (card) =>
// //         card?.card?.card?.id === "restaurant_grid_listing_v2"
// // )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
                

        
               
//                // console.log(listOfResturants);

//     } 
//     // if(listOfResturants.length === 0){
//         //<h3>Loading...</h3>
//     //     return < Shimmer />

//     // }
    const onlineStatus = useOnlineStatus();
    if(!onlineStatus){
        return (<div>
            <OfflineStatus />
            </div>)
    }
  const {userName} = useContext(UserContext)
    return listOfResturants.length === 0 ? (< Shimmer />) 
    :(
        <div className="body">
            <div className="text-5xl font-serif font-bold mx-10 text-orange-500 font-stretch-100% font-">
                <h1>Hello {userName}, let's get hungryyy... 😉🤤</h1>
            </div>
            <div className="flex p-4 m-4 items-center">
                
                <div className="p-2 m-2">
                    <input className=" p-1 m-1 border-solid border-[1px] border-black" type="text" value={searchText} 
                    onChange={
                        (e) => {
                            const value = e.target.value
                            setSearchText(value)
                            if(value===""){
                            setFilteredListOfResturants(listOfResturants)
                        }
                        }
                    } ></input>
                    <button className="p-1 m-1 border-[1px] border-solid border-black cursor-pointer" onClick={ ()=>{
                        //console.log({searchText});
                        const filteredResturants = listOfResturants
                        .filter((res)=>{
                            return res.info.name.toLowerCase().includes(searchText.toLowerCase());
                        });
                        setFilteredListOfResturants(filteredResturants);
                        //console.log(filteredResturants);
                    }
                        
                    }>Search</button>
                </div>
                <div>
                <div className="p-1 m-1 border-solid border-black border-[1px]">
                    
                    <button 
                        onClick={ ()=>
                            {
                            const filteredList = listOfResturants.filter(
                                (res) => res.info.avgRating > 4)
                                    setFilteredListOfResturants(filteredList);
                            }
                    } className="cursor-pointer">Top Rated</button>
                </div>
                </div>
            </div>
            
            <div className="flex p-2 m-2 flex-wrap">
                
             {
                filteredListOfResturants.map((restaurant) => {

                    const { info } = restaurant;
                    console.log(info);
                    return (
                        <Link key={info.id} 
                        to={"/resturants/"+info.id}>
                            {
                            info.veg ? <PromotedRestaurants {...info} /> : <ResturantCard {...info} />
                            }
                            
                        </Link>
                    );
                })
             }
               
            </div>
        </div>
    )
}

export default Body;