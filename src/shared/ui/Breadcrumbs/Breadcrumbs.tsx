import styles from "./styles.module.scss";

import { FC, ReactNode } from "react";

import { Link } from "react-router";
import cn from "classnames";

export interface BreadcrumbsItem {
  content: string | ReactNode;
  path: string;
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbsItem[];
  isActiveCallback?: (path: BreadcrumbsItem["path"]) => boolean;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  breadcrumbs,
  isActiveCallback,
}) => {
  return (
    <nav className={styles.breadcrumbs}>
      {breadcrumbs.map((item, index) => (
        <span key={item.path} className={styles.breadcrumbItem}>
          <Link
            to={item.path}
            className={cn(styles.link, {
              [styles.link_active]: isActiveCallback?.(item.path),
            })}
          >
            {item.content}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <span className={styles.separator}>{">"}</span>
          )}
        </span>
      ))}
    </nav>
  );
};
