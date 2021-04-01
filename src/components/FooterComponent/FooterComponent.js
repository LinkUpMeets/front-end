import React from 'react';
import { useHistory } from 'react-router-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';

const FooterComponent = () => {
  const history = useHistory();
    return (
        <Footer>
          <FooterTab>
            <Button onPress={() => history.push("/map")}>
              <Icon name="ios-navigate" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button active>
              <Icon active name="navigate" />
            </Button>
            <Button>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
    );
}

export default FooterComponent;