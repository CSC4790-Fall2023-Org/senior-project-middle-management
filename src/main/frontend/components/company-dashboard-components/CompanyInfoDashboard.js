import React from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import employeeData from "../../mockApiCalls/employeeData.json";
import {black, clickableText, secondaryGray, white} from "../../utils/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ChevronRight} from "../../utils/Icons";

const CompanyInfoDashboard = () => {

    return (
        <ScrollView>
            <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Company Name</Text>
                    <Text
                        style={styles.labelValue}
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                    >
                        Parks and Rec
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Company Email</Text>
                    <Text
                        style={styles.labelValue}
                        numberOfLines={1}
                        ellipsizeMode={"middle"}
                    >
                        {employeeData.email}
                    </Text>
                </View>
                <View style={[styles.infoItem, {borderBottomWidth: 0}]}>
                    <Text style={styles.infoLabel}>Phone Number</Text>
                    <Text style={styles.labelValue}>{employeeData.phoneNumber}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.infoItem}>
                    <Text style={[styles.infoLabel, {width: "50%"}]}>Company Locations</Text>
                    <View style={{paddingRight: 14}}>
                        <FontAwesomeIcon
                            icon={ChevronRight}
                            size={17}
                            color={clickableText}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.infoItem, {borderBottomWidth: 0}]}>
                    <Text style={[styles.infoLabel, {width: "80%"}]}>Employee Types</Text>
                    <View style={{paddingRight: 14}}>
                        <FontAwesomeIcon
                            icon={ChevronRight}
                            size={17}
                            color={clickableText}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: white,
        margin: 16,
        borderRadius: 10,
        paddingLeft: 14,
    },
    infoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 14,
        paddingBottom: 14,
        borderBottomWidth: 0.25,
        borderBottomColor: secondaryGray,
    },
    infoLabel: {
        width: "40%",
        color: black,
        fontSize: 17,
    },
    labelValue: {
        width: "60%",
        color: clickableText,
        fontSize: 17,
        paddingRight: 14,
        textAlign: "right",
    },
});

export default CompanyInfoDashboard;
