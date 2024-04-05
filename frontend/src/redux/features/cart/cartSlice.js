import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cart";

// Retrieve initial state from local storage or set default values
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Card (stripe)" };

// Create a slice of the Redux store for the shopping cart
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState, // Initial state for the slice
  reducers: {
    // Action to add an item to the cart
    addToCart: (state, action) => {
      // Destructure the payload
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      // Check if the item already exists in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // If the item exists, update its details; otherwise, add it to the cart
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      // Update the cart in local storage and return the updated state
      return updateCart(state, item);
    },

    // Action to remove an item from the cart
    removeFromCart: (state, action) => {
      // Filter out the item with the specified ID
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      // Update the cart in local storage and return the updated state
      return updateCart(state);
    },

    // Action to save the shipping address
    saveShippingAddress: (state, action) => {
      // Update the shipping address in the state and local storage
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Action to save the payment method
    savePaymentMethod: (state, action) => {
      // Update the payment method in the state and local storage
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Action to clear all items from the cart
    clearCartItems: (state, action) => {
      // Clear the cart items in the state and local storage
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Action to reset the cart to its initial state
    resetCart: (state) => (state = initialState),
  },
});

// Export individual action creators and the reducer
export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
