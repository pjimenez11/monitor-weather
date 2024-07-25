import { ContentLayout } from "@/core/layout/content/content-layout";
import WeatherCard from "../components/weather-card";

const WeatherView = () => {
  return (
    <ContentLayout title="Clima">
      <WeatherCard />
    </ContentLayout>
  );
};

export default WeatherView;
