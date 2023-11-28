import axios, { AxiosInstance } from 'axios';
import { PlayerActionModel } from '../models/PlayerAction.model';
import { RoundStepEnum } from '../enums/RoundStep.enum';
import {BehaviorSubject} from "rxjs";
import {LevelInfosModel} from "@/app/models/LevelInfos.model";
import {StartGameResponseModel} from "@/app/models/StartGameResponse.model";
import {RoundInfosModel} from "@/app/models/RoundInfos.model";

class CroupierService {
  private sessionId!: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    });
  }

  public setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  async startNewGame(): Promise<StartGameResponseModel> {
    try {
      const response = await this.axiosInstance.post(`/start`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création d'une partie : ", error);
      throw new Error("Erreur lors de la création d'une partie");
    }
  }

  async setPlayerAction(
      action: PlayerActionModel,
      roundId: string
  ): Promise<RoundInfosModel> {
    try {
      const response = await this.axiosInstance.post(`/action/${this.sessionId}`, {
        roundId: roundId,
        action: action,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'action : ", error);
      throw new Error("Erreur lors de l'envoi de l'action");
    }
  }

  async startNewRound(): Promise<RoundInfosModel> {
    try {
      const response = await this.axiosInstance.post(`/playRound/${this.sessionId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'action : ", error);
      throw new Error("Erreur lors de l'envoi de l'action");
    }
  }
}

const croupierLoadingService = new CroupierService();
export default croupierLoadingService;
