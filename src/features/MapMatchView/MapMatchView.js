import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Image, Modal, TouchableHighlight } from "react-native";
import { useHistory } from 'react-router-native';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import MapView, { Marker } from "react-native-maps";
import styles from "./MapMatchView.style";
import * as getUserAction from '../../actions/userActions';
import Loading from "../../components/LoadingScreen/LoadingScreen";
import {
  getLocationFromAddress,
  get25RadiusAddresses
} from "../../utils/API";
import { debugLogging } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import heart from "../../assets/imgs/map-view/marker-heart.png";

const MapMatchView = () => {
  const [searchValue, setSearchValue] = useState();
  const [position, setPosition] = useState();
  const [region, setRegion] = useState({
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0021,
  });
  const [currentRegion, setCurrentRegion] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [markerCoords, setMarkerCoords] = useState();
  const [currentId, setCurrentId] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector(({ userReducer }) => userReducer);


  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      getRegion(position.coords)
    });
  };

  const getRegion = async coords => {
    const { latitude, longitude } = coords;
    const location = await get25RadiusAddresses(latitude, longitude);
    setRegion({ ...region, ...coords, latitude, longitude });
    setMarkerCoords([
      ...location.data,
    ]);
  };
  
  const setNewRegion = async (regionCoords) => {
    const previousRegionLat = regionCoords.latitude.toFixed(6);
    const previousRegionLng = regionCoords.longitude.toFixed(6)
    // Check previous region and stop the event from calling API infinitely
    if(previousRegionLat === region.latitude.toFixed(6) && previousRegionLng === region.longitude.toFixed(6)) {
      return
    }
      getRegion(regionCoords)
  };

  const handleOpenModal = (e) => {
    const { id } = e.nativeEvent;
    setCurrentId(id);
    setModalVisible(true);
  };

  const handleViewLocationMatches = e => {
    setModalVisible(!modalVisible);
    history.push(`/main/${currentId}`);
  };

  const handleDeleteMarker = e => {
      const isDeleted = markerCoords.filter(marker => marker.id.toString() !== currentId);
      setMarkerCoords(isDeleted);
      setModalVisible(!modalVisible);
  }

  // const handleGoBackToCurrentLocation = () => {
  //   console.log("works?");
  //   setRegion(currentRegion);
  // };

  const handleTextChange = (text) => {
    setSearchValue(text);
  };

  const handlePostLynksLocation = async () => {
    try {
      const {
        data,
      } = await getLocationFromAddress(searchValue);
      const { lat, lng } = data.results[0].locations[0].latLng;
      await dispatch(getUserAction.updateLynksLocation(searchValue, userState._id));
      setRegion({ ...region, latitude: lat, longitude: lng });
      setMarkerCoords([
        ...markerCoords,
        { latitude: lat, longitude: lng, _id: markerCoords.length + 1, saved: false, },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  if (!markerCoords) return <Loading />;
  if (!region) return <Loading />;

  return (
    <Container>
      <MapView
        provider='google'
        style={{ flex: 1 }}
        region={region}
        initialRegion={region}
        paddingAdjustmentBehavior='automatic'
        showsMyLocationButton
        showsPointsOfInterest
        minZoomLevel={10}
        maxZoomLevel={16}
        onRegionChangeComplete={setNewRegion}
      >
        {markerCoords.map((coords, i) => (
          <Marker
            coordinate={coords}
            key={i}
            description='possible lynk locations'
            onPress={handleOpenModal}
            identifier={coords?._id}
          >
            <Image
              source={heart}
              resizeMode='contain'
              style={{ height: 60, width: 60 }}
            />
          </Marker>
        ))}
      </MapView>
      <View style={{ position: "absolute", top: 10, width: "100%" }}>
        <Grid>
          <Row>
            <Col size={85}>
              <TextInput
                style={styles.searchBar}
                placeholder={"Search"}
                placeholderTextColor={"#666"}
                onChangeText={handleTextChange}
              />
            </Col>
            <Col size={15}>
              <Button style={styles.searchButton} onPress={handlePostLynksLocation}>
                <Icon name='search' style={{ color: "black" }} />
              </Button>
            </Col>
          </Row>
        </Grid>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Would you like to view potential matches or delete this location?</Text>
            <Button
              style={{ ...styles.openButton }}
              onPress={handleViewLocationMatches}
            >
              <Text style={styles.textStyle}>View</Text>
            </Button>

            <Button
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={handleDeleteMarker}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default MapMatchView;
