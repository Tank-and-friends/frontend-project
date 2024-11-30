/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  FlatList,
  GestureResponderEvent,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  IconButton,
  Modal,
  PaperProvider,
  Portal,
} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopNavWithoutAvatar from '../../components/TopComponent/TopNavWithoutAvatar';
import MaterialListItem from './components/MaterialListItem';
import {MaterialInfo} from '../../models/Material';
import {deleteMaterial, getMaterialList} from '../../apis/MaterialApi';
import EditMaterialPopup from './components/EditMaterialPopup';
type Props = PropsWithChildren<{
  route: RouteProp<RouteProps>;
}>;

type ParamList = {
  MaterialStacks: {
    screen: string;
    params: {
      material: MaterialInfo;
    };
  };
};

type RouteProps = {
  ListMaterial: {
    classId: string;
  };
};

const ListMaterial = ({route}: Props) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const {classId} = route.params;
  const [visible, setVisible] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [listMaterial, setListMaterial] = useState<MaterialInfo[]>([]);
  const [selectedItem, setSelectedItem] = useState<MaterialInfo | undefined>();
  // const [isUpload, setIsUpload] = useState<boolean>(false);
  const showModal = (event: GestureResponderEvent, item: MaterialInfo) => {
    event.stopPropagation();
    setSelectedItem(item);
    setVisible(true);
  };
  const showEditModal = () => {
    setVisible(false);
    setIsEdit(true);
  };
  const hideModal = () => {
    setSelectedItem(undefined);
    setVisible(false);
  };
  const hideEditModal = () => {
    setIsEdit(false);
    setSelectedItem(undefined);
  };
  const fetchMaterialList = (classId: string) => {
    getMaterialList(classId).then(res => {
      setListMaterial(res);
    });
  };
  const handleDelete = (materialId: string) => {
    deleteMaterial(materialId).then(res => {
      if (res) {
        fetchMaterialList(classId);
        hideModal();
      }
    });
  };
  useEffect(() => {
    fetchMaterialList(classId);
  }, [classId]);
  return (
    <PaperProvider>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          style={styles.backgroundImage}
          resizeMode="stretch">
          <TopNavWithoutAvatar title="Tài liệu" />
          <TextField
            prefix={<IonIcons name="search" size={20} />}
            placeholder="Bạn muốn tìm gì ..."
          />
          <FlatList
            data={listMaterial}
            style={styles.listMessage}
            renderItem={({item}) => (
              <MaterialListItem item={item} moreOption={showModal} />
            )}
            keyExtractor={item => item.id}
          />
          <IconButton
            icon="plus"
            mode="contained"
            iconColor="white"
            containerColor="#C02135"
            size={30}
            style={styles.uploadMaterialButton}
            onPress={showEditModal}
          />

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.moreModal}>
              <Button
                style={styles.optionsModalButton}
                icon="open-in-new"
                mode="text"
                textColor="black"
                contentStyle={{justifyContent: 'flex-start'}}
                onPress={() => {
                  hideModal();
                  if (selectedItem) {
                    navigation.navigate('MaterialStacks', {
                      screen: 'DetailMaterial',
                      params: {
                        material: selectedItem,
                      },
                    });
                  }
                }}>
                Mở
              </Button>
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
                onPress={() => handleDelete(selectedItem?.id || '')}>
                Xóa
              </Button>
            </Modal>
            <EditMaterialPopup
              isVisible={isEdit}
              hideModal={hideEditModal}
              classId={classId}
              material={selectedItem}
              onUpdate={() => fetchMaterialList(classId)}
            />
          </Portal>
        </ImageBackground>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  messageContainer: {
    position: 'relative',
  },
  listMessage: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  uploadMaterialButton: {
    position: 'absolute',
    bottom: 150,
    right: 20,
  },
  moreModal: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    padding: 20,
    height: 240,
    display: 'flex',
    zIndex: 1000,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  optionsModalButton: {
    width: '100%',
    borderRadius: 0,
    color: 'black',
  },
  bottomBar: {
    padding: 5,
    bottom: 30,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: 70,
    backgroundColor: '#C02135',
    borderRadius: 20,
    zIndex: 10,
    elevation: 10,
  },
  utility: {
    width: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  utilityClick: {
    width: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EFF2EF',
    borderRadius: 20,
    height: '100%',
    justifyContent: 'center',
  },
  utilityText: {
    fontSize: 9,
    color: 'white',
    marginTop: 6,
    fontWeight: '500',
  },
  utilityTextClick: {
    fontSize: 9,
    color: '#C02135',
    marginTop: 6,
    fontWeight: '500',
  },
});

export default ListMaterial;
