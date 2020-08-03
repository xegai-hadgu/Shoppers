import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

function Card(props) {
  return (
    <TouchableOpacity
      style={{ ...styles.screen, ...props.style }}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: Dimensions.get("window").height - 200,
    width: Dimensions.get("window").width - 40,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "white",
  },
});

export default Card;
