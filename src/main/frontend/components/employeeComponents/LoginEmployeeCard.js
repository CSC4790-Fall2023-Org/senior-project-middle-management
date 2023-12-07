import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet, Text } from "react-native";
import { Login } from "../../utils/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { white } from "../../utils/Colors";
import { useAppContext } from "../../AppContext";
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";

const EmployeeLoginCard = ({ fName, lName, id, setEmployeeListModal }) => {
    const { setConstEmployeeId } = useAppContext();
    const navigation = useNavigation();

    const passId = () => {
        setConstEmployeeId(id);
        setEmployeeListModal(false);
        navigation.navigate(ScreenNames.EMPLOYEE);
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={passId}>
                <View style={styles.cardContainer}>
                    <Text
                        style={[styles.normalText, { fontWeight: "600" }]}
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                    >
                        {fName + " " + lName}
                    </Text>
                    <FontAwesomeIcon icon={Login} size={17} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: white,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
    },
    normalText: {
        fontSize: 17,
    },
});

export default EmployeeLoginCard;
