import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, Image, GestureResponderEvent} from 'react-native';
import {Icon, IconButton, Text} from 'react-native-paper';
import {
  GestureHandlerRootView,
  Pressable,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import excel from '../../../assets/images/excel.png';
import img from '../../../assets/images/img.png';
import pdf from '../../../assets/images/pdf.png';
import word from '../../../assets/images/word.png';
type Props = PropsWithChildren<{
  item: {
    name: string;
    type: string;
    lastestModified: string;
    showModal: (event: GestureResponderEvent) => void;
  };
}>;

const MaterialListItem = ({item}: Props) => {
  const navigation = useNavigation();
  const fileSymbol = (type: string) => {
    switch (type) {
      case 'jpg':
        return <Image source={img} />;
      case 'pdf':
        return <Image source={pdf} />;
      case 'docx':
        return <Image source={word} />;
      case 'xlsx':
        return <Image source={excel} />;
      default:
        return null;
    }
  };
  return (
    <GestureHandlerRootView>
      <Pressable>
        <View style={styles.itemContainer}>
          {fileSymbol(item.type)}
          <Pressable
            style={styles.textContentContainer}
            onPress={() => {
              navigation.navigate('DetailMaterial');
            }}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                {item.name}.{item.type}
              </Text>
              <Text style={{fontSize: 10, marginTop: 3, color: '#b6b6b6'}}>
                Người sửa đối: {item.lastestModified}
              </Text>
            </View>
          </Pressable>
          <IconButton
            icon="dots-vertical"
            style={{margin: 0}}
            size={20}
            onPress={item.showModal}
          />
        </View>
      </Pressable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 12,
    backgroundColor: '#eff2ef',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#00000ff',
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 6,
    elevation: 20,
  },
  // fileSymbol: {
  //   borderRadius: 17.5,
  //   backgroundColor: '#d9d9d9',
  //   height: 35,
  //   width: 35,
  // },
  textContentContainer: {
    flex: 1,
    marginLeft: 10,
  },
});
export default MaterialListItem;
