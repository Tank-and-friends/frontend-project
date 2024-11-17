import {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Modal,
  PaperProvider,
  Portal,
  TextInput,
} from 'react-native-paper';
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
      <TextInput />
      <Button
        mode="contained"
        style={{borderRadius: 4, backgroundColor: '#C02135'}}>
        Lưu
      </Button>
    </Modal>
  );
};
const styles = StyleSheet.create({
  renameModal: {
    alignSelf: 'center',
    height: 180,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 350,
    justifyContent: 'space-between',
    padding: 20,
  },
});
export default RenamePopup;
