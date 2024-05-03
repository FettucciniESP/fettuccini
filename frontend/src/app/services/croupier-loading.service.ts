import axios, { AxiosInstance } from "axios";
import { PlayerActionModel } from "../models/PlayerAction.model";
import { StartGameResponseModel } from "@/app/models/StartGameResponse.model";
import { RoundInfosModel } from "@/app/models/RoundInfos.model";
import { toastService } from "./toast.service";
import {CardModel} from "@/app/models/Card.model";

class CroupierService {
  private sessionId!: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  async startNewGame(defaultStructure: any): Promise<StartGameResponseModel> {
    try {
      const response = await this.axiosInstance.post(`/start`, defaultStructure);
      return response.data;
    } catch (error: any) {
      throw toastService.pushError(error?.response?.data);
    }
  }

  async setPlayerAction(
    action: PlayerActionModel,
    roundId: string
  ): Promise<RoundInfosModel> {
    try {
      const response = await this.axiosInstance.post(
        `/action/${this.sessionId}`,
        {
          roundId: roundId,
          action: action,
        }
      );
      return response.data;
    } catch (error: any) {
      throw toastService.pushError(error?.response?.data);
    }
  }

  async startNewRound(): Promise<RoundInfosModel> {
    try {
      const response = await this.axiosInstance.post(
        `/playRound/${this.sessionId}`
      );
      return response.data;
    } catch (error: any) {
      throw toastService.pushError(error?.response?.data);
    }
  }

  async setCardsMisread(roundId: string, playerSeatId: number | null, cardMisreads: Array<CardModel|null>): Promise<RoundInfosModel> {
    try {
      const response = await this.axiosInstance.post(
        `/cardMisread/${this.sessionId}`,
        {
          playerSeatId: playerSeatId,
          roundId: roundId,
          cards: cardMisreads,
        }
      );
      return response.data;
    } catch (error: any) {
      throw toastService.pushError(error?.response?.data);
    }
  }
}
export const croupierLoadingService = new CroupierService();
