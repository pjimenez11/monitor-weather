import { ContentLayout } from "@/core/layout/content/content-layout";
import SoilPollutionCard from "../components/soil-card";

const SoilView = () => {
  return (
    <ContentLayout title="Contaminación del suelo">
      <SoilPollutionCard />
    </ContentLayout>
  );
};

export default SoilView;
