import React from 'react';
import {View} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import {ScreenNames} from "../utils/ScreenNames";

function CompanyScreen() {
    return (
        <View>
            <CustomHeader title={"Company Name"} page={ScreenNames.COMPANY_SETTINGS}/>
        </View>
    );
}

export default CompanyScreen;