import EmployeeShiftCard from "./EmployeeShiftCard";
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import MyShiftCardSwipe from "./MyShiftCardSwipe";


const MyShiftList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            <MyShiftCardSwipe />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});

export default MyShiftList;