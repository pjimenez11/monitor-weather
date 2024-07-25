"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Map from "@/shared/components/Map";
import { Calendar, CornerDownLeft, Droplet, Leaf, Thermometer } from "lucide-react";
import { useEffect, useState } from "react"; // Importa la función y tipos
import { CropData } from "../../models/ICrop";
import { generateRandomCropData } from "@/lib/generateDataCrop";

const CropDataCard: React.FC = () => {
  const [data, setData] = useState<CropData[]>([]);

  const handleSearch = () => {
    const generatedData = generateRandomCropData();
    setData(generatedData);
  };

  return (
    <Card className="w-full mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold">Datos Satelitales para Agricultura</CardTitle>
        <CardDescription className="mt-1 text-sm">
          Información actualizada para visualizar el estado de los cultivos
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full mb-4 rounded-lg overflow-hidden">
          <Map onClick={handleSearch} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-center gap-4 p-4">
        {data.length === 0 && <p>Haz clic en el mapa para generar datos de cultivos.</p>}
        {data.map((item, index) => (
          <div key={index} className="flex flex-col p-4 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600">
            <div className="flex items-center mb-2">
              <CornerDownLeft className="w-5 h-5 text-yellow-500 mr-2" />
              <p className="text-sm">
                <strong>Tipo de cultivo:</strong> {item.cropType}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Leaf className="w-5 h-5 text-green-500 mr-2" />
              <p className="text-sm">
                <strong>Etapa:</strong> {item.growthStage}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Droplet className="w-5 h-5 text-blue-500 mr-2" />
              <p className="text-sm">
                <strong>Humedad del suelo:</strong> {item.soilMoisture}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Thermometer className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-sm">
                <strong>Temperatura:</strong> {item.temperature}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <p className="text-sm">
                <strong>Fecha de datos satelitales:</strong> {item.satelliteDataDate}
              </p>
            </div>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default CropDataCard;
