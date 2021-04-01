import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { Container, Text } from 'native-base';
import { useParams } from 'react-router-native';
import * as getUserAction from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount } from '../../utils/API';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const AccountView = () => {
    const { id } = useParams();
    const [accountInfo, setAccountInfo] = useState();
    const dispatch = useDispatch();
    const userState = useSelector(({ userReducer }) => userReducer)

    useEffect(() => {
        dispatch(getUserAction.getUser(id))
      }, []);

    if(!userState) return <LoadingScreen />

    return (
        <Container>
            <Text>This is Account View</Text>
            <Text>{userState.firstName}</Text>
        </Container>
    )
}

export default AccountView;