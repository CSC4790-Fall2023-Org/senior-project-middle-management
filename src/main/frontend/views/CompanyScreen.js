import React from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';

function CompanyScreen() {
    return (
        <View>
            <CustomHeader title={"Company Name"} page={"Company Settings"}/>
        </View>
    );
}

export default CompanyScreen;