import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import heart from './heartbeating.json'

const LoadingScreen = () => {
    return (
        <LottieView source={heart} autoPlay loop/>
    )
};

export default LoadingScreen