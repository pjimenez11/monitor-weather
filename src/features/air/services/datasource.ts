import { AxiosClient } from "@/core/infrastructure/http/AxiosClient";
import { HttpHandler } from "@/shared/api/http-handler";
import { IAPIAirLocation } from "../models/IApiAirLocation";

export interface AirDatasource {
  getAirPollutionByLocation(lon: number, lat: number): Promise<IAPIAirLocation>;
}

export class AirDatasourceImpl implements AirDatasource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  private static instance: AirDatasourceImpl;

  static getInstance(): AirDatasource {
    if (!AirDatasourceImpl.instance) {
      AirDatasourceImpl.instance = new AirDatasourceImpl();
    }
    return new AirDatasourceImpl();
  }
  getAirPollutionByLocation(lon: number, lat: number): Promise<IAPIAirLocation> {
    return this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
    );
  }
}
