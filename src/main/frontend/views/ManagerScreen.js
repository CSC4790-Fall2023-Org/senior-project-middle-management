import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";
import ManagerEmployeeDashboard from "../components/manager-dashboard-components/ManagerEmployeeDashboard";
import ManagerShiftDashboard from "../components/manager-dashboard-components/ManagerShiftDashboard";
import CustomDashboardHeader from "../components/CustomDashboardHeader";
import {CircleUser} from "../utils/Icons";
import {black, grayBackground} from "../utils/Colors";
import EmployeeList from "../components/manager-dashboard-components/EmployeeList";

function ManagerScreen() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleTitlePress = (index) => {
        setSelectedIndex(index);
    }

    const tabs = [
        {
            id: 1,
            text: 'Employees',
        },
        {
            id: 2,
            text: 'Shifts',
        },
    ];

    return (
        <View style={styles.screen}>
            <CustomHeader
                title={'Punchcard'}
                page={ScreenNames.MANAGER_SETTINGS}
                icon={CircleUser}
            />
            <View style={styles.headerContainer}>
                <CustomDashboardHeader onTitlePress={handleTitlePress} tabs={tabs} />
            </View>
            {/*{selectedIndex === 0 && <ManagerEmployeeDashboard buttonTitle={"Add Employee"} />}*/}
            {selectedIndex === 0 && <EmployeeList canDelete={false} />}
            {selectedIndex === 1 && <ManagerShiftDashboard />}
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
export default ManagerScreen;