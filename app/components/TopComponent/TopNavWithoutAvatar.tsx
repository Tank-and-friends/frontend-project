import { useNavigation } from '@react-navigation/core';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';

type Props = PropsWithChildren<{
  title: string;
}>;

export default function TopNavWithoutAvatar({title}: Props) {
  const navigation = useNavigation();
  return (
    <Appbar.Header mode="small" style={styles.header}>
      <Appbar.BackAction
        size={30}
        color="red"
        containerColor="white"
        onPress={() => navigation.goBack()}
      />
      <Appbar.Content titleStyle={styles.headerTitle} title={title} />
      <View style={styles.actionBtn}>
        <IconButton icon="cog-outline" iconColor="white" size={30} />
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    paddingTop: 30,
    marginBottom: 30,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: 'semibold',
    paddingLeft: 10,
  },
  actionBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
