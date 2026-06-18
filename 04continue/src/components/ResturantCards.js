import { CDN_URL } from "../utils/constants";

const ResturantCard = (props) => {
    // const {resData} = props
    console.log(props);
    return (
        <div className="p-2 m-2 font-semibold flex flex-col w-73 h-150 flex-wrap bg-gray-100 max-w-sm rounded overflow-hidden 
                shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-gray-300
                   transition
                duration-300  ease-in-out 
               " >
        {/* style={{ backgroundColor: "#f0f0f0"}}> */}
            {/* //we can insert inline style using jsx too - as seen here,
            // we can also make a js object named
            // styleCard = {backgroundColor = "#f0f0f0"} 
            //and write style = { styleCard} here and it will work */}
            <img 
            
            alt="res-log" 
            src={CDN_URL + props.cloudinaryImageId}
            />

            <h2 className="font-bold">{props.name}</h2>

            <h3>{props.costForTwo}</h3>

            <h4>{props.cuisines.join(", ")}</h4>

            <h4>{props.avgRating}⭐</h4>

            <h4>{props.areaName}</h4>

            <h4>{props.sla?.slaString}</h4>

            <h6>
                {props.aggregatedDiscountInfoV3?.header}{" "}
                {props.aggregatedDiscountInfoV3?.subHeader}
            </h6>

        </div>
    );
};

export const ResturantCardPromoted = (ResturantCard) => {
    return (props) => {
        return (
            <div>
           <label className="p-1 absolute bg-green-500 border border-white text-white rounded-r-lg">Pure Veg</label>
           <ResturantCard {...props} />
           </div>
        )
    }
}



export default ResturantCard;