import React, {useState} from "react";
import {View, TouchableOpacity, StyleSheet, Platform, TouchableWithoutFeedback} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";
import CustomButton from "../CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Calendar, Plus} from '../../utils/Icons';
import Dropdown from "../Dropdown";
import {secondaryGray, white, primaryGreen, black} from "../../utils/Colors";
import {ipAddy} from "../../utils/IPAddress";
import AvailableShiftList from "../AvailableShiftList";
import AddShiftBody from "./AddShiftBody";

function ManagerShiftDashboard(){
    const navigation = useNavigation();
    const [addShiftModal, setAddShiftModal] = useState(false);
    const [locList, setLocList] = useState([]);
    const [shiftTypeList, setShiftTypeList] = useState([]);

    //Fetch Shift Info
    const getShiftData = async () => {
        //update fetch url according to IPv4 of Wi-Fi
        await fetch('http://' + ipAddy + ':8080/getShiftCreationInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                //change this according to manager ID needed
                managerId: "653d70c730cd4ad7a58ee7fb"
            }),
        }).then(r => r.json()
        ).then(async json => {
            const newLocList = await json.locationList;
            const newShiftList = await json.shiftTypeList;
            setLocList(newLocList);
            setShiftTypeList(newShiftList);
        }).catch(e => {
            console.error(e);
        });
    }

    const handleAddShiftClick = async () => {
        try {
            await getShiftData();
            setAddShiftModal(true);
        } catch (error) {
            console.log(error);
        }
    }

    const sortDropdown = ['All', 'Open', 'Taken'];

    const [selectedIndex, setSelectedIndex] = useState('All');

    const handleSortPress = (index) => {
        setSelectedIndex(index);
    }

    const handleUserClick = () => {
        navigation.navigate(ScreenNames.LOGIN);
    }

    return(
        <View styles={{flex: 1, flexDirection: "column"}}>
            <View style={styles.buttonsContainer}>
                <View style={styles.addShiftButton}>
                    <CustomButton
                        buttonText={"Add Shift"}
                        handlePress={handleAddShiftClick}
                        color={primaryGreen}
                        textColor={white}
                    />
                </View>
                <TouchableOpacity onPress={handleUserClick}>
                    <FontAwesomeIcon icon={Calendar} size={48} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownWrapperBorder}>
                    <Dropdown
                        items={sortDropdown}
                        dropdownPress={handleSortPress}
                        left={10}
                        top={290}
                        width={200}
                        fontSize={24}
                        fontWht={"bold"}
                        chvSize={32}
                    />
                </View>
            </View>
            <View>
                <TouchableWithoutFeedback style={styles.addButton}>
                    <FontAwesomeIcon icon={Plus} size={34} color={white} />
                </TouchableWithoutFeedback>
                <AvailableShiftList />
            </View>
            <AddShiftBody
                addShiftModal={addShiftModal}
                setAddShiftModal={setAddShiftModal}
                shiftOptions={shiftTypeList}
                locationOptions={locList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownWrapper:{
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8,
    },
    dropdownWrapperBorder:{
        backgroundColor: white,
        borderWidth: 0.5,
        borderColor: secondaryGray,
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
        justifyContent: "center",
    },
    addShiftButton: {
        paddingLeft: 16,
    },
    icon: {
        marginRight: 16,
        color: primaryGreen,
    },
    addButton: {
        zIndex: 1,
        height: 60,
        width: 60,
        backgroundColor: primaryGreen,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        position: "absolute",
        // bottom: 16,
        right: 16,
        alignSelf: "flex-end",
    },
});
export default ManagerShiftDashboard;
