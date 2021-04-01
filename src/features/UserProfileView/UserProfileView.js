import React, { useState, useEffect } from 'react';
import { View, Image, TouchableHighlight, Dimensions } from 'react-native';
import { useParams } from 'react-router-native';
import * as getUserAction from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Text, Content } from 'native-base';
import IconButton from "../../components/IconButton/IconButton";
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import styles from './UserProfileView.style';
import profilepic from "../../assets/imgs/main-view/profilepic.jpeg";
import photo1 from "../../assets/imgs/main-view/photo1.jpeg";
import photo2 from "../../assets/imgs/main-view/photo2.jpeg";
import photo3 from "../../assets/imgs/main-view/photo3.jpeg";
import photo4 from "../../assets/imgs/main-view/photo4.jpg";

const userMatches = [
    {
      name: "Jennifer",
      distance: 3,
      photo: [profilepic, photo1, photo2, photo3, photo4],
      age: 24,
      about:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quam dolor laudantium dolorum molestiae exercitationem officiis quisquam consequuntur? Laborum in rerum temporibus numquam. Consequatur sed corrupti voluptatibus vel ea ut nulla iusto nemo laborum quae, earum facilis possimus placeat ratione.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quam dolor laudantium dolorum molestiae exercitationem officiis quisquam consequuntur? Laborum in rerum temporibus numquam. Consequatur sed corrupti voluptatibus vel ea ut nulla iusto nemo laborum quae, earum facilis possimus placeat ratione.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quam dolor laudantium dolorum molestiae exercitationem officiis quisquam consequuntur? Laborum in rerum temporibus numquam. Consequatur sed corrupti voluptatibus vel ea ut nulla iusto nemo laborum quae, earum facilis possimus placeat ratione.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quam dolor laudantium dolorum molestiae exercitationem officiis quisquam consequuntur? Laborum in rerum temporibus numquam. Consequatur sed corrupti voluptatibus vel ea ut nulla iusto nemo laborum quae, earum facilis possimus placeat ratione.",
      isLiked: false,
      id: 1,
    },
    {
      name: "Allison",
      distance: 13,
      photo: [profilepic, photo1, photo2, photo3, photo4],
      age: 27,
      about:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quam dolor laudantium dolorum molestiae exercitationem officiis quisquam consequuntur? Laborum in rerum temporibus numquam. Consequatur sed corrupti voluptatibus vel ea ut nulla iusto nemo laborum quae, earum facilis possimus placeat ratione.",
      isLiked: false,
      id: 2,
    },
    {
      name: "Katie",
      distance: 6,
      photo: [profilepic, photo1, photo2, photo3, photo4],
      age: 25,
      about:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quam dolor laudantium dolorum molestiae exercitationem officiis quisquam consequuntur? Laborum in rerum temporibus numquam. Consequatur sed corrupti voluptatibus vel ea ut nulla iusto nemo laborum quae, earum facilis possimus placeat ratione.",
      isLiked: false,
      id: 3,
    },
    {
      name: "Gaby",
      distance: 12,
      photo: [profilepic, photo1, photo2, photo3, photo4],
      age: 23,
      about:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quam dolor laudantium dolorum molestiae exercitationem officiis quisquam consequuntur? Laborum in rerum temporibus numquam. Consequatur sed corrupti voluptatibus vel ea ut nulla iusto nemo laborum quae, earum facilis possimus placeat ratione.",
      isLiked: false,
      id: 4,
    },
    {
      name: "Gina",
      distance: 23,
      photo: [profilepic, photo1, photo2, photo3, photo4],
      age: 25,
      about:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quam dolor laudantium dolorum molestiae exercitationem officiis quisquam consequuntur? Laborum in rerum temporibus numquam. Consequatur sed corrupti voluptatibus vel ea ut nulla iusto nemo laborum quae, earum facilis possimus placeat ratione.",
      isLiked: false,
      id: 5,
    },
  ];

const UserProfileView = () => {
    const [currentUser, setCurrentUser] = useState();
    // const [currentPhoto, setCurrentPhoto] = useState(0);
    const [iterator, setIterator] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();
    const userState = useSelector(state => {
      return state;
    })

    useEffect(() => {
        setCurrentUser(userMatches);
    }, []);

    useEffect(() => {
      dispatch(getUserAction.getUser(id))
    }, []);

    if(!currentUser) return <LoadingScreen />

    const handleChangeImage = () => {
        if(iterator < currentUser[id].photo.length - 1) {
            setIterator(iterator + 1);
        } else {
            setIterator(currentUser[id].photo.length - 1);
        }
    }
    // console.log(currentUser)
    return (
        <Content>
            <TouchableHighlight onPress={handleChangeImage}>
            <Image source={currentUser[id].photo[iterator]} alt="photos" style={{height: 450, width: 'auto'}} />
            </TouchableHighlight>
        <Text>{currentUser[id].about}</Text>
        </Content>
    )
};

export default UserProfileView;
