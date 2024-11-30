/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Modal, PaperProvider, Portal} from 'react-native-paper';
import TransparentBackground from '../../components/TransparentBackground';
import TopNavBar from './components/TopNavBar';
import {MaterialInfo} from '../../models/Material';
import EditMaterialPopup from './components/EditMaterialPopup';
import {RouteProp, useNavigation} from '@react-navigation/core';
import WebView from 'react-native-webview';
import {getDirectMaterialLink} from '../../utils/image';
import {deleteMaterial, getMaterialInfo} from '../../apis/MaterialApi';

type Props = PropsWithChildren<{route: RouteProp<RouteProps>}>;

type RouteProps = {
  DetailMaterial: {
    material: MaterialInfo;
  };
};

const DetailMaterial = ({route}: Props) => {
  const {material} = route.params;
  const navigation = useNavigation();
  const [materialInfo, setMaterialInfo] = useState<MaterialInfo>(material);
  const [isEdit, setIsEdit] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const showPopup = () => {
    setIsPopupOpen(true);
  };
  const hidePopup = () => {
    setIsPopupOpen(false);
  };
  const toggleEdit = () => {
    setIsEdit(false);
  };
  const showEditModal = () => {
    hidePopup();
    setIsEdit(true);
  };
  const fetchMaterialInfo = () => {
    getMaterialInfo(materialInfo.id).then(res => {
      if (res) {
        setMaterialInfo(res);
      }
    });
  };

  const handleDelete = () => {
    deleteMaterial(materialInfo.id).then(res => {
      if (res) {
        navigation.goBack();
      }
    });
  };
  return (
    <PaperProvider>
      <View
        style={{
          position: 'relative',
        }}>
        <TopNavBar
          title={materialInfo.material_name + '.' + materialInfo.material_type}
          onOpenPopup={showPopup}
        />
        <View style={styles.container}>
          <Text>fdg</Text>
          <WebView
            source={{uri: getDirectMaterialLink(materialInfo.material_link)}}
            onError={syntheticEvent => {
              const {nativeEvent} = syntheticEvent;
              console.error('WebView error: ', nativeEvent);
            }}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
          />
        </View>
        <Portal>
          <Modal
            visible={isPopupOpen}
            onDismiss={hidePopup}
            contentContainerStyle={styles.utilities}
            theme={TransparentBackground}>
            <Button
              style={styles.optionsModalButton}
              icon="download"
              mode="text"
              textColor="black"
              contentStyle={{justifyContent: 'flex-start'}}
              onPress={() => console.log('Pressed')}>
              Lưu về máy
            </Button>
            <Button
              icon="form-textarea"
              style={styles.optionsModalButton}
              mode="text"
              textColor="black"
              contentStyle={{justifyContent: 'flex-start'}}
              onPress={showEditModal}>
              Chỉnh sửa
            </Button>
            <Button
              icon="trash-can-outline"
              style={styles.optionsModalButton}
              mode="text"
              textColor="black"
              contentStyle={{justifyContent: 'flex-start'}}
              onPress={handleDelete}>
              Xóa
            </Button>
          </Modal>
          <EditMaterialPopup
            isVisible={isEdit}
            hideModal={toggleEdit}
            classId={materialInfo.class_id}
            material={materialInfo}
            onUpdate={fetchMaterialInfo}
          />
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  moreInfoItem: {
    fontSize: 13,
    borderRadius: 0,
  },
  optionsModalButton: {
    width: '100%',
    borderRadius: 0,
  },
  utilities: {
    position: 'absolute',
    right: 5,
    top: 65,
    width: 186,
    padding: 5,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    elevation: 20,
  },
  container: {
    backgroundColor: 'red',
  },
});

export default DetailMaterial;
