import { useEffect, useState } from "react"

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStatus] = useState(true);
    useEffect(()=>{
        onlineStatusSetter();
    },[onlineStatus])
    function onlineStatusSetter(){
         addEventListener("offline", (event) => { 
        setOnlineStatus(false);
    }) 
    }
    return onlineStatus;
}
export default useOnlineStatus;