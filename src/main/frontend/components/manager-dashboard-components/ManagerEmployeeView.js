import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ManagerEmployeeCard from "./ManagerEmployeeCard";

const ManagerEmployeeView = () => {


    return(
        <ScrollView style={styles.scrollView}>
            <View>
                <ManagerEmployeeCard
                    id={"651f3f35631f63367d896196"}
                    name={"Tua Tagovailoa"}
                    shiftsTaken={40}
                    type={"Head Lifeguard"}
                    worked={4}
                />
                <ManagerEmployeeCard
                    id={12346}
                    name={"Tyreek Hill"}
                    shiftsTaken={30}
                    type={"Lifeguard"}
                    worked={12}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    },
});
export default ManagerEmployeeView;