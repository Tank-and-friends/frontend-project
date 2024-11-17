import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ClassList({ route }: any) {
  const { className } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/Background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <Text style={styles.title}>Class List for {className}</Text>
      <View style={styles.classSquareContainerContainer}>
        <Image
            source={require('../../../assets/images/ClassBackground.jpg')}
            style={[styles.backgroundClassImage, { borderRadius: 10 }]}
            resizeMode="stretch"
        />
        <View style={styles.classSquareContainer}>
            <View style={styles.classTitle}>
                <Text style={styles.className}>
                    Calculus I
                </Text>
                <Text style={styles.classDetails}>
                    {className}
                </Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={styles.Box}>
                    <Text style={styles.Text}>Đại cương</Text>
                </View>
                <Text
                style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#174FB2',
                    textShadowColor: 'white',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2
                }}
                >
                Hiện còn 234 lớp
                </Text>

            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 10,
    textAlign: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundClassImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  classSquareContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: 20,
    paddingHorizontal: 40
  },
  classSquareContainerContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column-reverse',
    width: '95%',
    height: 140,
    borderRadius: 10,
    position: 'relative',
  },
  classTitle: {
    width: '90%',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
    maxWidth: 200,
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
  className: {
    color: 'black',
    fontWeight: 'semibold',
    fontSize: 16,
    fontFamily: 'Inter',
    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  classDetails: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Inter',
    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});
