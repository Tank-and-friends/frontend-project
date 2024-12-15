import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import FriendPersonalInfo from './FriendPersonalInfo';
import MessageDetail from './MessageDetail';
import MessageScreen from './MessageScreen';
import {SenderInfo} from '../../models/Message';

type ParamList = {
  MessageScreen: undefined;
  MessageDetail: {
    conversationId: string;
    partner: SenderInfo;
  };
  FriendPersonalInfo: undefined;
};

const Stack = createStackNavigator<ParamList>();

export const MessageFeaturesStacks = () => {
  return (
    <Stack.Navigator initialRouteName="MessageScreen">
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FriendPersonalInfo"
        component={FriendPersonalInfo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
