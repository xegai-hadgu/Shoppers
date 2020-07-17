import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import CardItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((carItem) => (
            <CardItem
              key={carItem.productId}
              quantity={carItem.quantity}
              amount={carItem.sum}
              title={carItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
