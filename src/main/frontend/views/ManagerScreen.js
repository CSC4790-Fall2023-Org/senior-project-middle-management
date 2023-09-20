import React from 'react';
import { View, Text } from 'react-native';
import CustomHeader from "../components/CustomHeader";

function ManagerScreen() {
    return (
        <View>
            <CustomHeader title={"Manager Name"} page={"Manager Settings"}/>
        </View>
    );
}

export default ManagerScreen;