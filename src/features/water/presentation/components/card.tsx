"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import Map from "@/shared/components/Map";
import { BarChartHor } from "@/shared/components/BarChart";
import { WaterPollutionData } from "../../models/IWater";
import { generateRandomWaterPollutionData } from "@/lib/generateDataWater";

const WaterPollutionCard: React.FC = () => {
  const [state, setState] = useState<{ lon: number; lat: number }>({
    lon: 0,
    lat: 0,
  });

  const [waterData, setWaterData] = useState<WaterPollutionData | null>(null);

  useEffect(() => {
    if (state.lon !== 0 && state.lat !== 0) {
      const data = generateRandomWaterPollutionData();
      setWaterData(data);
    }
  }, [state]);

  const handleSearch = (lon: number, lat: number) => {
    setState({ lon, lat });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contaminación del Agua</CardTitle>
        <CardDescription>
          Información sobre la contaminación del agua en tu ubicación
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Map onClick={handleSearch} height="calc(100vh - 400px)" />
        {!waterData && (
          <p>
            Haz clic en el mapa para generar datos de contaminación del agua.
          </p>
        )}
        {waterData && (
          <BarChartHor
            key={state.lon + state.lat}
            chartData={[
              { x: "Plomo", y: waterData.components.lead },
              { x: "Mercurio", y: waterData.components.mercury },
              { x: "Arsénico", y: waterData.components.arsenic },
              { x: "Cadmio", y: waterData.components.cadmium },
              { x: "Nitratos", y: waterData.components.nitrates },
              { x: "Fosfatos", y: waterData.components.phosphates },
            ]}
            chartConfig={{
              y: {
                label: "Concentración (mg/L)",
                color: "hsl(var(--chart-1))",
              },
            }}
            subtitle="Comparación de los niveles de diferentes contaminantes en el agua"
            description="Este gráfico muestra las concentraciones actuales de varios contaminantes del agua, incluyendo plomo, mercurio, arsénico, cadmio, nitratos y fosfatos."
            footer="Datos generados aleatoriamente para pruebas"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WaterPollutionCard;
