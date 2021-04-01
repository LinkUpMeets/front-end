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

const SignUpForm2 = ({ page, setFormPage }) => {
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const formSelector = useSelector(({ formReducer }) => formReducer)

const handleNextForm = async () => {
    if(!formData.address || !formData.gender || !formData.age || !formData.phoneNumber) {
        console.error("missing fields");
    } else {
        await dispatch(getFormActions.moveToNextForm(formData));
        setFormPage('thirdPage');
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
          placeholder="Address."
          placeholderTextColor="#003f5c"
          onChangeText={(address) => setFormData({...formData, address})}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone Number."
          placeholderTextColor="#003f5c"
          onChangeText={(phoneNumber) => setFormData({...formData, phoneNumber})}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Age"
          placeholderTextColor="#003f5c"
          onChangeText={(age) => setFormData({...formData, age})}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Description."
          placeholderTextColor="#003f5c"
          onChangeText={(description) => setFormData({...formData, description})}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Gender."
          placeholderTextColor="#003f5c"
          onChangeText={(gender) => setFormData({...formData, gender})}
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

export default SignUpForm2;