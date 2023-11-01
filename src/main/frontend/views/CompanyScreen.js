import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import {ScreenNames} from "../utils/ScreenNames";
import CustomDashboardHeader from "../components/CustomDashboardHeader";
import CompanyStaffDashboard from "../components/company-dashboard-components/CompanyStaffDashboard";
import CompanyInfoDashboard from "../components/company-dashboard-components/CompanyInfoDashboard";

function CompanyScreen() {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleTitlePress = (index) => {
        setSelectedIndex(index);
    }

    const tabs = [
        {
            id: 1,
            text: 'Info',
        },
        {
            id: 2,
            text: 'Staff',
        },
    ];
    return (
        <View style={styles.screen}>
            <CustomHeader title={"Company Name"} page={ScreenNames.COMPANY_SETTINGS}/>
            <CustomDashboardHeader onTitlePress={handleTitlePress} tabs={tabs}/>
            {selectedIndex === 0 && <CompanyInfoDashboard />}
            {selectedIndex === 1 && <CompanyStaffDashboard/>}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#F1F1F1',
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },

});

export default CompanyScreen;