import { CDN_URL } from "../utils/constants";

const RestaurantMenuHeader = (props) => {
            // const {resData} = props
            console.log(props);
            return (
                <div className="flex justify-between items-center">
                    {/* //we can insert inline style using jsx too - as seen here,
                    // we can also make a js object named
                    // styleCard = {backgroundColor = "#f0f0f0"} 
                    //and write style = { styleCard} here and it will work */}
                    <img 
                    className="w-150 p-5 m-5 pl-10"
                    alt="res-log" 
                    src={CDN_URL + props.cloudinaryImageId}
                    />
                <div className="flex flex-col items-center  pl-20">
                    <h1 className="text-4xl font-bold font-serif underline pb-5">{props.name} - {props.avgRating}⭐</h1>
        
                    <h3 className="text-1xl font-semibold font-serif pb-2">{props.costForTwo}</h3>
        
                    <h4 className="text-1xl font-semibold font-mono pb-4 underline">{props.cuisines.join(", ")}</h4>
        
                    <h4 className="text-2xl font-semibold font-sans pb-2">{props.areaName}</h4>
        
                    <h4 className="text-1xl font-semibold font-sans pb-2">{props.sla?.slaString}</h4>
        
                    <h6 className="text-1xl font-semibold font-sans pb-2">
                        {props.aggregatedDiscountInfoV3?.header}{" "}
                        {props.aggregatedDiscountInfoV3?.subHeader}
                    </h6>
        </div>
                </div>
            );
        };
export default RestaurantMenuHeader;