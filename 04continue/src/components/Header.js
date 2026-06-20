import { LOGO_URL } from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import ProfileBadge from "./ProfileBadge";
import LocationSearch from "./LocationSearch";

const Header = () =>{
    //let btnName = "Login"
  
    const [btnNameStateVar, setBtnNameStateVar] = useState("Login");
    console.log("Header rendered");
    const onlineStatus = useOnlineStatus();
    const userName = useContext(UserContext);
    useEffect(()=>{
        console.log("default useEffect From Header");
    })
    return (
        <div className="flex justify-between">
           <div className="logo-container">
            <img className="w-56"
            src={LOGO_URL}/>
            </div> 

            <div >
                <ul className="p-4 m-4 flex  items-center">
                    <li className="p-2 m-2">Online Status: {onlineStatus?"✅":"🔴"}  </li>
                    <li className="p-2 m-2"><Link to="/">Home</Link></li>
                    <li className="p-2 m-2">Cart</li>
                    <li className="p-2 m-2"><Link to="/about">About</Link></li>
                    <li className="p-2 m-2">Contact us</li>
                    <LocationSearch/>
                    <button className="py-1 px-2 m-2 border-[1px] border-solid border-gray-300 bg-gray-200 rounded-md hover:bg-gray-300"
                     onClick={()=>{
                        // btnName = "Logout";
                        // console.log(btnName);
                        btnNameStateVar === "Login" ?
                        setBtnNameStateVar("Logout") :
                        setBtnNameStateVar("Login");
                        console.log(btnNameStateVar);
                    }}>
                        {btnNameStateVar}
                    </button>
                      <li >
                        <ProfileBadge />
                        </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;