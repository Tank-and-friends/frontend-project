import {createStackNavigator} from '@react-navigation/stack';
import ListMaterial from './ListMaterial';
import DetailMaterial from './DetailMaterial';

const Stack = createStackNavigator();

const MaterialNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ListMaterial">
      <Stack.Screen
        name="ListMaterial"
        component={ListMaterial}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailMaterial"
        component={DetailMaterial}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MaterialNavigation;
