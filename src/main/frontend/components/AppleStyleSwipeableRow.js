import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CalendarPlus, CalendarXMark} from "../utils/Icons";
import EmployeeShiftCard from "./EmployeeShiftCard";

class AppleStyleSwipeableRow extends Component {
    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton style={styles.leftAction} onPress={this.close}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}>
                    <FontAwesomeIcon icon={CalendarPlus} size={36} color={'#FFFFFF'}/>
                </Animated.Text>
            </RectButton>
        );
    };

    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            // inputRange: [-101, -100, -50, 0],
            // //inputRange: [0, 50, 100, 101],
            // outputRange: [1, 0, 0, -20],

            inputRange: [-101, -50, 0],
            outputRange: [50, -20, 0],
        });
        return (
            <RectButton style={styles.rightAction} onPress={this.close}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}>
                    <FontAwesomeIcon icon={CalendarXMark} size={36} color={'#FFFFFF'} />
                </Animated.Text>
            </RectButton>
        );
    };

    render() {
        return (
            <Swipeable renderLeftActions={this.renderLeftActions} renderRightActions={this.renderRightActions} leftThreshold={50} rightThreshold={50} overshootFriction={8} overshootLeft={true} overshootRight={true}>
                <EmployeeShiftCard date={"Fri Sep 22"} shiftType={"Head Guard"} startTime={"10:00am"} endTime={"6:30pm"} locationId={12345} />
            </Swipeable>
        );
    }
};

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#388E3C',
        justifyContent: 'center',
        height: EmployeeShiftCard.height,
        margin: 15,
        marginBottom: 0,
        borderRadius: 10,
        overflow: "hidden",
    },
    actionText: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    rightAction: {
        flex: 1,
        backgroundColor: '#626567',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: EmployeeShiftCard.height,
        margin: 15,
        marginBottom: 0,
        borderRadius: 10,
        overflow: "hidden",
    },
    text: {
        backgroundColor: "white",
    },
})

export default AppleStyleSwipeableRow;