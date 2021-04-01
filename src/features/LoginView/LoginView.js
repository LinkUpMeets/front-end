import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import * as getUserAction from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-native';
import { loginUser } from '../../utils/API';
import decode from 'jwt-decode';
import DismissKeyboard from '../../components/DisMissKeyboard/DisMissKeyboard';
import logo from '../../assets/imgs/login-view/femalesymbol.jpg';
 
const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
      try {
          const userCreds = {
            username,
            password
          };
          const data = await dispatch(getUserAction.login(userCreds));
          if(data) {
            history.push(`/map`);
          } else {
            console.log("there is an error loginin");
          }
          // history.push(`/userprofile/${id}`);
      } catch(err) {
          console.error(err)
      }
  }
 
  // console.log(userState);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo} />
 
      <StatusBar style="auto" />
      <DismissKeyboard>
      <>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setUsername(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      </>
      </DismissKeyboard>
 
      <TouchableOpacity style={styles.loginBtn} onPress={() => history.push("/signup")}>
        <Text>SIGN UP</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit} >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    height: 100,
    width: 100,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});

export default LoginView;