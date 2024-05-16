import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import InputLabelIcon from "@/app/components/design-system/control/inputs/input-label/InputLabelIcon";
import styles from "@/app/assets/styles/setting-lobby.module.scss";
import ButtonIcon from "@/app/components/design-system/control/buttons/button-icon/ButtonIcon";
import { croupierLoadingService } from "@/app/services/croupier-loading.service";
import { StartGameResponseModel } from "@/app/models/StartGameResponse.model";
import { croupierService } from "@/app/services/croupier.service";
import { NextRouter, useRouter } from "next/router";
import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import SeatsSelection from "@/app/components/design-system/seats-selection/SeatsSelection";

const labels = {
    STRUCTURE: "STRUCTURE",
    STACKS: "STACKS",
    MULTI_TABLE: "PLUSIEURS TABLES",
    COST_ENTRY: "COÛT D'ENTRÉE",
    PLAYERS: "JOUEURS",
};

const titles = {
    TITLE_PAGE: "PARAMÈTRES DE LA PARTIE",
    TITLE_SECTION: "PARAMÈTRES UTILISÉS",
};

const buttonTitles = {
    START: "COMMENCER",
};

export default function SettingLobby() {
    const [isSettingDone, setIsSettingDone] = useState(false);
    const [seatsSelectionIsOpen, setSeatsSelectionIsOpen] = useState(false);

    const router: NextRouter = useRouter();

    const [stucture, setStructure] = useState<Array<LevelInfosModel>>([]);
    const [stacks, setStacks] = useState<number>(0);
    const [costEntry, setCostEntry] = useState<number>(0);
    const [seatsIndex, setSeatsIndex] = useState<Array<number>>([]);

    const closeSeatsSelection = () => {
        setSeatsSelectionIsOpen(false);
    }

    const handleChangeStructure = (value: Array<LevelInfosModel>): void => {
        setStructure(value);
    };
    const handleChangeStacks = (value: number): void => {
        setStacks(value);
    };
    const handleChangeCostEntry = (value: number): void => {
        setCostEntry(value);
    };

    const handleChangeSeatsIndex = (value: Array<number>): void => {
        setSeatsIndex(value);
    };

    const openSeatsSelection = () => {
        setSeatsSelectionIsOpen(true);
    }

    const handleClickButtonStructure = () => {
        console.log("structure openstructure openstructure open modal");
    };

    const handleClickButtonLoad = () => {
        console.log("load button");
    };

    const handleClickButtonSave = () => {
        console.log("save button");
    };

    const handleClickButtonStart = () => {
        const defaultStructure = {
            levels: [
                {
                    levelIndex: 1,
                    label: "",
                    smallBlind: 10,
                    bigBlind: 20,
                    ante: 0,
                    duration: 1,
                },
                {
                    levelIndex: 0,
                    label: "Break time 5 minutes",
                    smallBlind: 15,
                    bigBlind: 30,
                    ante: 0,
                    duration: 1,
                },
                {
                    levelIndex: 3,
                    label: "",
                    smallBlind: 20,
                    bigBlind: 40,
                    ante: 0,
                    duration: 10,
                },
              {
                levelIndex: 2,
                label: "",
                smallBlind: 15,
                bigBlind: 30,
                ante: 0,
                duration: 10,
              },
              {
                levelIndex: 3,
                label: "",
                smallBlind: 20,
                bigBlind: 40,
                ante: 0,
                duration: 10,
              },
              {
                levelIndex: 4,
                label: "",
                smallBlind: 25,
                bigBlind: 50,
                ante: 0,
                duration: 10,
              }
            ],
            seatsIndex: [...seatsIndex].sort((a, b) => a - b),
            startingStack: stacks,
            authorizedReentryLevelIndex: 0,
        }
        croupierLoadingService
            .startNewGame(defaultStructure)
            .then((startGameResponse: StartGameResponseModel) => {
                croupierService.getGameInformations(startGameResponse);
                router.push("/croupier-interface");
            });
    };

    const renderSettingsSection = () => {
        const sectionContent = [
            { title: labels.STRUCTURE, value: stucture },
            { title: labels.STACKS, value: stacks },
            {
                title: labels.COST_ENTRY,
                value: costEntry ? `${costEntry + " €"}` : costEntry,
            },
            { title: labels.PLAYERS, value: seatsIndex },
        ];

        return (
            <Box>
                {sectionContent.map((element, i) => {
                    return (
                        <Box className={styles.textContainer} key={i}>
                            <Text className={styles.textSetting}>{element.title}</Text>
                            <Text className={styles.textSetting}>{element.value.toString()}</Text>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    const renderButtonSection = () => {
        return (
            <Box>
                <Box className={styles.multiButtonContainer}>
                    <ButtonIcon
                        label={buttonTitles.START}
                        handleClick={handleClickButtonStart}
                    />
                </Box>
            </Box>
        );
    };

    return (
        <Box className={styles.mainContainer}>
            <Box>
                <Text className={styles.titlePage}>{titles.TITLE_PAGE}</Text>
            </Box>
            {seatsSelectionIsOpen && (
                <SeatsSelection modalIsOpen={seatsSelectionIsOpen} onCloseFunction={closeSeatsSelection} seatsIndex={seatsIndex} handleChangeSeatsIndex={handleChangeSeatsIndex} />)}
            <Box className={styles.mainSettingContainer}>
                <Box className={styles.settingContainer}>
                    <Box className={styles.inputContainer}>
                        <InputLabelIcon
                            label={labels.STRUCTURE}
                            handleClick={handleClickButtonStructure}
                            currentValue={stucture.toString()}
                            type={InputLabelIcon.types.BUTTON}
                            isUpperCase
                        />

                        <InputLabelIcon
                            label={labels.STACKS}
                            handleChangeCurrentValue={handleChangeStacks}
                            currentValue={stacks}
                            type={InputLabelIcon.types.NUMBER}
                        />

                        <InputLabelIcon
                            label={labels.COST_ENTRY}
                            handleChangeCurrentValue={handleChangeCostEntry}
                            currentValue={costEntry}
                            type={InputLabelIcon.types.NUMBER}
                            customAddToText={"€"}
                        />

                        <InputLabelIcon
                            label={labels.PLAYERS}
                            handleClick={openSeatsSelection}
                            currentValue={seatsIndex.toString()}
                            type={InputLabelIcon.types.BUTTON}
                        />
                    </Box>

                    <Box className={styles.sectionContainer}>
                        <Text className={styles.titleSection}>{titles.TITLE_SECTION}</Text>
                        <Box className={styles.settingSectionContainer}>
                            {renderSettingsSection()}
                        </Box>
                        <Box className={styles.buttonSectionContainer}>
                            {renderButtonSection()}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
