import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {FileInfo} from '../types/file';

interface Props {
  file: FileInfo;
}

type ParamList = {
  PreviewFile: {
    title: string;
    url: string;
  };
};

export const FileItem = ({file}: Props) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  return (
    <>
      <Pressable>
        <View style={styles.itemContainer}>
          <Pressable
            style={styles.uploadArea}
            onPress={() =>
              navigation.navigate(
                'PreviewFile',
                {
                  title: file.title,
                  url: file.file_url,
                },
              )
            }>
            <FontAwesome6Icon name="file" color="#46515f" size={16} />
            <Text style={styles.uploadContent}>
              File {file.title.toLowerCase()}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  uploadArea: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#46515f',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  uploadContent: {
    fontSize: 16,
    color: '#46515f',
  },
});
