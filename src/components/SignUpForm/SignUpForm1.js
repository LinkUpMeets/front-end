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
import styles from './SignUpForm.style';
import formReducer from "../../reducers/formReducer";
import * as getFormActions from '../../actions/formActions';

const SignUpForm1 = ({ page, setFormPage }) => {
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const formSelector = useSelector(({ formReducer }) => formReducer)

//   const handleSubmit = async () => {
//       try {
//           const userCreds = {
//             username,
//             password
//           };
//           const data = await dispatch(getUserAction.login(userCreds));
//           if(data) {
//             history.push(`/map`);
//           } else {
//             console.log("there is an error loginin");
//           }
//           // history.push(`/userprofile/${id}`);
//       } catch(err) {
//           console.error(err)
//       }
//   }


const handleNextForm = async () => {
    if(!formData.username || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
        console.error("missing fields");
    } else {
        await dispatch(getFormActions.moveToNextForm(formData));
        setFormPage('secondPage');
    }
}
 
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <DismissKeyboard>
          <>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username."
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setFormData({...formData, username})}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setFormData({...formData, password})}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          onChangeText={(firstName) => setFormData({...formData, firstName})}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name."
          placeholderTextColor="#003f5c"
          onChangeText={(lastName) => setFormData({...formData, lastName})}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setFormData({...formData, email})}
        />
      </View>
      </>
      </DismissKeyboard>

      <TouchableOpacity style={styles.loginBtn} onPress={handleNextForm}>
        <Text style={styles.loginText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUpForm1;