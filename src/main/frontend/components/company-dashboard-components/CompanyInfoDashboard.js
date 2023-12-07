import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import employeeData from "../../mockApiCalls/employeeData.json";
import {black, clickableText, secondaryGray, white} from "../../utils/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ChevronRight} from "../../utils/Icons";
import CompanyLocationsModal from "./CompanyLocationsModal";
import CompanyTypesModal from "./CompanyTypesModal";
import {ipAddy} from "../../utils/IPAddress";

const CompanyInfoDashboard = () => {
    const [locationsModal, setLocationsModal] = useState(false);
    const [typesModal, setTypesModal] = useState(false);
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        fetch('http://' + ipAddy + ':8080/getOrganizationInfo', {
            method: 'POST',
            body: JSON.stringify({
                organizationId: '6500e97e491cac473a9b80c8'
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                console.log(data);
                setCompanyData(data.organizationInfo);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const name = companyData ? companyData.organizationName : '';
    const email = companyData ? companyData.orgOwnerEmail : '';
    const weeksToRelease = companyData ? companyData.weeksToReleaseShifts : null;
    const locationList = companyData ? companyData.locationList : [];

    const handleLocationsModal = () => {
        setLocationsModal(!locationsModal);
        console.log(locationList);
    }

    const handleTypesModal = () => {
        setTypesModal(!typesModal);
    }

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
                        {name}
                    </Text>
                </View>
                <View style={[styles.infoItem, {borderBottomWidth: 0}]}>
                    <Text style={styles.infoLabel}>Company Email</Text>
                    <Text
                        style={styles.labelValue}
                        numberOfLines={1}
                        ellipsizeMode={"middle"}
                    >
                        {email}
                    </Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={[styles.infoItem, {borderBottomWidth: 0}]}>
                    <Text style={[styles.infoLabel, {width: "75%"}]}>Weeks to Release Shifts</Text>
                    <Text style={[styles.labelValue, {maxWidth: "25%"}]}>
                        {weeksToRelease}
                    </Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    style={[styles.infoItem, {borderBottomWidth: 0}]}
                    onPress={handleLocationsModal}
                >
                    <Text style={[styles.infoLabel, {width: "50%"}]}>Company Locations</Text>
                    <View style={{paddingRight: 14}}>
                        <FontAwesomeIcon
                            icon={ChevronRight}
                            size={17}
                            color={clickableText}
                        />
                    </View>
                </TouchableOpacity>
                <CompanyLocationsModal
                    locationsModal={locationsModal}
                    setLocationsModal={setLocationsModal}
                    locationList={locationList}
                />
                {/*<TouchableOpacity*/}
                {/*    style={[styles.infoItem, {borderBottomWidth: 0}]}*/}
                {/*    onPress={handleTypesModal}*/}
                {/*>*/}
                {/*    <Text style={[styles.infoLabel, {width: "80%"}]}>Employee Types</Text>*/}
                {/*    <View style={{paddingRight: 14}}>*/}
                {/*        <FontAwesomeIcon*/}
                {/*            icon={ChevronRight}*/}
                {/*            size={17}*/}
                {/*            color={clickableText}*/}
                {/*        />*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<CompanyTypesModal typesModal={typesModal} setTypesModal={setTypesModal} />*/}
            </View>
        </ScrollView>
    );
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
