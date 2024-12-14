/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Appbar,
  Dialog,
  IconButton,
  PaperProvider,
  Portal,
  Text,
} from 'react-native-paper';
import ClassRectLec from './components/ClassRectLec';
import {format} from 'date-fns';
import ClassRectStu from './components/ClassRectStu';

interface ClassItem {
  class_id: string;
  class_name: string;
  start_date: string;
  end_date: string;
  status: string;
  lecturer_name?: string;
  student_count?: number;
  class_type?: string;
  attached_code?: string | null;
}

interface ClassRegisterListScreenProps {
  route: {
    params: {
      className: string;
      filteredClasses: ClassItem[];
      classType: string;
    };
  };
  navigation: any;
}

export default function ClassRegisterListScreen({
  route,
  navigation,
}: ClassRegisterListScreenProps) {
  const {className, filteredClasses, classType} = route.params;
  const [isDialogVisible, setDialogVisible] = useState(false); // Dialog visibility state
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null); // Selected class state

  const classTypeColors: Record<string, string> = {
    LT: '#174fb2', // Blue
    BT: '#ba1b30', // Red
    LT_BT: '#ff7f11', // Orange
  };

  const getBoxColor = (classType?: string) => {
    return classTypeColors[classType || ''] || '#cccccc'; // Default color
  };

  // const classData = [
  //   {
  //     classTitle: 'Giải tích I',
  //     classTime: 'Sáng thứ 3, 6:45 - 10:05',
  //     classCode: '154052',
  //     status: 'Còn chỗ',
  //   },
  //   {
  //     classTitle: 'Giải tích I',
  //     classTime: 'Chiều thứ 5, 13:30 - 17:00',
  //     classCode: '154056',
  //     status: 'Trùng lịch',
  //   },
  //   {
  //     classTitle: 'Giải tích I',
  //     classTime: 'Sáng thứ 7, 8:00 - 12:00',
  //     classCode: '154053',
  //     status: 'Hết chỗ',
  //   },
  //   {
  //     classTitle: 'Giải tích I',
  //     classTime: 'Sáng thứ 3, 6:45 - 10:05',
  //     classCode: '154052',
  //     status: 'Còn chỗ',
  //   },
  // ];

  const today = new Date();

  const updatedClasses = filteredClasses.map(classItem => {
    // Parse the start and end dates
    const startDate = new Date(classItem.start_date);
    const endDate = new Date(classItem.end_date);

    // Check if the current date is outside the range
    const isOutdated = today < startDate || today > endDate;

    // Update status accordingly
    return {
      ...classItem,
      status: isOutdated ? 'Hết hạn' : 'Mở đăng ký',
      classTime: `${format(startDate, 'dd/MM/yyyy')} - ${format(
        endDate,
        'dd/MM/yyyy',
      )}`,
    };
  });

  const handleClassPress = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setDialogVisible(true);
  };

  const handleDialogDismiss = () => {
    setDialogVisible(false);
    setSelectedClass(null);
  };

  const handleRegister = () => {
    // Perform registration logic here
    console.log(`Registering for class: ${selectedClass?.class_name}`);
    handleDialogDismiss();
  };

  return (
    <PaperProvider>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          style={styles.backgroundImage}
          resizeMode="stretch">
          <Appbar.Header mode="small" style={styles.header}>
            <Appbar.BackAction
              size={30}
              color="red"
              containerColor="white"
              onPress={() => navigation.goBack()}
            />
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{className}</Text>
              {/* <Text style={styles.headerSubtitle}>Đăng ký mở lớp</Text> */}
            </View>
            <View style={styles.actionBtn}>
              <IconButton icon="cog-outline" iconColor="white" size={30} />
            </View>
          </Appbar.Header>

          <View style={styles.container}>
            {/* <Text style={styles.title}>Class List for {className}</Text> */}
            <View style={styles.classSquareContainerContainer}>
              <Image
                source={require('../../assets/images/class-background.jpg')}
                style={[styles.backgroundClassImage, {borderRadius: 10}]}
                resizeMode="stretch"
              />
              <View style={styles.classSquareContainer}>
                <View style={styles.classTitle}>
                  <Text style={styles.className}>{className}</Text>
                  <Text style={styles.classDetails}>{className}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={[
                      styles.Box,
                      {backgroundColor: getBoxColor(classType)},
                    ]}>
                    <Text style={styles.Text}>Lớp {classType}</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#174FB2',
                      textShadowColor: 'white',
                      textShadowOffset: {width: 1, height: 1},
                      textShadowRadius: 2,
                    }}>
                    Hiện còn {filteredClasses.length} lớp
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView
              contentContainerStyle={styles.classGroupContainer}
              style={{width: '100%'}}>
              {/* {classData.map((classItem, index) => (
                <ClassRect
                  key={index} 
                  classTitle={classItem.classTitle}
                  classTime={classItem.classTime}
                  classCode={classItem.classCode}
                  status={classItem.status}
                />
              ))} */}
              {updatedClasses.length > 0 ? (
                updatedClasses.map((classItem, index) => (
                  <ClassRectStu
                    key={index}
                    classTitle={classItem.class_name}
                    classTime={classItem.classTime}
                    classCode={classItem.class_id}
                    status={classItem.status}
                    lecturerName={classItem.lecturer_name || 'N/A'}
                    studentNumber={classItem.student_count || 0}
                    onPress={() => handleClassPress(classItem)}
                  />
                ))
              ) : (
                <Text style={{textAlign: 'center', marginTop: 20}}>
                  No classes available.
                </Text>
              )}
            </ScrollView>
          </View>
          <Portal>
            <Dialog visible={isDialogVisible} onDismiss={handleDialogDismiss}>
              <Dialog.Title>Register for Class</Dialog.Title>
              <Dialog.Content>
                <Text>
                  Are you sure you want to register for{' '}
                  {selectedClass?.class_name}?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button title="Cancel" onPress={handleDialogDismiss} />
                <Button title="Register" onPress={handleRegister} />
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ImageBackground>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 10,
    textAlign: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundClassImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  classSquareContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: 20,
    paddingHorizontal: 40,
  },
  classSquareContainerContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column-reverse',
    width: '95%',
    height: 140,
    borderRadius: 10,
    position: 'relative',
  },
  classTitle: {
    width: '100%',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
    maxWidth: 500,
  },
  Box: {
    backgroundColor: '#174fb2',
    borderRadius: 4,
    width: 80,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 10,
  },
  className: {
    color: 'black',
    fontWeight: 'semibold',
    fontSize: 16,
    fontFamily: 'Inter',
    textShadowColor: 'white',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  classDetails: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Inter',
    textShadowColor: 'white',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  classGroupContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    paddingVertical: 10,
    paddingBottom: 120,
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
    paddingLeft: 10,
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
});
