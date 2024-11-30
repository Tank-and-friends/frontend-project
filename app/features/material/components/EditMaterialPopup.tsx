/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import {TextField} from '../../../components/TextField/TextField';
import {MaterialInfo, MaterialUploadReq} from '../../../models/Material';
import {Pressable} from 'react-native-gesture-handler';
import {pickFile} from '../actions';
import {editMaterial, uploadMaterial} from '../../../apis/MaterialApi';
type Props = PropsWithChildren<{
  isVisible: boolean;
  hideModal: () => void;
  material?: MaterialInfo;
  classId: string;
  onUpdate: (classId: string) => void;
}>;
const EditMaterialPopup = ({
  isVisible,
  hideModal,
  material,
  classId,
  onUpdate,
}: Props) => {
  const [materialInfo, setMaterialInfo] = useState<MaterialUploadReq>({
    title: '',
    description: '',
    file: {
      uri: '',
      name: '',
      type: '',
    },
  });
  useEffect(() => {
    setMaterialInfo({
      title: material?.material_name || '',
      description: material?.description || '',
      file: {
        uri: material?.material_link || '',
        name: material?.material_name || '',
        type: material?.material_type || '',
      },
    });
  }, [material]);

  // function handleDataChange(id: string, value: string) {
  //   setMaterialInfo({...materialInfo, [id]: value});
  // }
  const handleDataChange = (field: string, value: string) => {
    setMaterialInfo({...materialInfo, [field]: value});
  };
  const handleUpload = async () => {
    const file = await pickFile();

    if (file) {
      setMaterialInfo({...materialInfo, file: file});
    }
  };

  const handleSubmit = () => {
    if (material) {
      editMaterial(material.id, materialInfo).then(res => {
        if (res) {
          hideModal();
          if (onUpdate) {
            onUpdate(classId);
          }
        }
      });
    } else {
      uploadMaterial(classId, materialInfo).then(res => {
        if (res) {
          hideModal();
          if (onUpdate) {
            onUpdate(classId);
          }
        }
      });
    }
  };
  return (
    <Modal
      visible={isVisible}
      onDismiss={hideModal}
      contentContainerStyle={styles.renameModal}>
      <TextField
        customLabel="Tên"
        onChange={text => handleDataChange('title', text)}
        value={materialInfo.title}
        requiredIndicator={true}
      />
      <TextField
        customLabel="Mô tả"
        value={materialInfo.description}
        onChange={text => handleDataChange('description', text)}
      />
      <Text>{materialInfo?.file.name}</Text>
      <Pressable style={styles.uploadArea} onPress={handleUpload}>
        <Text style={styles.uploadContent}>Tải tài liệu mới</Text>
      </Pressable>
      <View style={{paddingHorizontal: 12}}>
        <Button
          mode="contained"
          style={styles.saveButton}
          onPress={handleSubmit}>
          Lưu
        </Button>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  renameModal: {
    alignSelf: 'center',
    height: 400,
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
  uploadContainer: {
    marginTop: 8,
    flexDirection: 'column',
    gap: 8,
    paddingHorizontal: 12,
  },
  uploadTitle: {
    paddingLeft: 4,
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  uploadArea: {
    width: '100%',
    height: 80,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#c02135',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  uploadContent: {
    fontSize: 16,
    color: '#c02135',
  },
});
export default EditMaterialPopup;
