import React, {useState} from 'react';
import {Animated, StyleSheet, Alert} from 'react-native';
import * as Haptics from 'expo-haptics';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CalendarDelete, Transfer, TrashCan} from "../../utils/Icons";
import {white, blueAction, destructiveAction} from "../../utils/Colors";
import ShiftCard from "../ShiftCard";
import {ipAddy} from "../../utils/IPAddress";

function ManagerShiftCardSwipe ({ShiftCardComponent, shiftId, updateReloadKey}) {
    let swipeableRef = React.createRef();
    const [deleteResponseData, setDeleteResponseData] = useState(null);

    const handleSwipeOpen = (direction) => {
        if (direction === 'right') {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            Alert.alert(
                'Delete Shift',
                'Are you sure you want to delete this shift?',
                [
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {handleDeleteShift()},
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {
                            swipeableRef.current.close();

                        }
                    }
                ]
            );
        } else if (direction === 'left') {

        }
    };

    const renderLeftActions = (progress, dragX) => {
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
                    <FontAwesomeIcon icon={Transfer} size={36} color={white}/>
                </Animated.Text>
            </RectButton>
        );
    };

    const renderRightActions = (progress, dragX) => {
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

    const handleDeleteShift = () => {
        fetch('http://' + ipAddy + ':8080/deleteShift', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shiftId: shiftId
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                );
                setDeleteResponseData(data);
                updateReloadKey();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <Swipeable
            // renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableOpen={(direction) => handleSwipeOpen(direction)}
            ref={swipeableRef}
            overshootFriction={8}
        >
            {ShiftCardComponent}
        </Swipeable>
    );
}

const styles= StyleSheet.create({
    leftAction: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: blueAction,
        justifyContent: 'center',
        height: ShiftCard.height,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        overflow: "hidden",
    },
    actionText: {
        color: white,
        backgroundColor: 'transparent',
    },
    rightAction: {
        flex: 1,
        backgroundColor: destructiveAction,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: ShiftCard.height,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        overflow: "hidden",
    },
})

export default ManagerShiftCardSwipe;
