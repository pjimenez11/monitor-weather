"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AirDatasourceImpl } from "../../services/datasource";
import Map from "@/shared/components/Map";
import { BarChartHor } from "@/shared/components/BarChart";

const CardComponent = () => {
  const [state, setState] = useState<{ lon: number; lat: number }>({
    lon: 0,
    lat: 0,
  });

  const {
    data: air,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["air", state.lon, state.lat],
    queryFn: () =>
      AirDatasourceImpl.getInstance().getAirPollutionByLocation(
        state.lon,
        state.lat
      ),
    enabled: state.lon !== 0 && state.lat !== 0,
  });

  const handleSearch = (lon: number, lat: number) => {
    setState((prevState) => ({ lon, lat }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calidad del Aire</CardTitle>
        <CardDescription>
          Información sobre la calidad del aire en tu ubicación
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Map onClick={handleSearch} height="calc(100vh - 400px)" />
        {isFetching && <p>Loading...</p>}
        {!air && <p>Haz clic en el mapa para generar datos de calidad del aire.</p>}
        {air &&
          air.list.map((item) => (
            <BarChartHor
              key={item.main.aqi}
              chartData={[
                { x: "CO", y: item.components["co"] },
                { x: "NO", y: item.components["no"] },
                { x: "NO2", y: item.components["no2"] },
                { x: "O3", y: item.components["o3"] },
                { x: "SO2", y: item.components["so2"] },
                { x: "PM2.5", y: item.components["pm2_5"] },
                { x: "PM10", y: item.components["pm10"] },
                { x: "NH3", y: item.components["nh3"] },
              ]}
              chartConfig={{
                y: {
                  label: "Concentración (μg/m³)",
                  color: "hsl(var(--chart-1))",
                },
              }}
              subtitle="Comparación de los niveles de diferentes contaminantes en el aire"
              description="Este gráfico muestra las concentraciones actuales de varios contaminantes del aire, incluyendo monóxido de carbono, monóxido de nitrógeno, dióxido de nitrógeno, ozono, dióxido de azufre, partículas PM2.5, partículas PM10 y amoníaco."
              footer="Fuente: OpenWeatherMap API"
            />
          ))}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
