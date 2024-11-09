import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Icon, IconButton, Text, TextInput, Button } from 'react-native-paper';
import React from 'react';

export default function ClassSquare() {
  return (
    <View style={styles.classSquareContainer}>
      <Image
        source={require('../../../assets/images/ClassBackground.jpg')}
        style={[styles.backgroundImage, {borderRadius: 10}]}
        resizeMode="stretch"
      />
      <View style={styles.Box}>
        <Text style={styles.Text}>Đại cương</Text>
      </View>
      <View style={styles.classTitle}>
        <Text style={{
          color: 'black',
          fontWeight: 'semibold',
          fontSize: 12,
          fontFamily: 'Inter',
          textShadowColor: 'white',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 4,
        }}>Calculus I</Text>
        <Text style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 16,
          fontFamily: 'Inter',
          textShadowColor: 'white',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 4,
        }}>Giải tích I</Text>
      </View>
      

    </View>
  )
}

const styles = StyleSheet.create({
  classSquareContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column-reverse',
    width: 200,
    height: 150,
    borderRadius: 10,
    marginLeft: 30,
    padding: 20,
  },
  classTitle: {
    width: '90%',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',    
    marginBottom: 10,
    maxWidth: 200
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%'
  },
  switchButton: {
    marginHorizontal: 5,
    width: '45%',
    backgroundColor: '#BA1B30'
  },
  activeButton: {
    backgroundColor: '#FF7F11',
  },

  scrollableContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  screenContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box: {
    backgroundColor: '#174fb2',
    borderRadius: 4, 
    width: 80,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: 'white', 
    fontSize: 10, 
  },
});