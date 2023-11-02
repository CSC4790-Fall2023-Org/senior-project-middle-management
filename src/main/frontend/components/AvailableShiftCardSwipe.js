import React, {Component, useEffect, useState} from 'react';
import {Animated, StyleSheet, Alert} from 'react-native';
import * as Haptics from 'expo-haptics';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CalendarAdd, TrashCan} from "../utils/Icons";
import {greenAction, grayAction, white} from "../utils/Colors";
import ShiftCard from "./ShiftCard";

class AvailableShiftCardSwipe extends Component {
    swipeableRef = React.createRef();
    handleSwipeOpen = (direction) => {
        if (direction === 'right') {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            Alert.alert(
                'Remove Shift',
                'Are you sure you want to remove this shift from your feed?',
                [
                    {
                        text: 'Remove',
                        style: 'destructive',
                        onPress: () => {
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
                            this.handleShiftAdd();
                            // Haptics.notificationAsync(
                            //     Haptics.NotificationFeedbackType.Success
                            // );
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
                    <FontAwesomeIcon icon={CalendarAdd} size={36} color={white}/>
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
                    <FontAwesomeIcon icon={TrashCan} size={36} color={white}/>
                </Animated.Text>
            </RectButton>
        );
    };

    handleShiftAdd = () => {
        const [addResponse, setAddResponse] = useState(null);
        useEffect(() => {
            fetch('http://10.138.29.47:8080/assignShift', {
                method: 'POST',
                headers: {},
                body: JSON.stringify({
                    employeeId: "651f3f35631f63367d896196"
                }),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(data => {
                    setShiftData(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }, []);
    }

    render() {
        const { ShiftCardComponent } = this.props;

        return (
            <Swipeable
                renderLeftActions={this.renderLeftActions}
                renderRightActions={this.renderRightActions}
                onSwipeableOpen={(direction) => this.handleSwipeOpen(direction)}
                ref={this.swipeableRef}
                overshootFriction={8}
            >
                {ShiftCardComponent}
            </Swipeable>
        );
    }
}

const styles= StyleSheet.create({
    leftAction: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: greenAction,
        justifyContent: 'center',
        height: ShiftCard.height,
        margin: 16,
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
        backgroundColor: grayAction,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: ShiftCard.height,
        margin: 16,
        marginBottom: 0,
        borderRadius: 10,
        overflow: "hidden",
    },
})

export default AvailableShiftCardSwipe;
