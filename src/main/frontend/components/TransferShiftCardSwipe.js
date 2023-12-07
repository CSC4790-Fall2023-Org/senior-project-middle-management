import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Alert} from 'react-native';
import * as Haptics from 'expo-haptics';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CalendarAdd, Check, TrashCan, XMark} from "../utils/Icons";
import {greenAction, grayAction, white, destructiveAction} from "../utils/Colors";
import ShiftCard from "./ShiftCard";
import {ipAddy} from "../utils/IPAddress";
import Toast from 'react-native-root-toast';
import {useAppContext} from "../AppContext";

function TransferShiftCardSwipe({ShiftCardComponent, shiftId, updateReloadKey}) {
    let swipeableRef = React.createRef();
    const [acceptData, setAcceptData] = useState(null);
    const [declineData, setDeclineData] = useState(null);
    const { constEmployeeId } = useAppContext();

    const handleSwipeOpen = (direction) => {
        if (direction === 'right') {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            Alert.alert(
                'Decline Transfer',
                'Are you sure you want to decline this shift transfer?',
                [
                    {
                        text: 'Decline',
                        style: 'destructive',
                        onPress: () => {handleDecline()},
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
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            Alert.alert(
                'Accept Transfer',
                'Are you sure you want to accept this shift transfer?',
                [
                    {
                        text: 'Accept',
                        style: 'default',
                        onPress: () => {handleAccept()},
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {
                            swipeableRef.current.close();
                        }
                    }
                ]
            )
        }
    };

    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, -10, 0, 1],
        });
        return (
            <RectButton style={styles.leftAction}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}>
                    <FontAwesomeIcon icon={Check} size={36} color={white}/>
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
            <RectButton style={styles.rightAction}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}>
                    <FontAwesomeIcon icon={XMark} size={36} color={white}/>
                </Animated.Text>
            </RectButton>
        );
    };

    const handleAccept = () => {
        fetch('http://' + ipAddy + ':8080/acceptTransferredShift', {
            method: 'POST',
            body: JSON.stringify({
                shiftId: shiftId,
                targetEmployeeId: constEmployeeId
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                setAcceptData(data);
                updateReloadKey();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        );
    }

    const handleDecline = () => {
        fetch('http://' + ipAddy + ':8080/declineTransferredShift', {
            method: 'POST',
            body: JSON.stringify({
                shiftId: shiftId,
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                setDeclineData(data);
                updateReloadKey();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        );
    }

    return (
        <Swipeable
            renderLeftActions={renderLeftActions}
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
        backgroundColor: greenAction,
        justifyContent: 'center',
        height: ShiftCard.height,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        overflow: "hidden",
    },
    actionText: {
        color: 'white',
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
    toast: {
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
});

export default TransferShiftCardSwipe;
