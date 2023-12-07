import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet, Text } from "react-native";
import { Login } from "../../utils/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { white } from "../../utils/Colors";
import { useAppContext } from "../../AppContext";
import {useNavigation} from "@react-navigation/native";
import {ScreenNames} from "../../utils/ScreenNames";

const LocationCard = ({ locationName }) => {

    return (
        <View>
            <View style={styles.cardContainer}>
                <Text
                    style={[styles.normalText, { fontWeight: "600" }]}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                >
                    {locationName}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
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

export default LocationCard;
