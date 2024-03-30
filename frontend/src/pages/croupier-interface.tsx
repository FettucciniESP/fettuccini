import { ChakraProvider, useToast } from '@chakra-ui/react'
import styles from '../app/assets/styles/croupier-interface.module.scss'
import InformationPanel from '@/app/components/information-panel/InformationPanel'
import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { croupierLoadingService } from "@/app/services/croupier-loading.service";
import { Subscription } from 'rxjs';
import { levelsService } from '@/app/services/levels.service';
import { LevelInfosModel } from '@/app/models/LevelInfos.model';
import Break from '@/app/components/design-system/break-modal/Break';
import { PlayerHandInfosModel } from '@/app/models/PlayerHandInfos.model';
import { RoundInfosModel } from '@/app/models/RoundInfos.model';
import { playersService } from '@/app/services/players.service';
import { roundService } from '@/app/services/round.service';
import { toastService } from '@/app/services/toast.service';

export default function CroupierInterface() {
  const router: NextRouter = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toast = useToast();
  const toastOptions = toastService.setToastOptions();
  let isBreak: boolean = false;
  let title: string = "";

  let [currentLevelInfos, setCurrentLevelInfos] = useState<LevelInfosModel | undefined>(undefined);
  let [nextLevelInfos, setNextLevelInfos] = useState<LevelInfosModel | undefined>(undefined);
  let [playersHandInfos, setPlayersHandInfos] = useState<PlayerHandInfosModel[]>([]);
  let [roundInfos, setRoundInfos] = useState<RoundInfosModel>();

  useEffect(() => {
    const currentLevel_subscribe: Subscription =
      levelsService.currentLevel$.subscribe((currentLevel: LevelInfosModel) => {
        setCurrentLevelInfos(currentLevel);
      });
    const nextLevel_subscribe: Subscription =
      levelsService.nextLevel$.subscribe((nextLevelInfos: LevelInfosModel) => {
        setNextLevelInfos(nextLevelInfos);
      });
    const playersHandInfos_subscribe: Subscription =
      playersService.playersHandInfos$.subscribe(
        (playersHand: PlayerHandInfosModel[]) => {
          setPlayersHandInfos(playersHand);
        }
      );
    const roundInfos_subscribe: Subscription =
      roundService.roundInfos$.subscribe(
        (roundInfos: RoundInfosModel | undefined) => {
          setRoundInfos(roundInfos);
        }
      );

    const errorValue_subscribe: Subscription =
      toastService.errorValue$.subscribe((errorValue: String | undefined) => {
        if (!!errorValue && !!toastOptions) {
          toast({
            title: errorValue,
            ...toastOptions,
          });
        }
      });

    return () => {
      currentLevel_subscribe.unsubscribe();
      nextLevel_subscribe.unsubscribe();
      playersHandInfos_subscribe.unsubscribe();
      roundInfos_subscribe.unsubscribe();
      errorValue_subscribe.unsubscribe();
    };
  }, [toast, toastOptions]);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {

    const currentLevelSubscribe: Subscription = levelsService.currentLevel$.subscribe((currentLevel: LevelInfosModel) => {
      if (currentLevel.levelIndex === 0) {
        title = "Pause";
        isBreak = true;
      } else {
        isBreak = false;
      }
    });

    if (!croupierLoadingService.getSessionId()) {
      router.push('/home');
    }
  }, [router]);

  return (
    <ChakraProvider>
      <main className={styles.main}>
        {roundInfos?.breakTime ?? (<Break title={title} isOpen={isModalOpen} isClose={closeModal} />)}
        {roundInfos?.roundId && (<InformationPanel playersHandInfos={playersHandInfos} currentLevelInfos={currentLevelInfos} nextLevelInfos={nextLevelInfos} roundInfos={roundInfos} />)}
      </main>
    </ChakraProvider>
  )
}
