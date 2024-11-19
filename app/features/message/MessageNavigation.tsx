import {createStackNavigator} from '@react-navigation/stack';
import MessageScreen from './MessageScreen';
import MessageDetail from './MessageDetail';
import FriendPersonalInfo from './FriendPersonalInfo';
import NewMessageScreen from './NewMessageScreen';

type ParamList = {
  MessageScreen: undefined;
  NewMessageScreen: undefined;
  MessageDetail: {
    newMessage: boolean;
  };
  FriendPersonalInfo: undefined;
};

const Stack = createStackNavigator<ParamList>();

const MessageNavigation = () => {
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
      <Stack.Screen
        name="NewMessageScreen"
        component={NewMessageScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MessageNavigation;
