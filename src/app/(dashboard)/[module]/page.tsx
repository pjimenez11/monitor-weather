"use client";
import { ContentLayout } from "@/core/layout/content/content-layout";
import AirView from "@/features/air/presentation/views/air-view";
import SatelliteDataAndStadisticsView from "@/features/satellite-data-and-statistics/presentation/views/satellite-data-and-statistics-view";
import SoilView from "@/features/soil/presentation/views/soil-view";
import WaterView from "@/features/water/presentation/views/water-view";
import WeatherView from "@/features/weather/presentation/views/weather-view";
import { useParams } from "next/navigation";
import { FC } from "react";

const Page: FC = () => {
  const { module } = useParams() as { module: string };

  const Views: Record<string, React.ComponentType> = {
    weather: WeatherView,
    'satellite-data-and-statistics': SatelliteDataAndStadisticsView,
    'air-pollution': AirView,
    'water-pollution': WaterView,
    'soil-contamination': SoilView,
  };

  const SelectedView = Views[module];

  if (!SelectedView) {
    return <ContentLayout title="404">Module not found</ContentLayout>;
  }

  return (
    <>
      <SelectedView />
    </>
  );
};

export default Page;
