/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Modal} from 'react-native-paper';
import {TextField} from '../../../components/TextField/TextField';
import {MaterialInfo, MaterialUploadReq} from '../../../models/Material';
import {Pressable} from 'react-native-gesture-handler';
import {fileSymbol, pickFile} from '../../../utils/file';
import {editMaterial, uploadMaterial} from '../../../apis/MaterialApi';
type Props = PropsWithChildren<{
  isVisible: boolean;
  hideModal: () => void;
  material?: MaterialInfo;
  classId: string;
  onUpdate: (e: MaterialInfo) => void;
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
            onUpdate(res);
          }
        }
      });
    } else {
      uploadMaterial(classId, materialInfo).then(res => {
        if (res) {
          hideModal();
          if (onUpdate) {
            onUpdate(res);
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
      <Text style={{fontWeight: 500, textAlign: 'center', fontSize: 20}}>
        Thông tin tài liệu
      </Text>
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
      {materialInfo.file.name && (
        <Pressable style={styles.stylee}>
          <View style={styles.fileContainer}>
            {fileSymbol(materialInfo.file.type || '')}
            <Text style={{fontWeight: 'bold', fontSize: 14, marginLeft: 5}}>
              {materialInfo.file.name}.{materialInfo.file.type}
            </Text>
          </View>
        </Pressable>
      )}
      <Pressable onPress={handleUpload} style={styles.stylee}>
        <View style={styles.uploadArea}>
          <Icon source="upload" color="#c02135" size={24} />
          <Text style={styles.uploadContent}>Tải tài liệu mới</Text>
        </View>
      </Pressable>
      <View style={styles.stylee}>
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
    backgroundColor: 'white',
    borderRadius: 5,
    width: 350,
    padding: 20,
    paddingBottom: 30,
    flexDirection: 'column',
    gap: 8,
  },
  saveButton: {
    borderRadius: 4,
    backgroundColor: '#C02135',
    alignSelf: 'center',
    width: '100%',
  },
  uploadArea: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#c02135',
    borderRadius: 8,
    borderStyle: 'dashed',
    shadowOffset: {width: 3, height: 0},
  },
  uploadContent: {
    fontSize: 16,
    color: '#c02135',
  },
  fileContainer: {
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#eff2ef',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stylee: {
    paddingHorizontal: 12,
    marginTop: 10,
  },
});
export default EditMaterialPopup;
