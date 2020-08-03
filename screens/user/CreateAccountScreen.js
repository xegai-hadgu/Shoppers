import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import { FontAwesome5 } from "@expo/vector-icons";

import Card from "../../components/UI/CardToo";
import ApiKey from "../../constants/ApiKey";
import Colors from "../../constants/Colors";

const CreateAccount = (props) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKey.firebaseConfig);
  }

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const SignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        props.navigation.navigate("Auth");
      })
      .catch((error) => {
        console.log(error);
        if (error === "EMAIL_EXISTS") {
          Alert.alert("Email Aready Exist", "Email alraedy in file.", [
            { text: "OK" },
          ]);
        } else if (error === "Password should be at least 6 characters") {
          Alert.alert(
            "Weak Password",
            "Password should be at least 6 characters.",
            [{ text: "OK" }]
          );
        } else {
          Alert.alert("Something went wrong", "please try again", [
            { text: "OK" },
          ]);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.header}>
          <FontAwesome5 name="shopware" size={80} color={Colors.primary} />
          <Text style={styles.title}>Welcome to FlyBuy!</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.body}>
          <View style={styles.view}>
            <TextInput
              style={styles.inputStyles}
              placeholder="Enter your Email"
              onChangeText={(email) => setEmail(email)}
              value={email}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.view}>
            <TextInput
              style={styles.inputStyles}
              placeholder="Enter your Password"
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
              value={password}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.footer}>
          <Card style={styles.button} onPress={() => SignUp()}>
            <Text style={styles.text}>Sign up</Text>
          </Card>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Auth");
            }}
            style={styles.createAccount}
          >
            <Text>
              already have account? <Text style={styles.login}> log in</Text>{" "}
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
    marginTop: 10,
    fontWeight: "bold",
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
  login: {
    fontWeight: "bold",
    color: Colors.accent,
    fontSize: 15,
  },
});

export default CreateAccount;
