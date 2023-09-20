import React from 'react';
import { View, Text } from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";

function ManagerScreen() {
    return (
        <View>
            <CustomHeader title={"Manager Name"} page={ScreenNames.MANAGER_SETTINGS}/>
        </View>
    );
}

export default ManagerScreen;