import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import SignUpForm1 from '../../components/SignUpForm/SignUpForm1';
import SignUpForm2 from '../../components/SignUpForm/SignUpForm2';
import ImageUpload from '../../components/SignUpForm/ImageUpload';
import ConfirmView from '../../components/SignUpForm/ConfirmView';

const SignUpView = () => {
    const [formPage, setFormPage] = useState('firstPage');

    const renderForm = (currentPage) => {
        switch(currentPage) {
            case "firstPage":
                return <SignUpForm1 page={formPage} setFormPage={setFormPage}/>;
            case "secondPage":
                return <SignUpForm2 page={formPage} setFormPage={setFormPage}/>;
            case "thirdPage":
                // return <Text>Stuff</Text>
                return <ImageUpload page={formPage} setFormPage={setFormPage} />;
            case "fourthPage":
                return <ConfirmView />
            default:
                return;
        }
    };

    return (
        <Container>
            <Grid>
                <Row>
                    <Col>
                    {/* {formPage === 'firstPage' ? <SignUpForm1 page={formPage} setFormPage={setFormPage}/> : <SignUpForm2 page={formPage} setFormPage={setFormPage}/>} */}
                    {renderForm(formPage)}
                    </Col>
                </Row>
            </Grid>
        </Container>
    )
};

export default SignUpView;