import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import {ScreenNames} from "../utils/ScreenNames";
import CustomDashboardHeader from "../components/CustomDashboardHeader";
import CompanyStaffDashboard from "../components/company-dashboard-components/CompanyStaffDashboard";
import CompanyInfoDashboard from "../components/company-dashboard-components/CompanyInfoDashboard";
import {black, grayBackground} from "../utils/Colors";
import CompanyEmployeeDashboard from "../components/company-dashboard-components/CompanyEmployeeDashboard";

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
            <CustomHeader title={'Punchcard'} page={ScreenNames.COMPANY_SETTINGS}/>
            <View style={styles.headerContainer}>
                <CustomDashboardHeader onTitlePress={handleTitlePress} tabs={tabs}/>
            </View>
            {selectedIndex === 0 && <CompanyInfoDashboard />}
            {selectedIndex === 1 && <CompanyEmployeeDashboard />}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: grayBackground,
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    headerContainer: {
        shadowColor: black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
        zIndex: 2,
    },
});

export default CompanyScreen;
