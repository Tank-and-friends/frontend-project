import {createStackNavigator} from '@react-navigation/stack';
import ClassList from './components/ClassList';
import ClassRegisterMain from './ClassRegisterScreen';

const Stack = createStackNavigator();

const ClassRegisterNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClassRegisterMain"
        component={ClassRegisterMain}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ClassList" component={ClassList} />
    </Stack.Navigator>
  );
};

export default ClassRegisterNavigation;
