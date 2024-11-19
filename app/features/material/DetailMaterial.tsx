import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Modal, PaperProvider, Portal} from 'react-native-paper';
import TransparentBackground from '../../components/TransparentBackground';
import RenamePopup from './components/RenamePopup';
import TopNavBar from './components/TopNavBar';

type Props = PropsWithChildren<{}>;

const DetailMaterial = ({}: Props) => {
  const [isRename, setIsRename] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigation = useNavigation();
  const scrollView = useRef<ScrollView | null>();

  const showPopup = () => {
    setIsPopupOpen(true);
  };
  const hidePopup = () => {
    setIsPopupOpen(false);
  };
  const toggleRename = () => {
    setIsRename(false);
  };
  const showRenameModal = () => {
    hidePopup(), setIsRename(true);
  };
  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          position: 'relative',
        }}>
        <TopNavBar title="Danh sach phan nhom" onOpenPopup={showPopup} />
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
          <RenamePopup isVisible={isRename} hideModal={toggleRename} />
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
});

export default DetailMaterial;
