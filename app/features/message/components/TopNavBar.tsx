import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import avatar from '../../../assets/images/pensquare.png';

type Props = PropsWithChildren<{
  title: string;
  //   avatarSource: string;
}>;

const TopNavBar = ({title}: Props) => {
  const navigation = useNavigation();
  return (
    <View>
      <IconButton
        icon="arrow-left"
        iconColor="white"
        onPress={() => navigation.goBack()}
      />
      <Image src={avatar} style={styles.avatar} />
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <IconButton icon="information-outline" iconColor="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  customHeaderWrapper: {
    height: 76,
    width: '100%',
    backgroundColor: '#C02135',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginLeft: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },
});

export default TopNavBar;
