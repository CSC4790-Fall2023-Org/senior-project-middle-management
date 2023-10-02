import React, { Component } from 'react';
import {Animated, StyleSheet, Alert} from 'react-native';
import * as Haptics from 'expo-haptics';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CalendarAdd, TrashCan} from "../utils/Icons";
import EmployeeShiftCard from "./EmployeeShiftCard";

class AvailableShiftCardSwipe extends Component {
    swipeableRef = React.createRef();
    handleSwipeOpen = (direction) => {
        if (direction === 'right') {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            Alert.alert(
                'Delete Shift',
                'Are you sure you want to delete this shift from your feed?',
                [
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                            console.log('Shift deleted!');
                            Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Success
                            );
                        },
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {
                            this.swipeableRef.current.close();

                        }
                    }
                ]
            );
        } else if (direction === 'left') {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            Alert.alert(
                'Add shift',
                'Are you sure you want to pick this shift up?',
                [
                    {
                        text: 'Pick Up',
                        style: 'default',
                        onPress: () => {
                            console.log('Picked Up Shift!');
                            Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Success
                            );
                        },
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {
                            this.swipeableRef.current.close();
                        }
                    }
                ]
            )
        }
    };

    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, -10, 0, 1],
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
                    <FontAwesomeIcon icon={CalendarAdd} size={36} color={'#FFFFFF'}/>
                </Animated.Text>
            </RectButton>
        );
    };

    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [-101, -100, -50, 0],
            outputRange: [-1, 0, 10, 20],
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
                    <FontAwesomeIcon icon={TrashCan} size={36} color={'#FFFFFF'}/>
                </Animated.Text>
            </RectButton>
        );
    };

    render() {
        return (
            <Swipeable renderLeftActions={this.renderLeftActions} renderRightActions={this.renderRightActions} onSwipeableOpen={(direction) => this.handleSwipeOpen(direction)} ref={this.swipeableRef} overshootFriction={8}>
                <EmployeeShiftCard date={"Thu Sep 21"} shiftType={"Lifeguard"} startTime={"12:00am"} endTime={"8:30pm"} locationId={"Pool"} />
            </Swipeable>
        );
    }
}

const styles= StyleSheet.create({
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
})

export default AvailableShiftCardSwipe;