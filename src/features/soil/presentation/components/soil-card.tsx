"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";// Importa la función para generar datos aleatorios
import Map from "@/shared/components/Map";
import { BarChartHor } from "@/shared/components/BarChart"; 
import { generateRandomSoilPollutionData } from "@/lib/generateDataSoil";
import { SoilPollutionData } from "../../models/ISoil";

const SoilPollutionCard: React.FC = () => {
  const [state, setState] = useState<{ lon: number; lat: number }>({
    lon: 0,
    lat: 0,
  });

  const [soilData, setSoilData] = useState<SoilPollutionData | null>(null);

  useEffect(() => {
    if (state.lon !== 0 && state.lat !== 0) {
      const data = generateRandomSoilPollutionData();
      setSoilData(data);
    }
  }, [state]);

  const handleSearch = (lon: number, lat: number) => {
    setState({ lon, lat });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contaminación del Suelo</CardTitle>
        <CardDescription>
          Información sobre la contaminación del suelo en tu ubicación
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Map onClick={handleSearch} height="calc(100vh - 400px)" />
        {!soilData && <p>Haz clic en el mapa para generar datos de contaminación del suelo.</p>}
        {soilData && (
          <BarChartHor
            key={state.lon + state.lat}
            chartData={[
              { x: "Arsénico", y: soilData.components.arsenic },
              { x: "Plomo", y: soilData.components.lead },
              { x: "Mercurio", y: soilData.components.mercury },
              { x: "Cadmio", y: soilData.components.cadmium },
              { x: "Cromo", y: soilData.components.chromium },
              { x: "Zinc", y: soilData.components.zinc },
            ]}
            chartConfig={{
              y: {
                label: "Concentración (mg/kg)",
                color: "hsl(var(--chart-1))",
              },
            }}
            subtitle="Comparación de los niveles de diferentes contaminantes en el suelo"
            description="Este gráfico muestra las concentraciones actuales de varios contaminantes del suelo, incluyendo arsénico, plomo, mercurio, cadmio, cromo y zinc."
            footer="Datos generados aleatoriamente para pruebas"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SoilPollutionCard;
