import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {getDirectImageLink} from '../../../utils/image';
import {SenderInfo} from '../../../models/Message';

type ParamList = {
  MessageFeaturesStacks: {
    screen: string;
  };
};

type Props = PropsWithChildren<{
  partner: SenderInfo;
}>;

const TopNavBar = ({partner}: Props) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  return (
    <View style={styles.customHeaderWrapper}>
      <IconButton
        icon="arrow-left"
        iconColor="white"
        onPress={() => navigation.goBack()}
        // containerColor="black"
      />
      {partner.avatar ? (
        <Image
          source={{uri: getDirectImageLink(partner.avatar)}}
          style={styles.avatar}
        />
      ) : (
        <View style={styles.avatar}>
          <Text>{partner.name.substring(0, 1)}</Text>
        </View>
      )}
      <Text
        style={styles.name}
        numberOfLines={1}
        ellipsizeMode="tail"
        onPress={() =>
          navigation.navigate('MessageFeaturesStacks', {
            screen: 'FriendPersonalInfo',
          })
        }>
        {partner.name}
      </Text>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
