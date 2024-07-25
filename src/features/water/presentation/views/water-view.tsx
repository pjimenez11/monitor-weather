import { ContentLayout } from "@/core/layout/content/content-layout";
import WaterPollutionCard from "../components/card";

const WaterView = () => {
  return (
    <ContentLayout title="Contaminación del agua">
      <WaterPollutionCard />
    </ContentLayout>
  );
};

export default WaterView;
