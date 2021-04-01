import React, { useState, useEffect } from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Header, Text, Button, H1, H2 } from "native-base";
import { useSelector } from "react-redux";
import styles from "./SignUpForm.style";
import Loading from "../LoadingScreen/LoadingScreen";
import { createAccount } from "../../utils/API";
import { useHistory } from 'react-router-native';

const ConfirmView = () => {
  const formData = useSelector(({ formReducer }) => formReducer);
  const [formInfo, setFormInfo] = useState();
  const history = useHistory();
  useEffect(() => {
    setFormInfo(formData);
  }, []);

  const formFieldTitle = [
    "First Name:",
    "Last Name:",
    "Username:",
    "Email:",
    "Address:",
    "Description:",
    "Age:",
    "Phone Number:",
    "Gender:",
  ];
  const filterField = ["password", "image"];

  const createUser = async () => {
    try {
      const response = await createAccount(formInfo);
      history.push("/")
    } catch (err) {
      console.error(err);
    }
  };

  if (!formInfo) return <Loading />;

  const filterPasswordAndImageKey = Object.keys(formInfo)
    .filter((field) => !filterField.includes(field))
    .reduce((obj, key) => {
      obj[key] = formInfo[key];
      return obj;
    }, {});

  const formatFieldInfoToArray = Object.values(filterPasswordAndImageKey);

  const renderFormFields = (formFieldInfo, formFieldTitle) =>
    formFieldInfo.map((fields, i) => (
      <Row>
        <Col>
          <H1>{formFieldTitle[i]}</H1>
        </Col>
        <Col>
          <H2>{fields}</H2>
        </Col>
      </Row>
    ));

  return (
    <Grid>
      {renderFormFields(formatFieldInfoToArray, formFieldTitle)}
      <Row>
        <Col>
          <Button style={styles.signUpButton} onPress={createUser}>
            <Text>Sign Up</Text>
          </Button>
        </Col>
      </Row>
    </Grid>
  );
};

export default ConfirmView;
