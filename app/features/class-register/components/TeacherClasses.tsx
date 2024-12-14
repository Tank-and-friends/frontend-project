import React, {useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ClassRect from './ClassRect';
import {
  deleteClass,
  editClass,
  getListClasses,
} from '../../../apis/RegisterApi';
import {ClassInfo, EditClassReq} from '../../../models/Register';
import {Button, IconButton, Modal, Portal} from 'react-native-paper';
import {TextField} from '../../../components/TextField/TextField';
import DatePicker from '../../../components/DatePicker';
import TransparentBackground from '../../../components/TransparentBackground';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type ParamList = {
  ClassRegisterStacks: {
    screen: string;
    params: {
      onUpdate: () => void;
    };
  };
};
export default function TeacherClasses() {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState<EditClassReq | undefined>();
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const showEditModal = (event: GestureResponderEvent, item: ClassInfo) => {
    event.stopPropagation();
    setSelectedItem({
      class_id: item.class_id,
      class_name: item.class_name,
      start_date: item.start_date,
      end_date: item.end_date,
    });
    setVisible(true);
  };
  const hideEditModal = () => {
    setVisible(false);
    setSelectedItem(undefined);
  };
  const fetchListClasses = () => {
    getListClasses().then(res => {
      if (res) {
        setClasses(res);
      }
    });
  };
  useEffect(() => {
    fetchListClasses();
  }, []);
  const handleDataChange = (field: string, value: string) => {
    if (selectedItem) {
      setSelectedItem({...selectedItem, [field]: value});
    }
  };
  const handleSubmit = () => {
    if (selectedItem) {
      editClass(selectedItem).then(res => {
        if (res) {
          hideEditModal();
          fetchListClasses();
        }
      });
    }
  };
  const handleDelete = () => {
    if (selectedItem) {
      deleteClass(selectedItem.class_id).then(res => {
        if (res) {
          hideEditModal();
        }
      });
    }
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideEditModal}
          // theme={}
          contentContainerStyle={{
            position: 'absolute',
            width: '100%',
            bottom: 120,
            padding: 10,
            display: 'flex',
            zIndex: 10000,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <View style={styles.formTitle}>
                <Text
                  style={[
                    styles.headerTitle,
                    {color: '#071013', fontWeight: '700'},
                  ]}>
                  Thông tin lớp
                </Text>
              </View>
              <View style={styles.formTextField}>
                <View>
                  <TextField
                    id="class_name"
                    name="class_name"
                    customLabel="Học phần"
                    value={selectedItem?.class_name}
                    onChange={value => handleDataChange('class_name', value)}
                  />
                </View>
                <View style={styles.formTimePlace}>
                  <View style={[styles.formTime, {paddingTop: 10}]}>
                    <View style={{width: '93%'}}>
                      <DatePicker
                        label="Thời gian bắt đầu"
                        value={selectedItem?.start_date || ''}
                        onChange={value =>
                          handleDataChange('start_date', value)
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.formTime}>
                    <View style={{width: '93%'}}>
                      <DatePicker
                        label="Thời gian kết thúc"
                        value={selectedItem?.end_date || ''}
                        onChange={value => handleDataChange('end_date', value)}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <Button
                mode="contained"
                style={{marginHorizontal: 20, marginBottom: 10, borderRadius: 6}}
                buttonColor="#FF7F11"
                textColor="white"
                onPress={handleSubmit}
                >
                Lưu
              </Button>
              <Button
                mode="contained"
                style={{marginHorizontal: 20, marginBottom: 30, borderRadius: 6}}
                buttonColor="#C02135"
                textColor="white"
                onPress={handleDelete}>
                Xóa
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.classGroupContainer}>
          {classes.map((item, index) => (
            <ClassRect key={index} classInfo={item} onEdit={showEditModal} />
          ))}
        </ScrollView>
      </View>
      <IconButton
        icon="plus"
        mode="contained"
        containerColor="#C02135"
        size={40}
        style={styles.newClassButton}
        iconColor="white"
        onPressIn={() => {
          styles.newClassButton.backgroundColor = '#FF5722';
        }}
        onPressOut={() => {
          styles.newClassButton.backgroundColor = '#C02135';
        }}
        onPress={() =>
          navigation.navigate('ClassRegisterStacks', {
            screen: 'NewClassScreen',
            params: {
              onUpdate: fetchListClasses,
            },
          })
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  classGroupContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    paddingTop: 20,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: 30,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: 'semibold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D7C3B1',
    paddingLeft: 12,
  },
  actionBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  formContainer: {
    backgroundColor: '#EFF2EF',
    width: '90%',
    borderRadius: 10,
  },
  formTitle: {
    gap: 4,
    padding: 0,
  },
  line: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: 2,
  },
  formTextField: {
    padding: 10,
    width: '100%',
  },
  formTimePlace: {
    width: '100%',
  },
  formTime: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newClassButton: {
    position: 'absolute',
    bottom: 125,
    right: 20,

    backgroundColor: '#C02135',
    borderRadius: 100, // Ensure it looks rounded (optional)

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,
    zIndex: 1,
  },
});
