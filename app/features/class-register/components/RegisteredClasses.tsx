// import React, {useEffect, useState} from 'react';
// import {ScrollView, StyleSheet} from 'react-native';
// import ClassRect from './ClassRect';
// import {ClassInfo} from '../../../models/Register';
// import {getListClasses} from '../../../apis/RegisterApi';

// export default function RegisteredClasses() {
//   const [classes, setClasses] = useState<ClassInfo[]>([]);

//   useEffect(() => {
//     getListClasses().then(res => {
//       if (res) {
//         setClasses(res);
//       }
//     });
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.classGroupContainer}>
//       {classes.map((item, index) => (
//         <ClassRect key={index} classInfo={item} />
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   classGroupContainer: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     gap: 20,
//     paddingVertical: 10,
//   },
// });
