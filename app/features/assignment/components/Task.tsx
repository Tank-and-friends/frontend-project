import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TaskProps {
  title: string;
  status: string;
  statusColor: string;
  hasBadge: boolean;
  badgeText?: string;
  badgeColor?: string;
}

const Task: React.FC<TaskProps> = ({
  title,
  status,
  statusColor,
  hasBadge,
  badgeText,
  badgeColor,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.taskContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.status, {color: statusColor}]}>{status}</Text>
      </View>
      {hasBadge && badgeText && (
        <View style={[styles.badge, {backgroundColor: badgeColor}]}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 3,
  },
  taskContent: {
    flex: 1,
  },
  title: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
  },
  status: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 10,
    backgroundColor: '#FF7F11',
  },
  badgeText: {
    color: '#EFF2EF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 12,
  },
});

export default Task;

// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// interface TaskProps {
//   taskTitle: string;
//   statusText: string;
//   statusTextColor: string;
//   hasBadge: boolean;
//   badgeText?: string;
//   badgeColor?: string;
// }

// const Task: React.FC<TaskProps> = ({
//   taskTitle,
//   statusText,
//   statusTextColor,
//   hasBadge,
//   badgeText,
//   badgeColor,
// }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.taskBox}>
//         <Text style={styles.taskTitle}>{taskTitle}</Text>
//         <Text style={[styles.statusText, {color: statusTextColor}]}>
//           {statusText}
//         </Text>
//       </View>
//       {hasBadge && badgeText && (
//         <View style={[styles.badge, {backgroundColor: badgeColor}]}>
//           <Text style={styles.badgeText}>{badgeText}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const createStyles = (borderRadius: number) =>
//   StyleSheet.create({
//     container: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: 10,
//       borderRadius: borderRadius,
//       backgroundColor: '#EFF2EF',
//       marginVertical: 8,
//     },
//     taskBox: {
//       flex: 1,
//     },
//     taskTitle: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#071013',
//     },
//     statusText: {
//       fontSize: 12,
//     },
//     badge: {
//       paddingVertical: 4,
//       paddingHorizontal: 8,
//       borderRadius: 4,
//       marginRight: 12,
//     },
//     badgeText: {
//       color: '#EFF2EF',
//       textAlign: 'center',
//       fontFamily: 'Inter',
//       fontSize: 10,
//       fontStyle: 'normal',
//       fontWeight: '400',
//       lineHeight: 12,
//     },
//   });

// const styles = createStyles(10);

// export default Task;
