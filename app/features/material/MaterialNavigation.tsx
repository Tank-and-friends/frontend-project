import {createStackNavigator} from '@react-navigation/stack';
import ListMaterial from './ListMaterial';
import DetailMaterial from './DetailMaterial';

type ParamList = {
  ListMaterial: undefined;
  DetailMaterial: undefined;
};

const Stack = createStackNavigator<ParamList>();

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
