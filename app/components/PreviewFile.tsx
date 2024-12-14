/* eslint-disable react-native/no-inline-styles */

import {RouteProp} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {getPreviewDocumentUrl} from '../utils/file';
import TopNavWithoutAvatar from './TopComponent/TopNavWithoutAvatar';
import { PaperProvider } from 'react-native-paper';

type Props = PropsWithChildren<{route: RouteProp<RouteProps>}>;

type RouteProps = {
  PreviewFile: {
    title: string;
    url: string;
  };
};

const PreviewFile = ({route}: Props) => {
  const {title, url} = route.params;
  return (
    <PaperProvider>

    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <TopNavWithoutAvatar title={title} />
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
});

export default PreviewFile;
