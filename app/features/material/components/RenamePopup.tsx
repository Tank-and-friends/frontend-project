/* eslint-disable react-native/no-inline-styles */
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { TextField } from '../../../components/TextField/TextField';
type Props = PropsWithChildren<{
  isVisible: boolean;
  hideModal: () => void;
  idMaterial?: number;
}>;
const RenamePopup = ({isVisible, hideModal}: Props) => {
  return (
    <Modal
      visible={isVisible}
      onDismiss={hideModal}
      contentContainerStyle={styles.renameModal}>
      <TextField customLabel="Đổi tên" requiredIndicator={true} />
      <View style={{paddingHorizontal: 12}}>
        <Button mode="contained" style={styles.saveButton}>
          Lưu
        </Button>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  renameModal: {
    alignSelf: 'center',
    height: 210,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 350,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 30,
  },
  saveButton: {
    borderRadius: 4,
    backgroundColor: '#C02135',
    alignSelf: 'center',
    width: '100%',
  },
});
export default RenamePopup;
