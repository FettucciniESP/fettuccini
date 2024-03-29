import {Box, Text} from "@chakra-ui/react";
import {useState} from "react";
import InputLabelIcon from "@/app/components/design-system/control/inputs/input-label/InputLabelIcon";
// import SwitchLabel from "@/app/components/design-system/control/checkbox/single/switch-label/SwitchLabel";
import styles from "@/app/assets/styles/setting-lobby.module.scss";
import ButtonIcon from "@/app/components/design-system/control/buttons/button-icon/ButtonIcon";
import {croupierLoadingService} from "@/app/services/croupier-loading.service";
import {StartGameResponseModel} from "@/app/models/StartGameResponse.model";
import {croupierService} from "@/app/services/croupier.service";
import {NextRouter, useRouter} from "next/router";

const labels = {
    STRUCTURE: "STRUCTURE",
    STACKS: "STACKS",
    REGISTRATION_MAX: "TEMPS D'INSCRIPTION MAX",
    MULTI_TABLE: "PLUSIEURS TABLES",
    COST_ENTRY: "COÛT D'ENTRÉE",
};

const titles = {
    TITLE_PAGE: "PARAMÈTRES DE LA PARTIE",
    TITLE_SECTION: "PARAMÈTRES UTILISÉS",
};

const buttonTitles = {
    LOAD: "CHARGER",
    SAVE: "ENREGISTRER",
    START: "COMMENCER",
};

export default function SettingLobby() {
    const [isSettingDone, setIsSettingDone] = useState(false);

    const router: NextRouter = useRouter();

    const [stucture, setStructure] = useState("");
    const [stacks, setStacks] = useState(null);
    const [registrationMax, setRegistrationMax] = useState("");
    // const [multiTable, setMultiTable] = useState(false);
    const [costEntry, setCostEntry] = useState(null);

    const handleChangeStructure = (value: string): void => {
        setStructure(value);
    };
    const handleChangeStacks = (value: number): void => {
        setStacks(value);
    };
    const handleChangeRegistrationMax = (value: string): void => {
        setRegistrationMax(value);
    };
    // const handleChangesetMultiTable = (value: boolean): void => {
    //   setMultiTable(value);
    // };
    const handleChangeCostEntry = (value: number): void => {
        setCostEntry(value);
    };

    const hangdleOnClickButtonStructure = () => {
        console.log("structure openstructure openstructure open modal");
        handleChangeStructure("TEST STRUCTURE");
    };

    const hangdleOnClickButtonRegistration = () => {
        console.log("registration open modal");
        handleChangeRegistrationMax("TEST REGISTRATION");
    };

    const hangdleOnClickButtonLoad = () => {
        console.log("load button");
    };

    const hangdleOnClickButtonSave = () => {
        console.log("save button");
    };

    const hangdleOnClickButtonStart = () => {
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
            ]
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
            {title: labels.STRUCTURE, value: stucture},
            {title: labels.STACKS, value: stacks},
            {title: labels.REGISTRATION_MAX, value: registrationMax},
            {
                title: labels.COST_ENTRY,
                value: costEntry ? `${costEntry + " €"}` : costEntry,
            },
        ];

        return (
            <Box>
                {sectionContent.map((element, i) => {
                    return (
                        <Box className={styles.textContainer} key={i}>
                            <Text className={styles.textSetting}>{element.title}</Text>
                            <Text className={styles.textSetting}>{element.value}</Text>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    const renderButtonSection = () => {
        return (
            <Box>
                <Box className={styles.singleButtonContainer}>
                    <ButtonIcon
                        label={buttonTitles.LOAD}
                        hangdleOnClick={hangdleOnClickButtonLoad}
                        icon={ButtonIcon.icons.LOAD}
                    />
                    <ButtonIcon
                        label={buttonTitles.SAVE}
                        hangdleOnClick={hangdleOnClickButtonSave}
                        icon={ButtonIcon.icons.SAVE}
                    />
                </Box>
                <Box className={styles.multiButtonContainer}>
                    <ButtonIcon
                        label={buttonTitles.START}
                        hangdleOnClick={hangdleOnClickButtonStart}
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
            <Box className={styles.mainSettingContainer}>
                <Box className={styles.settingContainer}>
                    <Box className={styles.inputContainer}>
                        <InputLabelIcon
                            label={labels.STRUCTURE}
                            hangdleOnClick={hangdleOnClickButtonStructure}
                            currentValue={stucture}
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
                            label={labels.REGISTRATION_MAX}
                            hangdleOnClick={hangdleOnClickButtonRegistration}
                            currentValue={registrationMax}
                            type={InputLabelIcon.types.BUTTON}
                        />

                        {/* <SwitchLabel
            label={labels.MULTI_TABLE}
            handleChangeCurrentValue={handleChangesetMultiTable}
            currentValue={multiTable}
          /> */}

                        <InputLabelIcon
                            label={labels.COST_ENTRY}
                            handleChangeCurrentValue={handleChangeCostEntry}
                            currentValue={costEntry}
                            type={InputLabelIcon.types.NUMBER}
                            customAddToText={"€"}
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
