import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { Container, Content, Header, Text } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';

const MatchView = () => {
    return (
        <Container>
            <Grid>
                <Row>
                    <Col>
                        <Text>Match View Page</Text>
                    </Col>
                </Row>
            </Grid>
        </Container>
    )
}

export default MatchView;