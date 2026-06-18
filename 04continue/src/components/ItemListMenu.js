import { CDN_URL } from "../utils/constants";

const ItemListMenu = ({ itemCards }) => {
    return (
           itemCards?.map((item) => {
                const info = item?.card?.info;
                  return (
                    <div
                        className="flex gap-4 p-4 "
                        key={info?.id}
                    >
                        <span className="my-2 py-2 w-9/12 m-auto flex justify-between border-b border-gray-200">
                        <img
                            className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                            src={CDN_URL + info?.imageId}
                            alt={info?.name}
                        />

                        <div className="p-4 m-2 flex flex-col justify-center flex-1">
                            <h3 className="text-lg font-semibold">
                                {info?.name}
                            </h3>

                            <p className="text-gray-600 text-sm mt-2">
                                {info?.description}
                            </p>

                            <h4 className="text-green-600 font-bold mt-3">
                                ₹ {(info?.price || info?.defaultPrice ||0) / 100}
                            </h4>
                        </div>
                        <button className="border border-green-600 text-white bg-green-400 h-10 w-20 p-2 m-2 rounded-2xl cursor-pointer">+ ADD</button>
                        </span>
                        
                    </div>
                );
            } 
    )
             )
        }
   

            

              

export default ItemListMenu;
