import EmployeeShiftCard from "./EmployeeShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import AvailableShiftCardSwipe from "./AvailableShiftCardSwipe";


const AvailableShiftList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            <AvailableShiftCardSwipe />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});

export default AvailableShiftList;
