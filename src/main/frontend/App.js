import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./views/LoginScreen";
import CompanyScreen from "./views/CompanyScreen";
import ManagerScreen from "./views/ManagerScreen";
import EmployeeScreen from "./views/EmployeeScreen";
import CompanySettingsScreen from "./views/CompanySettingsScreen";
import ManagerSettingsScreen from "./views/ManagerSettingsScreen";
import EmployeeSettingsScreen from "./views/EmployeeSettingsScreen";
import { ScreenNames } from "./utils/ScreenNames";
import { RootSiblingParent } from 'react-native-root-siblings';
import { AppProvider } from './AppContext';

const Stack = createStackNavigator();

function App() {
    return (
        <RootSiblingParent>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={ScreenNames.LOGIN}>
                    <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name={ScreenNames.COMPANY} component={CompanyScreen} options={{ headerShown: false }} />
                    <Stack.Screen name={ScreenNames.MANAGER} component={ManagerScreen} options={{ headerShown: false }} />
                    <Stack.Screen name={ScreenNames.EMPLOYEE} component={EmployeeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name={ScreenNames.COMPANY_SETTINGS} component={CompanySettingsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name={ScreenNames.MANAGER_SETTINGS} component={ManagerSettingsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name={ScreenNames.EMPLOYEE_SETTINGS} component={EmployeeSettingsScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    );
}

const AppWithProvider = () => (
    <AppProvider>
        <App />
    </AppProvider>
);

export default AppWithProvider;
