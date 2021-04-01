import React from "react";
import { Text } from "native-base";
import { StyleSheet } from "react-native";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const styles = StyleSheet.create({
  text: {
    fontFamily: "Pacifico_400Regular",
    fontSize: 32,
    color: "#ED7D7D",
    bottom: "0%",
    height: '120%',
    width: "100%",
    left: "3%",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.85)",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 6,
  },
});

const Logo = () => {
    const [fontsLoaded] = useFonts({
        Pacifico_400Regular,
      });

      if (!fontsLoaded) return <LoadingScreen />;
  return (
    <Text style={styles.text} allowFontScaling>
      Lynks🔗Dating
    </Text>
  );
};

export default Logo;
