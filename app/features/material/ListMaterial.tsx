import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
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
import BackgroundImage from '../../assets/images/MaterialBackground.png';
import {TextField} from '../../components/TextField/TextField';
import TopNavWithoutAvatar from '../../components/TopComponent/TopNavWithoutAvatar';
import MaterialListItem from './components/MaterialListItem';
import RenamePopup from './components/RenamePopup';
type Props = PropsWithChildren<{}>;

type ParamList = {
  MaterialNavigation: {
    screen: string;
  };
};

const ListMaterial = ({}: Props) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [visible, setVisible] = React.useState(false);
  const [rename, setRename] = React.useState(false);

  const showModal = (event: GestureResponderEvent) => {
    event.stopPropagation();
    setVisible(true);
  };
  const showRenameModal = () => {
    setVisible(false);
    setRename(true);
  };
  const hideModal = () => setVisible(false);
  const hideRenameModal = () => {
    setRename(false);
  };
  const DATA = [
    {
      name: 'Sơ đồ UC',
      type: 'jpg',
      lastestModified: 'Nguyen Thi Thu Trang',
      showModal: showModal,
    },
    {
      name: 'Danh sách phân nhóm',
      type: 'xlsx',
      lastestModified: 'Nguyen Thi Thu Trang',
      showModal: showModal,
    },
    {
      name: 'UC Specification',
      type: 'docx',
      lastestModified: 'Third Item',
      showModal: showModal,
    },
    {
      name: 'AIMS project',
      type: 'pdf',
      lastestModified: 'Fourth Item',
      showModal: showModal,
    },
  ];

  return (
    <PaperProvider>
      <View style={{flex: 1}}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}
          resizeMode="stretch">
          <TopNavWithoutAvatar title="Tài liệu" />
          <TextField
            prefix={<IonIcons name="search" size={20} />}
            placeholder="Bạn muốn tìm gì ..."
          />
          <FlatList
            data={DATA}
            style={styles.listMessage}
            renderItem={({item}) => <MaterialListItem item={item} />}
            keyExtractor={item => item.name}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
          <IconButton
            icon="plus"
            mode="contained"
            iconColor="white"
            containerColor="#C02135"
            size={30}
            style={styles.uploadMaterialButton}
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
                  navigation.navigate('MaterialNavigation', {
                    screen: 'DetailMaterial',
                  });
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
                onPress={showRenameModal}>
                Đổi tên
              </Button>
              <Button
                icon="trash-can-outline"
                style={styles.optionsModalButton}
                mode="text"
                textColor="black"
                contentStyle={{justifyContent: 'flex-start'}}
                onPress={() => console.log('Pressed')}>
                Xóa
              </Button>
            </Modal>
            <RenamePopup isVisible={rename} hideModal={hideRenameModal} />
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
