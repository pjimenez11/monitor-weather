import { SoilPollutionData } from "@/features/soil/models/ISoil";

export const generateRandomSoilPollutionData = (): SoilPollutionData => {
    return {
      components: {
        arsenic: parseFloat((Math.random() * 100).toFixed(2)),
        lead: parseFloat((Math.random() * 100).toFixed(2)),
        mercury: parseFloat((Math.random() * 100).toFixed(2)),
        cadmium: parseFloat((Math.random() * 100).toFixed(2)),
        chromium: parseFloat((Math.random() * 100).toFixed(2)),
        zinc: parseFloat((Math.random() * 100).toFixed(2)),
      },
    };
  };