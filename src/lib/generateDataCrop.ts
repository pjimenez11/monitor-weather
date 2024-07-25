import { CropData } from "@/features/satellite-data-and-statistics/models/ICrop";
import dayjs from "dayjs";

export const generateRandomCropData = (): CropData[] => {
  const cropTypes = ["Maíz", "Arroz", "Trigo", "Café"];
  const growthStages = [
    "Germinación",
    "Crecimiento",
    "Floración",
    "Maduración",
  ];
  const soilMoistureLevels = ["Seco", "Húmedo", "Mojado"];
  const temperatures = ["20°C", "25°C", "30°C", "35°C"];
  const dates = [dayjs().format("DD/MM/YYYY")];
  return Array.from({ length: 5 }, () => ({
    cropType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
    growthStage: growthStages[Math.floor(Math.random() * growthStages.length)],
    soilMoisture:
      soilMoistureLevels[Math.floor(Math.random() * soilMoistureLevels.length)],
    temperature: temperatures[Math.floor(Math.random() * temperatures.length)],
    satelliteDataDate: dates[Math.floor(Math.random() * dates.length)],
  }));
};
