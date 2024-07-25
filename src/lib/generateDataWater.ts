import { WaterPollutionData } from "@/features/water/models/IWater";

export const generateRandomWaterPollutionData = (): WaterPollutionData => {
    return {
      components: {
        lead: parseFloat((Math.random() * 100).toFixed(2)),
        mercury: parseFloat((Math.random() * 100).toFixed(2)),
        arsenic: parseFloat((Math.random() * 100).toFixed(2)),
        cadmium: parseFloat((Math.random() * 100).toFixed(2)),
        nitrates: parseFloat((Math.random() * 100).toFixed(2)),
        phosphates: parseFloat((Math.random() * 100).toFixed(2)),
      },
    };
  };