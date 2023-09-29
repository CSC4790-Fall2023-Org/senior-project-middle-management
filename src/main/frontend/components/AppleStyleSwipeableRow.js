import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
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
                    Archive
                </Animated.Text>
            </RectButton>
        );
    };

    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
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
                    Add
                </Animated.Text>
            </RectButton>
        );
    };

    render() {
        return (
            <Swipeable renderLeftActions={this.renderLeftActions} renderRightActions={this.renderRightActions} leftThreshold={50} rightThreshold={50} overshootFriction={8} overshootLeft={true}>
                <EmployeeShiftCard date={"Fri Sep 22"} shiftType={"Head Guard"} startTime={"10:00am"} endTime={"6:30pm"} locationId={12345} />
            </Swipeable>
        );
    }
};

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#388E3C',
        justifyContent: 'center',
        height: EmployeeShiftCard.height,
        margin: 15,
        //marginRight: 0,
        marginBottom: 0,
        borderRadius: 10,
        //maxWidth: 100,
        overflow: "hidden",
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        flex: 1,
        backgroundColor: '#D50000',
        justifyContent: 'center',
        height: EmployeeShiftCard.height,
        margin: 15,
        marginLeft: 0,
        marginBottom: 0,
        borderRadius: 10,
        maxWidth: 100,
        overflow: "hidden",
    },
    text: {
        backgroundColor: "white",
    },
})

export default AppleStyleSwipeableRow;