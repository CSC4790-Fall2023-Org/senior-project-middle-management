
import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import ManagerShiftCard from "./ManagerShiftCard";


const ManagerShiftView = ({available}) => {
    return(
        <ScrollView style={styles.scrollView}>
            {available === "Open" || available ==="All" ? (
                <ManagerShiftCard date={"Thu Sep 21"} shiftType={"Lifeguard"} startTime={"12:00am"} endTime={"8:30pm"} locationId={12345} available={"Open"} />

            ):null}
            {available === "Taken" || available ==="All" ? (
                <ManagerShiftCard date={"Thu Sep 21"} shiftType={"Lifeguard"} startTime={"12:00am"} endTime={"8:30pm"} locationId={12345} available={"Taken"} />

            ):null}


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});

export default ManagerShiftView;
