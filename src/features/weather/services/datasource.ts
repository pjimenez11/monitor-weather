import { AxiosClient } from "@/core/infrastructure/http/AxiosClient";
import { IApiWeather } from "../models/IApiWeather";
import { HttpHandler } from "@/shared/api/http-handler";

export interface WeatherDatasource {
  getWeatherByCity(city: string): Promise<IApiWeather>;
}

export class WeatherDatasourceImpl implements WeatherDatasource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  private static instance: WeatherDatasourceImpl;

  static getInstance(): WeatherDatasource {
    if (!WeatherDatasourceImpl.instance) {
      WeatherDatasourceImpl.instance = new WeatherDatasourceImpl();
    }
    return new WeatherDatasourceImpl();
  }
  getWeatherByCity(city: string): Promise<IApiWeather> {
    return this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
    );
  }
}
