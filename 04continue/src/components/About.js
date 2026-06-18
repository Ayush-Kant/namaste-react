import UserClassComponent from "./UserClassComponent";
import { Component } from "react";
class About extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
               <h1>About</h1> 
                <div className="user-card">
               <UserClassComponent url={"https://api.github.com/users/Ayush-Kant"}/>
                <UserClassComponent url={"https://api.github.com/users/singhsanket143"}/>
            </div>
            </div>
        )
    }
}
export default About;