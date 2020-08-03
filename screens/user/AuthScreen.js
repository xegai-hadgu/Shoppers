import React, {useState} from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as firebase from "firebase";

import Card from "../../components/UI/CardToo";
import Colors from "../../constants/Colors";

const AuthScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const Login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        props.navigation.navigate('Shop');
      })
      .catch((error) => {
        console.log(error);
        if (error === "EMAIL_NOT_FOUND") {
          Alert.alert("Invalid Email", "Make sure you enter valid email.", [
            { text: "Try again" },
          ]);
        } else if (error === "INVALID_PASSWORD") {
          Alert.alert(
            "Invalid Password",
            "Make sure you enter valid password.",
            [{ text: "Try again" }]
          );
        } else {
          Alert.alert("Something went wrong", "please try again.", [
            { text: "Try again" },
          ]);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.header}>
          <FontAwesome5 name="shopware" size={80} color={Colors.primary} />
          <Text style={styles.title}>FlyBuy</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.body}>
          <View style={styles.view}>
            <TextInput
              style={styles.inputStyles}
              placeholder="Enter your Email"
              onChangeText={(email) => setEmail(email)}
              value={email}
              autoCapitalize='none'
            />
          </View>
          <View style={styles.view}>
            <TextInput
              style={styles.inputStyles}
              placeholder="Enter your Password"
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
              value={password}
              autoCapitalize='none'
            />
          </View>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.footer}>
          <Card style={styles.button} onPress={() => Login()}>
            <Text style={styles.text}>Sign in</Text>
          </Card>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Register")}
            style={styles.createAccount}
          >
            <Text>
              don't have account?{" "}
              <Text style={styles.createAccount}> Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d6e5fa",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#035aa6",
  },
  view: {
    marginVertical: 20,
  },
  inputStyles: {
    height: 60,
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 80,
    padding: 10,
    fontSize: 20,
    width: Dimensions.get("window").width - 80,
  },
  horizontalLine: {
    width: Dimensions.get("window").width - 40,
    height: 1,
    backgroundColor: Colors.primary,
  },
  button: {
    width: Dimensions.get("window").width - 80,
    height: 60,
    backgroundColor: "#0779e4",
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  createAccount: {
    fontWeight: "bold",
    color: Colors.accent,
    fontSize: 15,
  },
});

//removes nav bar
AuthScreen.navigationOptions = {
  headerShown: false,
};

export default AuthScreen;
