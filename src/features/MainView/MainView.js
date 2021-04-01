import React, { useState, useEffect, useRef } from "react";
import { View, Text, Modal, TouchableHighlight, Image, Button } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-native';
import * as getUserActions from '../../actions/userActions'
import { debugLogging } from '../../utils/utils';
import { getAllUsersInLocation, getUserAccount, populateMatchedUsers, addUserToLocation } from '../../utils/API';
import ConfettiCannon from 'react-native-confetti-cannon';
import Swiper from "react-native-deck-swiper";
import OverlayLabel from "../../components/OverlayLabel/OverlayLabel";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import IconButton from "../../components/IconButton/IconButton";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import profilepic from "../../assets/imgs/main-view/profilepic.jpeg";
import photo1 from "../../assets/imgs/main-view/photo1.jpeg";
import photo2 from "../../assets/imgs/main-view/photo2.jpeg";
import photo3 from "../../assets/imgs/main-view/photo3.jpeg";
import photo4 from "../../assets/imgs/main-view/photo4.jpg";
import photo5 from '../../assets/imgs/main-view/photo5.jpeg';
import styles from "./MainView.style";

const pictureArr = [photo4, profilepic, photo2, photo3, photo4, photo5];

const MainView = () => {
  const useSwiper = useRef(null);
  const explosion = useRef();
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const history = useHistory();
  const [userArray, setUserArray] = useState();
  const [users, setUsers] = useState();
  const [match, setMatch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [previousCardIndex, setPreviousCardIndex] = useState(0);
  const userState = useSelector(({ userReducer }) => userReducer)
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const { data } = await getAllUsersInLocation(locationId)
    let tempUserArrayForPictures = data.users.filter(user => user._id !== userState._id)
    for(let i = 0; i < tempUserArrayForPictures.length; i++) {
      tempUserArrayForPictures[i].image.push(pictureArr[i]);
    }
    setUsers(tempUserArrayForPictures)
  }

  const handleOnSwipedRight = async index => {
    debugLogging(53, index)
    setCurrentCardIndex(index + 1)
    setPreviousCardIndex(index)
    let currentUserCard = useSwiper.current.props.cards[index];
    dispatch(getUserActions.updateSwipeRightOnUser(currentUserCard, userState._id))
    await addUserToLocation({userId: userState._id}, locationId);
    const res = await getUserAccount(currentUserCard._id)
    const exisitingId = res.data.likedUsers.find(match => match.accountId)?.accountId
    if(userState._id === exisitingId) {
      await populateMatchedUsers(userState._id, {matchUserId: currentUserCard._id})
      explosion.current.start()
      setModalVisible(true);
    }

    // setUsers(newData);
    // const userId = 99;
  };
  const goToChat = () => {
    console.log("this goes to chat")
    setModalVisible(!modalVisible);
  }

  const handleTap = index => {
    history.push("/currentprofile/" + index)
  }

  
  // debugLogging(142, profilepic)
  
  if (!users) return <LoadingScreen />;
  if (!userState) return <LoadingScreen />;
  const checkEndOfCardLength = users.length === currentCardIndex

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        {checkEndOfCardLength ? <Text>You have no more stacks</Text> : <Swiper
          ref={useSwiper}
          animateCardOpacity
          containerStyle={styles.container}
          cards={users}
          renderCard={(card) => <ProfileCard card={card} />}
          currentCardIndex={currentCardIndex}
          backgroundColor='white'
          stackSize={2}
          showSecondCard
          animateOverlayLabelsOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              element: <OverlayLabel label='UNLYKE' color='#E5566D' />,
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: "LIKE",
              element: <OverlayLabel label='LYKE' color='#4CCC93' />,
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: "flex-start",
                  marginLeft: 30,
                },
              },
            },
          }}
          onSwipedRight={handleOnSwipedRight}
          onTapCard={handleTap}
          // onSwipedAll={() => setCurrentCardIndex(users.length)}
        />}
      </View>
      <ConfettiCannon count={200} origin={{x: -10, y: 0}} autoStart={false} ref={explosion} fadeOut/>
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
             <Image source={users[previousCardIndex].image[0]} resizeMode="contain" style={{height: 200, width: 250}}/>
             <Text style={styles.modalText}>Great, you've matched!</Text>
 
             <Button
             title="Let's Chat"
               style={{ ...styles.openButton }}
               onPress={goToChat}
             >
               <Text style={styles.textStyle}>Let's chat!</Text>
             </Button>
 
             <Button
             title="I'll chat later..."
               style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
               onPress={() => setModalVisible(!modalVisible)}
             >
               <Text style={styles.textStyle}>I'll chat later...</Text>
             </Button>
           </View>
         </View>
       </Modal>
      
      {/* <View style={styles.buttonsContainer}>
        <IconButton
          name="close"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
        />
        <IconButton
          name="star"
          onPress={handleOnSwipedTop}
          color="white"
          backgroundColor="#3CA3FF"
        />
        <IconButton
          name="heart"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#4CCC93"
        />
      </View> */}
    </View>
  );
};
export default MainView;
