import React from "react";
import { StyleSheet } from "react-native";
import { Container, Header, Text, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useHistory } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    fontFamily: "Pacifico_400Regular",
    fontSize: 30,
    color: "#ED7D7D",
    textAlign: "center",
    // textShadowColor: 'rgba(0, 0, 0, 0.85)',
    // textShadowOffset: {width: 5, height: 5},
    // textShadowRadius: 10,
  },
  button: {
    backgroundColor: "#0388A6",
    maxHeight: 75,
    maxWidth: 180,
    height: "100%",
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#ED7D7D",
    fontFamily: "Pacifico_400Regular",
    fontSize: 36,
    textAlign: "center",
    textAlignVertical: "center"
  },
});

const EULAView = () => {
const history = useHistory();
  const handlePress = () => {
    history.push("/home");
  };

  return (
    <Container>
      <Header>
        <Text style={styles.text} allowFontScaling>
          Lynks🔗Dating
        </Text>
      </Header>
      <Grid>
        <Row size={65}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et repellat
            excepturi saepe nesciunt tempore atque doloribus facilis, natus
            sequi, expedita explicabo ea praesentium vitae aspernatur deserunt
            hic itaque iusto illo animi sed ad tenetur. Est asperiores dicta
            cupiditate veniam laboriosam error quasi voluptas aliquam fugiat
            itaque ut repellendus optio doloremque, iure veritatis magnam
            nostrum amet, sequi dignissimos aliquid. Adipisci excepturi
            veritatis provident, inventore, in placeat laborum doloremque
            aperiam beatae impedit ratione illum, officiis delectus totam fuga
            sequi a reiciendis eveniet sit. Placeat illum quasi aperiam neque
            nemo incidunt cumque voluptatibus ad ab accusantium itaque magni
            vitae, impedit recusandae maiores autem, unde repellendus delectus
            corporis error deserunt aut! Inventore, tenetur temporibus
            consequatur soluta quidem, amet architecto nesciunt error neque qui
            id sunt enim fugit ipsum sed eos facilis officiis voluptate? Dicta
            fuga optio quibusdam! Distinctio fugiat a cum sed architecto
            officiis, molestiae nihil sunt debitis ipsa quam repellat, quia eius
            similique.
          </Text>
        </Row>
        <Row size={35}>
          <Button style={styles.button} bordered dark onPress={handlePress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
          <Button style={styles.button} bordered dark>
            <Text style={styles.buttonText}>Login</Text>
          </Button>
        </Row>
      </Grid>
    </Container>
  );
};

export default EULAView;
