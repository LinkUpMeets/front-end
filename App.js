// React dependancies
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";
import { Header } from "native-base";
import { Provider } from 'react-redux';
import configureUserStore from './src/store/userStore';

// Views import
import { LandingView } from "./src/features/LandingView/";
import EULAView from "./src/features/EULAView/EULAView";
import { MainView } from "./src/features/MainView";
import { MapMatchView } from "./src/features/MapMatchView";
import { UserProfileView } from './src/features/UserProfileView';
import { AccountView } from './src/features/AccountView';
import { LoginView } from './src/features/LoginView';
import { SignUpView } from './src/features/SignUpView';

// Component Imports
import NavBar from "./src/components/NavBar/NavBar";
import FooterComponent from './src/components/FooterComponent/FooterComponent';

// Redux config
const userStore = configureUserStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default function App() {
  return (
    <Provider store={userStore}>
    <NativeRouter>
      <Header style={styles}>
        <NavBar />
      </Header>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route exact path="/signup" component={SignUpView} />
        <Route exact path="/main/:locationId" component={MainView} />
        <Route exact path='/eula' component={EULAView} />
        <Route exact path='/home' component={MainView} />
        <Route exact path="/map" component={MapMatchView} />
        <Route exact path="/currentprofile/:id" component={UserProfileView} />
        <Route exact path="/userprofile/:id" component={AccountView} />
      </Switch>
      <FooterComponent />
    </NativeRouter>
    </Provider>
    // <LandingView />
  );
}
