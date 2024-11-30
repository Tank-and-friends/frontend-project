/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import {IconButton, Text} from 'react-native-paper';
import {MaterialInfo} from '../../../models/Material';
import {fileSymbol} from '../actions';

type Props = PropsWithChildren<{
  item: MaterialInfo;
  moreOption: (event: GestureResponderEvent, item: MaterialInfo) => void;
}>;

type ParamList = {
  MaterialStacks: {
    screen: string;
    params: {
      material: MaterialInfo;
    };
  };
};

const MaterialListItem = ({item, moreOption}: Props) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  return (
    <Pressable>
      <View style={styles.itemContainer}>
        {fileSymbol(item.material_type)}
        <Pressable
          style={styles.textContentContainer}
          onPress={() => {
            navigation.navigate('MaterialStacks', {
              screen: 'DetailMaterial',
              params: {
                material: item,
              },
            });
          }}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>
              {item.material_name}.{item.material_type}
            </Text>
            <Text
              style={{fontSize: 10, marginTop: 3, color: '#b6b6b6'}}
              numberOfLines={1}>
              {item.description}
            </Text>
          </View>
        </Pressable>
        <IconButton
          icon="dots-vertical"
          style={{margin: 0}}
          size={20}
          onPress={e => moreOption(e, item)}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#eff2ef',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  textContentContainer: {
    flex: 1,
    marginLeft: 10,
  },
});
export default MaterialListItem;
