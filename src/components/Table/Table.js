import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function CustomTable({ rows, columns, rowHeight }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 100]}
        checkboxSelection
        rowHeight={rowHeight}
        sx={{
          cursor:"pointer",
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
             outline: "none !important",
          },
       }}
      />
    </div>
  );
}