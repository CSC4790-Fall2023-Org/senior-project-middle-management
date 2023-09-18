import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./views/LoginScreen/LoginScreen";
import CompanyScreen from "./views/CompanyScreen/CompanyScreen";
import ManagerScreen from "./views/ManagerScreen/ManagerScreen";
import EmployeeScreen from "./views/EmployeeScreen/EmployeeScreen";

const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name={"Login"} component={LoginScreen} />
            <Stack.Screen name={"Company"} component={CompanyScreen} />
            <Stack.Screen name={"Manager"} component={ManagerScreen} />
            <Stack.Screen name={"Employee"} component={EmployeeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;