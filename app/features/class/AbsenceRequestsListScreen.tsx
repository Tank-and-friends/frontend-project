import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, IconButton} from 'react-native-paper';
import {Chip} from './components/Chip';
import {AbsenceRequestsList} from './components/AbsenceRequestsList';

type ParamsList = {
  ClassFeatures: {
    screen: string;
    params: {
      screen: string,
    }
  };
};

export const AbsenceRequestsListScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamsList>>();
  const [tab, setTab] = React.useState('all');

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
              selected={tab === 'all'}
              onPress={() => setTab('all')}
            />
            <Chip
              content="Chấp nhận"
              selected={tab === 'accepted'}
              onPress={() => setTab('accepted')}
            />
            <Chip
              content="Từ chối"
              selected={tab === 'rejected'}
              onPress={() => setTab('rejected')}
            />
            <Chip
              content="Chưa duyệt"
              selected={tab === 'pending'}
              onPress={() => setTab('pending')}
            />
          </View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <AbsenceRequestsList
              groups={[
                {
                  title: 'Hôm nay',
                  items: [
                    {title: 'Nghỉ ốm', date: '27/10/2024', status: 'accepted'},
                    {
                      title: 'Nghỉ về quê',
                      date: '27/10/2024',
                      status: 'pending',
                    },
                    {
                      title: 'Nghỉ đi tiêm Covid',
                      date: '27/10/2024',
                      status: 'rejected',
                    },
                  ],
                },
                {
                  title: 'Hôm qua',
                  items: [
                    {title: 'Nghỉ ốm', date: '27/10/2024', status: 'accepted'},
                    {
                      title: 'Nghỉ về quê',
                      date: '27/10/2024',
                      status: 'pending',
                    },
                    {
                      title: 'Nghỉ đi tiêm Covid',
                      date: '27/10/2024',
                      status: 'rejected',
                    },
                  ],
                },
                {
                  title: 'Hôm kia',
                  items: [
                    {title: 'Nghỉ ốm', date: '27/10/2024', status: 'accepted'},
                    {
                      title: 'Nghỉ về quê',
                      date: '27/10/2024',
                      status: 'pending',
                    },
                    {
                      title: 'Nghỉ đi tiêm Covid',
                      date: '27/10/2024',
                      status: 'rejected',
                    },
                  ],
                },
              ]}
            />
          </ScrollView>
          <IconButton
            mode="contained"
            icon="plus"
            iconColor="#EFF2EF"
            containerColor="#c02135"
            size={50}
            style={styles.createBtn}
            onPress={() =>
              navigation.navigate('ClassFeatures', {
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
