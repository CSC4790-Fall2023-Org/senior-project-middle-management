import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ManagerEmployeeCard from "./ManagerEmployeeCard";

const ManagerEmployeeView = () => {

    return(
        <ScrollView style={styles.scrollView}>
            <View>
                <ManagerEmployeeCard
                    id={"651f3f35631f63367d896196"}
                    fName={"Diego"}
                    lName={"Messmacher"}
                    email={"email@email.com"}
                    phone={"111-111-1111"}
                    type={"Guard"}
                    shiftsClaimed={5}
                    hoursClaimed={30}
                    maxHours={40}
                    wage={17}
                />
                <ManagerEmployeeCard
                    id={"657010353fdbd398bb9a3ee5"}
                    fName={"Ralph"}
                    lName={"Gatdula"}
                    email={"email@email.com"}
                    phone={"111-111-2222"}
                    type={"Guard"}
                    shiftsClaimed={4}
                    hoursClaimed={24}
                    maxHours={40}
                    wage={19.50}
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
