import { StyleSheet } from 'react-native';
import {destructiveAction, grayBackground, secondaryGray, white} from "./Colors";

export const AddPopupStyles = StyleSheet.create({
    modal: {
        position: "relative",
        backgroundColor: grayBackground,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    longContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // padding: 5,
        width: "100%",
        //margin: 5,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    dropdownContainer: {
        backgroundColor: white,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // borderColor: secondaryGray,
        // borderWidth: 2,
        borderRadius: 10,
        width: "100%",
        //fontSize: 18,
        //fontFamily: 'HelveticaNeue-Medium',
        padding: 12,
        marginBottom: 18,
    },
    input: {
        width: "95%",
        height: 30,
        fontSize: 24,
        margin: 5,
    },
    inputContainer: {
        backgroundColor: white,
        padding: 5,
        paddingHorizontal: 10,
        margin: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderColor: secondaryGray,
        borderWidth: 2,
        borderRadius: 10,
        width: "100%",
    },
    destructiveAction: {
        borderColor: destructiveAction,
        borderWidth: 1,
    },
});