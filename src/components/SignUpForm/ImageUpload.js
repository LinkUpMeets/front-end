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
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from 'react-native-image-picker';
import S3 from 'aws-sdk/clients/s3';
// import fs from 'react-native-fs';
import * as fs from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import * as SecureStore from 'expo-secure-store';
import * as getUserAction from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-native';
import { loginUser } from '../../utils/API';
import DismissKeyboard from '../../components/DisMissKeyboard/DisMissKeyboard';
import logo from '../../assets/imgs/login-view/femalesymbol.jpg';
import styles from './SignUpForm.style';
import formReducer from "../../reducers/formReducer";
import * as getFormActions from '../../actions/formActions';

const ImageUpload = ({ page, setFormPage }) => {
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const formSelector = useSelector(({ formReducer }) => formReducer)

const handleNextForm = async () => {
    // if(!formData.username || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
    //     console.error("missing fields");
    // } else {
    //     await dispatch(getFormActions.moveToNextForm(formData));
    //     // setFormPage('fourthPage');
    // }
    setFormPage("fourthPage");
};

const chooseImage = async () => {
  try{
    let options = {
      title: "Upload Prescription",
      takePhotoButtonTitle: "Take a Photo",
      chooseFromLibraryButtonTitle: "Select From Gallery",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
//  launchImageLibrary(options, async (response) => {
//     if (response.didCancel) {
//       console.log("User cancelled image picker");
//     } else if (response.error) {
//       console.log("ImagePicker Error: ", response.error);
//     } else if (response.customButton) {
//       console.log("User tapped custom button: ", response.customButton);
//       alert(response.customButton);
//     } else {
//       const file = {
//          uri: response.uri,
//          name: response.fileName,
//          type: "image/jpeg",
//       };
//       uploadImageOnS3(file);
//     }
//  });
ImagePicker.launchImageLibrary(options, async response => {
  console.log(response)
})
  } catch(err) {
    console.error(err)
  }
 };

 const uploadImageOnS3 = async (file) => {
    const s3bucket = new S3({
      accessKeyId: process.env.REACT_NATIVE_S3_ACCESS_ID,
      secretAccessKey: process.env.REACT_NATIVE_S3_SECRET,
      Bucket: process.env.REACT_NATIVE_S3_BUCKET,
      signatureVersion: 'v4',
    });
 let contentType = 'image/jpeg';
    let contentDeposition = 'inline;filename="' + file.name + '"';
    // const base64 = await fs.readFile(file.uri, 'base64');
    const base64 = await fs.getInfoAsync(fileUri);
    const arrayBuffer = decode(base64);
 s3bucket.createBucket(() => {
      const params = {
        Bucket: process.env.REACT_NATIVE_S3_BUCKET,
        Key: file.name,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType,
    };
 s3bucket.upload(params, (err, data) => {
      if (err) {
        console.log('error in callback');
      }
    console.log('success');
    console.log("Respomse URL : "+ data.Location);
    });
  });
 };
 
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.loginBtn} onPress={chooseImage}>
        <Text style={styles.loginText}>UPLOAD PHOTO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleNextForm}>
        <Text style={styles.loginText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUpload;