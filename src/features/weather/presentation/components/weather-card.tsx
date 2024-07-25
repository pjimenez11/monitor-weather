import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { WeatherDatasourceImpl } from "../../services/datasource";
import { Search, CloudSun } from "lucide-react";
import Image from "next/image";

const WeatherCard: React.FC = () => {
  const [state, setState] = useState<{ city: string; searchCity: string }>({
    city: "Shushufindi",
    searchCity: "Shushufindi",
  });

  const {
    data: weatherData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["weather", state.searchCity],
    queryFn: () =>
      WeatherDatasourceImpl.getInstance().getWeatherByCity(state.searchCity),
  });

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, searchCity: state.city }));
  };

  const getWeatherIconUrl = (icon: string) =>
    `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <Card className="w-full mx-auto shadow-lg rounded-lg overflow-hidden ">
      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
              Tiempo actual
            </CardTitle>
            <CardDescription className="text-sm text-gray-700 dark:text-gray-300">
              Obtén el clima actual de cualquier ciudad
            </CardDescription>
          </div>
          <CloudSun size={36} className="text-gray-900 dark:text-gray-100" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form className="flex space-x-2 mb-4">
          <Input
            value={state.city}
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, city: e.target.value }))
            }
            placeholder="Ingrese ciudad"
            className="flex-grow text-gray-900 dark:text-gray-100"
          />
          <Button
            type="submit"
            onClick={(e) => handleSearch(e)}
            className="flex items-center space-x-1 text-gray-100"
          >
            <Search />
            <span>Buscar</span>
          </Button>
        </form>
        {isFetching && (
          <p className="text-gray-900 dark:text-gray-100">Cargando...</p>
        )}
        {error && <p className="text-red-500">{error.message}</p>}
        {weatherData && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(weatherData.dt * 1000).toLocaleDateString()} -{" "}
              {new Date(weatherData.dt * 1000).toLocaleTimeString()}
            </p>
            <div className="flex flex-wrap justify-around mt-4">
              <div className="min-w-fit px-2">
                <p className="text-xl text-gray-900 dark:text-gray-100">
                  {weatherData.main.temp} °C
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Temperatura
                </p>
              </div>
              <div className="min-w-fit px-2">
                <p className="text-xl text-gray-900 dark:text-gray-100">
                  {weatherData.main.feels_like} °C
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sensación Térmica
                </p>
              </div>
              <div className="min-w-fit px-2">
                <p className="text-xl text-gray-900 dark:text-gray-100">
                  {weatherData.main.humidity} %
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Humedad
                </p>
              </div>
            </div>
            <Image
              src={getWeatherIconUrl(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              className="mx-auto mt-4"
              width={100}
              height={100}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Velocidad del viento: {weatherData.wind.speed} m/s
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-center p-4">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Powered by Weather API
        </p>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
