import React, {useState} from 'react';
import {View} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {ScreenNames} from "../utils/ScreenNames";
import ManagerEmployeeDashboard from "../components/manager-dashboard-components/ManagerEmployeeDashboard";
import ManagerShiftDashboard from "../components/manager-dashboard-components/ManagerShiftDashboard";
import DashboardTabHeader from "../components/DashboardTabHeader";

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
        <View>
            <CustomHeader title={"Manager Name"} page={ScreenNames.MANAGER_SETTINGS}/>
            <DashboardTabHeader tabs={tabs} onTitlePress={handleTitlePress}/>
            <View>
                {selectedIndex === 0 && <ManagerEmployeeDashboard />}
                {selectedIndex === 1 && <ManagerShiftDashboard />}
            </View>

        </View>
    );
}

export default ManagerScreen;