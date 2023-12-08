import React, {useState} from 'react';
import {Animated, StyleSheet, Alert} from 'react-native';
import * as Haptics from 'expo-haptics';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CalendarDelete, Transfer} from "../utils/Icons";
import {white, blueAction, destructiveAction} from "../utils/Colors";
import ShiftCard from "./ShiftCard";
import TransferShiftModal from "./TransferShiftModal";

function MyShiftCardSwipe ({ShiftCardComponent, shiftId, transferId, updateReloadKey}) {
    const [transferShiftModal, setTransferShiftModal] = useState(false);
    let swipeableRef = React.createRef();

    const handleSwipeOpen = (direction) => {
        if (direction === 'right') {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            Alert.alert(
                'Drop Shift',
                'Are you sure you want to drop this shift?',
                [
                    {
                        text: 'Drop',
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
                            swipeableRef.current.close();

                        }
                    }
                ]
            );
        } else if (direction === 'left') {
            handleTransferOpen();
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
                    <FontAwesomeIcon icon={CalendarDelete} size={36} color={white}/>
                </Animated.Text>
            </RectButton>
        );
    };

    const handleTransferClose = () => {
        if (swipeableRef.current) {
            swipeableRef.current.close();
        }
        setTransferShiftModal(false) // Close the modal.
    }

    const handleTransferOpen = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setTransferShiftModal(true);
    }

    return (
            <Swipeable
                renderLeftActions={transferId === null ? renderLeftActions : null}
                // renderRightActions={renderRightActions}
                onSwipeableOpen={(direction) => handleSwipeOpen(direction)}
                ref={swipeableRef}
                overshootFriction={8}
            >
                {ShiftCardComponent}
                {transferShiftModal && (
                    <TransferShiftModal
                        transferShiftModal={transferShiftModal}
                        setTransferShiftModal={handleTransferClose}
                        shiftId={shiftId}
                        shiftName={ShiftCardComponent.props.shiftName}
                        shiftStartDate={ShiftCardComponent.props.shiftStartDate}
                        shiftEndDate={ShiftCardComponent.props.shiftEndDate}
                        shiftStartTime={ShiftCardComponent.props.shiftStartTime}
                        shiftEndTime={ShiftCardComponent.props.shiftEndTime}
                        shiftHours={ShiftCardComponent.props.shiftHours}
                        shiftLocation={ShiftCardComponent.props.location}
                        updateReloadKey={updateReloadKey}
                    />
                )}
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
});

export default MyShiftCardSwipe;
