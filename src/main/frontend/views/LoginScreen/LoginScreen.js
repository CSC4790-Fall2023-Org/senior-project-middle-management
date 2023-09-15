import React from 'react';
import { View, Text, Button } from 'react-native';

function LoginScreen({ navigation }) {
    return (
        <View>
            <Text>Login Screen</Text>
            <Button
                title="Login as Company"
                onPress={() => navigation.navigate('Company')}
            />
            <Button
                title={"Login as Manager"}
                onPress={() => navigation.navigate('Manager')}
            />
            <Button
                title={"Login as Employee"}
                onPress={() => navigation.navigate('Employee')}
            />
        </View>
    );
}

export default LoginScreen;