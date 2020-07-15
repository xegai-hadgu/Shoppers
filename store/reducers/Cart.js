import { ADD_TO_CART } from "../actions/Cart";
import CartItem from "../../models/cart-item";
import { ReactReduxContext } from "react-redux";

const intialState = {
  items: {},
  totalItems: 0,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const prodictTitle = addedProduct.title;

      //if the item is already in cart increment totalItams, total price 
      //otherwise simply add to the cart
      if (state.items[addedProduct.id]) {
        const updateCarItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          prodictTitle,
          state.items[addedProduct.id].sum + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updateCarItem },
          totalItems: state.totalItems + productPrice,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          productPrice,
          prodictTitle,
          productPrice
        );
        return {
          ...state,
          items: { ...state.itemsm, [addedProduct.id]: newCartItem },
          totalItems: state.totalItems + productPrice,
        };
      }
  }
  return state;
};
