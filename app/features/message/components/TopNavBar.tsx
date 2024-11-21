import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';

type ParamList = {
  MessageFeaturesStacks: {
    screen: string;
  };
};

type Props = PropsWithChildren<{
  title: string;
  //   avatarSource: string;
  onOpenPopup: () => void;
}>;

const TopNavBar = ({title, onOpenPopup}: Props) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  return (
    <View style={styles.customHeaderWrapper}>
      <IconButton
        icon="arrow-left"
        iconColor="white"
        onPress={() => navigation.goBack()}
        // containerColor="black"
      />
      <Image
        source={require('../../../assets/images/pensquare.png')}
        style={styles.avatar}
      />
      <Text
        style={styles.name}
        numberOfLines={1}
        ellipsizeMode="tail"
        onPress={() =>
          navigation.navigate('MessageFeaturesStacks', {
            screen: 'FriendPersonalInfo',
          })
        }>
        {title}
      </Text>
      <IconButton
        icon="information-outline"
        iconColor="white"
        onPress={onOpenPopup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  customHeaderWrapper: {
    height: 60,
    width: '100%',
    backgroundColor: '#C02135',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginLeft: 5,
    flex: 1,
  },
});

export default TopNavBar;
