import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AccountItemProps = {
  title: string;
  description: string;
  iconColor: string;
  onPress: () => void;
};

const AccountItem: React.FC<AccountItemProps> = ({
  title,
  description,
  iconColor,
  onPress,
}) => {
  const renderIcon = () => (
    <Ionicons
      name="person-circle-outline"
      size={40}
      color={iconColor}
      style={styles.icon}
    />
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <List.Item
        title={title}
        description={description}
        left={renderIcon}
        titleStyle={styles.title} // Áp dụng style cho title
        descriptionStyle={styles.description} // Áp dụng style cho description
        style={styles.listItem}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  listItem: {
    borderColor: '#008C9E',
    borderWidth: 0.5,
    paddingLeft: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
  },
});

export default AccountItem;
