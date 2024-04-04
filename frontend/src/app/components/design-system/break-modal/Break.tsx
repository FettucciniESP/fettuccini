import React from 'react';
import {Text} from "@chakra-ui/react";
import styles from './Break.module.scss';
import TimeRemaining from "../../information-panel/time-remaining/TimeRemaining";
import FetuccinniModal from "../fettuccini-modal/FettucciniModal";

export default function Break({
    title,
    isOpen,
    isClose,
}: {
    title: string | undefined,
    isOpen: boolean,
    readonly isClose: () => void,
}) {
    return (
        <>
            <FetuccinniModal modalIsOpen={isOpen} onCloseFunction={isClose} canCloseModal={false}>
                <Text className={styles.titleBreak}>{title}</Text>
                <TimeRemaining />
            </FetuccinniModal>
        </>
    );
}