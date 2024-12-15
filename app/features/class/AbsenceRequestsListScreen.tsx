import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/core';
import React, {useCallback, useMemo, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, IconButton} from 'react-native-paper';
import {AbsenceRequestsList} from './components/AbsenceRequestsList';
import {Chip} from './components/Chip';
import {AbsenceRequestReponse, AbsenceRequestStatus} from './type';
import {getAbsenceRequestsForStudent} from './api';

type ParamsList = {
  ClassFeaturesStacks: {
    screen: string;
    params: {
      screen: string;
    };
  };
};

export const AbsenceRequestsListScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamsList>>();
  const [tab, setTab] = React.useState<AbsenceRequestStatus | null>(null);

  const [absenceRequests, setAbsenceRequests] = useState<
    AbsenceRequestReponse[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await getAbsenceRequestsForStudent('000268', tab);
        setAbsenceRequests(data);
      };

      fetchData();
    }, [tab]),
  );

  const list = useMemo(() => {
    return absenceRequests.map(item => ({
      title: item.date,
      items: [
        {
          title: item.title,
          status: item.status,
        },
      ],
    }));
  }, [absenceRequests]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <Appbar.Header mode="small" style={styles.header}>
          <Appbar.BackAction
            size={30}
            color="red"
            containerColor="white"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            titleStyle={styles.headerTitle}
            title="Xin nghỉ phép"
          />
          <View style={styles.actionBtn}>
            <IconButton icon="cog-outline" iconColor="white" size={30} />
          </View>
        </Appbar.Header>
        <View style={styles.body}>
          <View style={styles.tabBar}>
            <Chip
              content="Tất cả"
              selected={tab === null}
              onPress={() => setTab(null)}
            />
            <Chip
              content="Chấp nhận"
              selected={tab === 'ACCEPTED'}
              onPress={() => setTab('ACCEPTED')}
            />
            <Chip
              content="Từ chối"
              selected={tab === 'REJECTED'}
              onPress={() => setTab('REJECTED')}
            />
            <Chip
              content="Chưa duyệt"
              selected={tab === 'PENDING'}
              onPress={() => setTab('PENDING')}
            />
          </View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <AbsenceRequestsList groups={list} />
          </ScrollView>
          <IconButton
            mode="contained"
            icon="plus"
            iconColor="#EFF2EF"
            containerColor="#c02135"
            size={50}
            style={styles.createBtn}
            onPress={() =>
              navigation.navigate('ClassFeaturesStacks', {
                screen: 'AbsenceRequest',
                params: {
                  screen: 'CreateAbsenceRequest',
                },
              })
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: 30,
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
  body: {
    flex: 1,
    marginTop: 40,
  },
  tabBar: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    paddingBottom: 10,
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  createBtn: {
    position: 'absolute',
    bottom: 164,
    right: 24,
  },
});
