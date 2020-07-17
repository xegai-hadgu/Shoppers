import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/Cart";
import * as orderActions from "../../store/actions/order";
import Card from "../../components/UI/Card";

const CartScreen = (props) => {
  const cartTotalItems = useSelector((state) => state.cart.totalAmount);
  const cartItem = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        productQuantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => {
      a.productId > b.productId ? 1 : -1;
    });
  });

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalItems.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={cartItem.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartItem, cartTotalItems));
          }}
        />
      </Card>

      <FlatList
        data={cartItem}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.productQuantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            isDeleteIcon
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  summaryText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  amount: {
    fontSize: 18,
    color: Colors.primary,
  },
});

export default CartScreen;
