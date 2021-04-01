import React, { useState } from "react";
import { Thumbnail, Fab, Icon, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import profilepic from "../../assets/imgs/profile/profilepic.jpeg";
import Logo from "../../components/Logo/Logo";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const handleGenderFilter = () =>
    !active ? setActive(true) : setActive(false);
  const goToProfile = () => {
    console.log(process.env.REACT_NATIVE_GOOGLE_MAP_API_KEY);
  };

  return (
    <Grid>
      <Col size={20}>
        <Button transparent onPress={goToProfile} style={{marginTop: "10%"}}>
          <Thumbnail source={profilepic} />
        </Button>
      </Col>
      <Col size={60} style={{ justifyContent: "center" }}>
        <Logo />
      </Col>
      <Col size={20}>
        <Fab
          active={active}
          direction='down'
          style={{ backgroundColor: "#5067FF", zIndex: 999 }}
          onPress={handleGenderFilter}
          containerStyle={{ top: "0%" }}
          position='topLeft'
        >
          <Icon type='MaterialCommunityIcons' name='gender-male-female' />
          <Button style={{ backgroundColor: "#34A34F" }}>
            <Icon name='logo-whatsapp' />
          </Button>
          <Button style={{ backgroundColor: "#3B5998" }}>
            <Icon name='logo-facebook' />
          </Button>
          <Button disabled style={{ backgroundColor: "#DD5144" }}>
            <Icon name='mail' />
          </Button>
        </Fab>
      </Col>
    </Grid>
  );
};

export default Navbar;
