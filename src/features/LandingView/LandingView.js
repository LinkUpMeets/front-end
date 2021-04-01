import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useHistory } from "react-router-native";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Container, Text, Button } from 'native-base';
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import landingbg from "../../assets/imgs/main-view/landing.jpeg";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "Pacifico_400Regular",
    fontSize: 48,
    color: "#ED7D7D",
    marginTop: "10%",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  button: {
    backgroundColor: "#0388A6",
    maxHeight: 75,
    maxWidth: 180,
    height: "100%",
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center"
  },
  buttonText: {
    color: "#ED7D7D",
    fontFamily: "Pacifico_400Regular",
    fontSize: 36,
    textAlign: "center",
    textAlignVertical: "center"
  },
});

const LandingView = () => {
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  const history = useHistory();

  const handlePress = () => {
      history.push("/eula");
  };

  if (!fontsLoaded) return <LoadingScreen />;

  return (
    <Container style={styles.container}>
      <ImageBackground source={landingbg} style={styles.image}>
        <Text style={styles.text} allowFontScaling>Lynks</Text>
        <Button style={{...styles.button, marginTop: "10%"}} bordered dark onPress={handlePress}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
        <Button style={{...styles.button, marginTop: "3%"}} bordered dark>
            <Text style={styles.buttonText}>Login</Text>
        </Button>
      </ImageBackground>
    </Container>
  );
};

export default LandingView;
