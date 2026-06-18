import React from "react";
import ReactDOM from "react-dom/client";

//for multiline always use (....), not mandatory for single line jsx
const jsxHeading = (<h2 id="id1" className="head">
    Namaste from Jsx
    </h2>
    );  //it creates React Element

//React Components

//const HeadingJsx = () => <h1>heading</h1>; //--valid
// const HeadingJsx = () => (<h1 id="id1" className="head">
//     heading
//     </h1>); //also valid

// const HeadingJsx = () => {
//     return (<h1 id="id1" className="head">
//     heading
//     </h1>)
//     }; //also valid
const Title = () => <h1>title component</h1>;
const HeadingComponent = () => {
    return (
        <div id="div1" className="divHead">
            {100*3}
            <Title />
            {jsxHeading}
            <h1 id="id2" className="head">
                heading component
                
            </h1>
        </div>
        
    );
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent/>);






























//till lect-2


// import React from "react";
// import ReactDOM from "react-dom/client";



// //   <div id="parent">
// //     <div id="child">
// //         <h1></h1>
// //     </div>
// //   </div> 
   

// const parent = React.createElement("div",{ id : "parent" },
//     [React.createElement("div",{ id : "child" , key:"child1" },
//         [React.createElement("h1",{key:"h11"},"Hello from namaste React 😘"),
//         React.createElement("h2",{key:"h12"},"hello from nested react")]
//     ),
// React.createElement("div",{id:"child2",key:"child2"},
//         [React.createElement("h1",{key:"h21"},"hello from nested react"),
//         React.createElement("h2",{key:"h22"},"hello from nested react")]
//     )]
// )
   
// //    const heading = React.createElement("h1",
// //     {
// //         id:"heading",
// //         name: "h1"
// //     },
// //     "Hello from React");
//    const root = ReactDOM.createRoot(document.getElementById("root"));
    
//    //root.render(heading);
// root.render(parent)

// //for nested its complex hence we use jsx