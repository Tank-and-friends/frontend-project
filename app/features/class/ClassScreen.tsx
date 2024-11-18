import React from 'react';
import {FlatList, ScrollView, StyleSheet, View, Image} from 'react-native';

const ClassScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/Background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default ClassScreen;
