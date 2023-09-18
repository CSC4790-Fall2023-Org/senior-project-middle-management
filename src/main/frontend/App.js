import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./views/LoginScreen";
import CompanyScreen from "./views/CompanyScreen";
import ManagerScreen from "./views/ManagerScreen";
import EmployeeScreen from "./views/EmployeeScreen";

const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name={"Login"} component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name={"Company"} component={CompanyScreen} options={{headerShown: false}} />
            <Stack.Screen name={"Manager"} component={ManagerScreen} options={{headerShown: false}} />
            <Stack.Screen name={"Employee"} component={EmployeeScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;