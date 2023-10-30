import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import CustomButton from "../CustomButton";
import Dropdown from "../Dropdown";
import CompanyEmployeeView from "./CompanyEmployeeView";
import AddEmployeePopup from "./AddEmployeePopup";




const CompanyEmployeeDashboard = () => {

    const screenWidth = Dimensions.get('window').width;

    const options = ["Default", "Name", "Hours Worked" ]

    const [isModalVisible, setModalVisible] = useState(false)

    const [selectedIndex, setSelectedIndex] = useState('All');

    const handleModalOpen = () =>{
        setModalVisible(!isModalVisible)
    }
    const handleDropdownPress = (index) => {
        setSelectedIndex(index);
    }
    return(
        <View style={[styles.container, {width:screenWidth}]}>
            <View style={styles.buttonContainer}>
                <CustomButton buttonText={'Add Employee'} handlePress={handleModalOpen}/>
            </View>
            <View style={[styles.dropdownContainer,{width:200}]}>
                <Dropdown chvSize={10} fontWht={10} fontSize={10} width={200} top={100} left={100} dropdownPress={handleDropdownPress} items={options}/>
            </View>
            <CompanyEmployeeView/>
            <AddEmployeePopup isModalVisible={isModalVisible} handlePressButton={handleModalOpen}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "column",
    },
    buttonContainer:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#F1F1F1',

    },
    dropdownContainer:{
        backgroundColor:'#FFFFFF',
        borderRadius: 10,
        width: 200,
        justifyContent: "center",
        borderColor:"#ccc",
        borderWidth:.5,
        marginLeft:20


    },



});
export default CompanyEmployeeDashboard;