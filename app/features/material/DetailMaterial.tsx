/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren, useState} from 'react';
import {MaterialInfo} from '../../models/Material';
import {deleteMaterial} from '../../apis/MaterialApi';
import {Button, Modal, PaperProvider, Portal} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import TopNavBar from './components/TopNavBar';
import WebView from 'react-native-webview';
import {getPreviewDocumentUrl} from '../../utils/file';
import TransparentBackground from '../../components/TransparentBackground';
import EditMaterialPopup from './components/EditMaterialPopup';

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
          flex: 1,
          position: 'relative',
        }}>
        <TopNavBar
          title={materialInfo.material_name + '.' + materialInfo.material_type}
          onOpenPopup={showPopup}
        />
        <WebView
          source={{uri: getPreviewDocumentUrl(materialInfo.material_link)}}
          style={[
            styles.webview,
            {
              marginTop: ['docx', 'doc', 'txt'].includes(
                materialInfo.material_type,
              )
                ? -60
                : 0,
            },
          ]}
          startInLoadingState={true}
          scalesPageToFit={true}
          domStorageEnabled={true}
        />
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
            onUpdate={setMaterialInfo}
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
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default DetailMaterial;
