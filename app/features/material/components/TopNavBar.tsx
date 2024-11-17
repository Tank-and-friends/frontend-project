import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';

type Props = PropsWithChildren<{
  title: string;
  onOpenPopup: () => void;
}>;

const TopNavBar = ({title, onOpenPopup}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.customHeaderWrapper}>
      <IconButton
        icon="arrow-left"
        iconColor="white"
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <IconButton
        icon="dots-vertical"
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
