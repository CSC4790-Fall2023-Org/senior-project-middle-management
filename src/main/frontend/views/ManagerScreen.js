import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";
import ManagerDashboardHeader from "../components/manager-dashboard-components/ManagerDashboardHeader";
import ManagerEmployeeDashboard from "../components/manager-dashboard-components/ManagerEmployeeDashboard";
import ManagerShiftDashboard from "../components/manager-dashboard-components/ManagerShiftDashboard";

function ManagerScreen() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleTitlePress = (index) => {
        setSelectedIndex(index);
    }

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <View>
            <CustomHeader title={"Manager Name"} page={ScreenNames.MANAGER_SETTINGS}/>
            <ManagerDashboardHeader onTitlePress={handleTitlePress}/>
            <View>
                {selectedIndex === 0 && <ManagerEmployeeDashboard buttonTitle={"Add Employee"} options={options} />}
                {selectedIndex === 1 && <ManagerShiftDashboard />}
            </View>

        </View>
    );
}
export default ManagerScreen;