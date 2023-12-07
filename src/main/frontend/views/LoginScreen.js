import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import CustomRedirectButton from "../components/CustomRedirectButton";
import {ScreenNames} from "../utils/ScreenNames";
import {grayBackground, primaryGreen, white} from "../utils/Colors";
import CustomButton from "../components/CustomButton";
import EmployeeListModal from "../components/employeeComponents/EmployeeListModal";

function LoginScreen() {
    const [employeeListModal, setEmployeeListModal] = useState(false);

    const handleEmployeeListModal = () => {
        setEmployeeListModal(true);
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                showHideTransition={'fade'}
            />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Punchcard</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <CustomRedirectButton
                    buttonText={"Login as a Company"}
                    page={ScreenNames.COMPANY}
                    color={primaryGreen}
                    textColor={white}
                />
                <CustomRedirectButton
                    buttonText={"Login as a Manager"}
                    page={ScreenNames.MANAGER}
                    color={primaryGreen}
                    textColor={white}
                />
                <CustomButton
                    color={primaryGreen}
                    textColor={white}
                    buttonText={"Login as an Employee"}
                    handlePress={handleEmployeeListModal}
                />
                <EmployeeListModal
                    listModal={employeeListModal}
                    setListModal={setEmployeeListModal}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    buttonsContainer: {
        marginTop: 200,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    headerContainer: {
        height: 100,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    headerTitle: {
        color: primaryGreen,
        fontSize: 34,
        fontWeight: "bold",
        marginBottom: 8,
        marginLeft: 16,
    },
});

export default LoginScreen;
