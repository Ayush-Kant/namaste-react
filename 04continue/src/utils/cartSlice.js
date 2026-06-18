import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
        name : "cart",
        initialState: {
            items: ["Burger","pizza"]
        },
    reducers:{
        addItem: (state, action)=> {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            console.log(action.payload); 
            state.items.pop();
        },
        clearCart: (state) => {
            state.items.length = 0; //state.items = [] -> this will not work
        }
    }
})
export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;