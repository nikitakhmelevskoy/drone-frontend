import styles from "./styles.module.scss";

import { FC } from "react";
import { DataGrid, type DataGridProps } from "@mui/x-data-grid";

export const DataGridCustom: FC<DataGridProps> = ({ ...rest }) => {
  return (
    <DataGrid
      className={styles.dataGrid}
      sx={{
        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within":
          {
            outline: "none",
          },
        "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
          userSelect: "none",
        },
        "& .MuiDataGrid-row": {
          backgroundColor: "#0a0a1a",
          cursor: "pointer",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "#0a0a1a",
        },
      }}
      disableColumnResize
      disableColumnMenu
      disableRowSelectionOnClick
      showColumnVerticalBorder
      showCellVerticalBorder
      pageSizeOptions={[10, 25, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 },
        },
      }}
      {...rest}
    />
  );
};
