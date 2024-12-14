/* eslint-disable react-native/no-inline-styles */

import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, PaperProvider} from 'react-native-paper';
import WebView from 'react-native-webview';
import {getPreviewDocumentUrl} from '../utils/file';

type Props = PropsWithChildren<{route: RouteProp<RouteProps>}>;

type RouteProps = {
  PreviewFile: {
    title: string;
    url: string;
  };
};

const PreviewFile = ({route}: Props) => {
  const {title, url} = route.params;
  const navigation = useNavigation();

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          position: 'relative',
        }}>
        <Appbar.Header mode="small" style={styles.header}>
          <Appbar.BackAction
            size={30}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            titleStyle={styles.headerTitle}
            title={title}
          />
        </Appbar.Header>
        <WebView
          source={{uri: getPreviewDocumentUrl(url)}}
          style={styles.webview}
          startInLoadingState={true}
          scalesPageToFit={true}
          domStorageEnabled={true}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#c02135',
    height: 76,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});

export default PreviewFile;
