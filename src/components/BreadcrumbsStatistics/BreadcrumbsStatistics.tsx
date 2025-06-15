import { FC, useMemo } from "react";

import { Breadcrumbs, type BreadcrumbsItem } from "../../shared/ui";
import { Paths } from "../../shared/constants";
import { useLocation } from "react-router";

const getSecondBreadcrumbText = (
  entityType: string,
  entityId: string
): string => {
  return `${entityType === "point" ? "Точка" : "Полигон"} #${entityId}`;
};

interface BreadcrumbsStatisticsProps {
  entityType: string | null;
  entityId: string | null;
}

export const BreadcrumbsStatistics: FC<BreadcrumbsStatisticsProps> = ({
  entityId,
  entityType,
}) => {
  const { pathname, search } = useLocation();

  const BREADCRUMBS = useMemo(() => {
    const breadcrumbs: BreadcrumbsItem[] = [
      {
        content: "Статистика",
        path: Paths.statistics,
      },
    ];

    if (entityType && entityId) {
      breadcrumbs.push({
        content: getSecondBreadcrumbText(entityType, entityId),
        path: `${Paths.statistics}?entityType=${entityType}&entityId=${entityId}`,
      });
    }

    return breadcrumbs;
  }, [entityId, entityType]);

  const isActive = (path: string) => {
    return `${pathname}${search}` === path;
  };

  return <Breadcrumbs breadcrumbs={BREADCRUMBS} isActiveCallback={isActive} />;
};
