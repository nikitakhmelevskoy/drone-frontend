import { useSearchParams } from "react-router";

import { StatisticsSummary } from "./StatisticsSummary/StatisticsSummary";
import { StatisticsPoint } from "./StatisticsPoint/StatisticsPoint";
import { StatisticsPolygon } from "./StatisticsPolygon/StatisticsPolygon";

import { PaperCustom } from "../../shared/ui";
import { BreadcrumbsStatistics } from "../../components";

export const Statistics = () => {
  const [searchParams] = useSearchParams();

  const entityType = searchParams.get("entityType");
  const entityId = searchParams.get("entityId");

  return (
    <PaperCustom sx={{ marginTop: "50px" }}>
      <BreadcrumbsStatistics entityType={entityType} entityId={entityId} />
      {entityType === "point" && entityId && (
        <StatisticsPoint pointId={entityId} />
      )}
      {entityType === "polygon" && entityId && (
        <StatisticsPolygon polygonId={entityId} />
      )}
      {(!entityType || !entityId) && <StatisticsSummary />}
    </PaperCustom>
  );
};
