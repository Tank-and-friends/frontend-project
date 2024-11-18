import {View, Image, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import avatar from '../../assets/images/bachmahoangtu.jpg';
import React, {PropsWithChildren} from 'react';

type Props = PropsWithChildren<{
  title: string;
}>;

export default function TopComponent({title}: Props) {
  return (
    <View style={{width: '100%'}}>
      <View style={styles.topContainer}>
        <Image source={avatar} style={styles.profileImage} />
        <Text
          style={{
            color: 'white',
            fontWeight: 'semibold',
            fontSize: 24,
            fontFamily: 'Inter',
          }}>
          {title}
        </Text>
        <IconButton
          icon="cog-outline"
          size={30}
          iconColor="white"
          style={{
            position: 'absolute',
            right: 20,
            top: 20,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  searchBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    width: '95%',
    borderRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
    marginHorizontal: 20,
    backgroundColor: 'green',
  },
});
