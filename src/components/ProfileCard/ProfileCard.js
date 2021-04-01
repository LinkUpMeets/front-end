import React from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { shape, string, number } from 'prop-types';
import styles from './ProfileCard2Style';
const ProfileCard = ({ card }) => (
  <View
    activeOpacity={1}
    style={styles.card}
  >
    <Image
      style={styles.image}
      source={card?.image[0]}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>
        {`${card?.firstName}, ${card?.age}`}
      </Text>
    </View>
  </View>
)

ProfileCard.propTypes = { 
  card: shape({
    photo: ImageSourcePropType,
    name: string,
    age: string,
  }).isRequired,
}
export default ProfileCard