import React from "react"

class UserClassComponent extends React.Component{
    constructor(props){
        super(props);

    // this.state = {
    //     // count1 : 0,
    //     // count2: 2,
    //     // count3: 3
    // }
      this.state = {
            userInfo: {
                name : "Dummy",
                location: "Dummy location"
            }
        }

    }
    async componentDidMount(){
        const data = await fetch(this.props.url);
        const json = await data.json();
        console.log(json);
        this.setState(
            {
                userInfo : json
            }
        );
    }
    
    render(){
        const {name, location, avatar_url} = this.state.userInfo
       return (
       
            <div className="user-card-info">
                <div >
                    <img src={avatar_url} 
                    className="about-user-logo-img" alt="avatar"></img>
                </div>

                <h3>Name: {name}</h3>
                <h4>{location}</h4>
            </div>
        
    ) 
    }
}
//     render(){
//         const {name}= this.props;
//         const {count1,count2,count3} = this.state
//         return (
//             <div>
//             <h1>Name: {name} </h1>
//             <h2>Count1 : {count1} -- Count2 : {count2} -- Count3: {count3 }</h2>
//             <button onClick={()=>{
//                 this.setState({
//                     count1 : this.state.count1 +1,
//                     count2: this.state.count2 +1
//                 });
//             }}>Count Increment</button>
//         </div>
//         )
//     }
// }
export default UserClassComponent;