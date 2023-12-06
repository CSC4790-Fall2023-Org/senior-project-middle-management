import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, StyleSheet, Dimensions} from 'react-native';
import CustomButton from "../CustomButton";
import Dropdown from "../Dropdown";
import CompanyEmployeeView from "./CompanyEmployeeView";
import {ScreenNames} from "../../utils/ScreenNames";
import {grayBackground, primaryGreen, secondaryGray, white} from "../../utils/Colors";
import AddEmployeeBody from "./AddEmployeeBody";

const CompanyEmployeeDashboard = () => {
    const [addEmployeeModal, setAddEmployeeModal] = useState(false);
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;

    const options = ["Default", "Name", "Hours Worked" ]

    //Fetch Shift Info
    const getEmpData = async () => {
        // //update fetch url according to IPv4 of Wi-Fi
        // await fetch('http://' + ipAddy + ':8080/getShiftCreationInfo', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         //change this according to manager ID needed
        //         managerId: "651f4001631f63367d896197"
        //     }),
        // }).then(r => r.json()
        // ).then(async json => {
        //     const newLocList = await json.locationList;
        //     const newShiftList = await json.shiftTypeList;
        //navigation.navigate(ScreenNames.ADD_EMPLOYEE)
        // }).catch(e => {
        //     console.error(e);
        // });

    }

    const handleEmpAddClick = async () => {
        try {
            await getEmpData();
            setAddEmployeeModal(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDropdownPress = (index) => {
        setSelectedIndex(index);
    }

    return(
        <View style={[styles.container, {width:screenWidth}]}>
            <View style={styles.buttonContainer}>
                <CustomButton
                    buttonText={'Add Employee'}
                    handlePress={handleEmpAddClick}
                    color={primaryGreen}
                    textColor={white}
                />
            </View>
            <View style={[styles.dropdownContainer, {width:200}]}>
                <Dropdown
                    chvSize={10}
                    fontWht={10}
                    fontSize={10}
                    width={200}
                    top={100}
                    left={100}
                    dropdownPress={handleDropdownPress}
                    items={options}
                />
            </View>
            <AddEmployeeBody
                addEmployeeModal={addEmployeeModal}
                setAddEmployeeModal={setAddEmployeeModal}
            />
            <CompanyEmployeeView/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    buttonContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: grayBackground,
    },
    dropdownContainer: {
        backgroundColor: white,
        borderRadius: 10,
        width: 200,
        justifyContent: "center",
        borderColor: secondaryGray,
        borderWidth: 0.5,
        marginLeft: 20,
    },
});

export default CompanyEmployeeDashboard;
