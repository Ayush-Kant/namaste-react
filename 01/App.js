//   <div id="parent">
//     <div id="child">
//         <h1></h1>
//     </div>
//   </div> 
   
const parent = React.createElement("div",{id:"parent"},
    [React.createElement("div",{id:"child"},
        [React.createElement("h1",{},"hello from nested react"),
        React.createElement("h2",{},"hello from nested react")]
    ),
React.createElement("div",{id:"child2"},
        [React.createElement("h1",{},"hello from nested react"),
        React.createElement("h2",{},"hello from nested react")]
    )]
)
   
//    const heading = React.createElement("h1",
//     {
//         id:"heading",
//         name: "h1"
//     },
//     "Hello from React");
   const root = ReactDOM.createRoot(document.getElementById("root"));
    
   //root.render(heading);
root.render(parent)

//for nested its complex hence we use jsx