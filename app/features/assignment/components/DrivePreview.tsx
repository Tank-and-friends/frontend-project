// import React from 'react';
// import {View, Image, StyleSheet} from 'react-native';
// import {Text} from 'react-native-paper';
// import Pdf from 'react-native-pdf';

// type DrivePreviewProps = {
//     driveUrl: string;
//     type: 'image' | 'pdf';
//   };

//   const DrivePreview: React.FC<DrivePreviewProps> = ({ driveUrl, type }) => {
//   // Hàm lấy direct link từ URL Google Drive
//   const getDirectLink = (url: string): string | null => {
//     const fileIdMatch = url.match(/file\/d\/(.*?)\//);
//     return fileIdMatch
//       ? `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
//       : null;
//   };

//   const directLink = getDirectLink(driveUrl);

//   if (!directLink) {
//     return (
//       <View>
//         <Text>Invalid Google Drive link</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {type === 'image' ? (
//         <Image source={{uri: directLink}} style={styles.image} />
//       ) : (
//         <Pdf source={{uri: directLink}} style={styles.pdf} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 300,
//     height: 400,
//     resizeMode: 'contain',
//   },
//   pdf: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
// });

// export default DrivePreview;
