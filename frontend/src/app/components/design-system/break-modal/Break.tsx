import React from 'react';
import TimeRemaining from "../../information-panel/time-remaining/TimeRemaining";
import FetuccinniModal from "../fettuccini-modal/FettucciniModal";

export default function Break({
    title,
    isOpen,
    isClose,
}: {
    title: string,
    isOpen: boolean,
    readonly isClose: () => void,
}) {
    return (
        <>
            <FetuccinniModal modalIsOpen={isOpen} onCloseFunction={isClose} title={title} canCloseModal={false}>
                <TimeRemaining />
            </FetuccinniModal>
        </>
    );
}