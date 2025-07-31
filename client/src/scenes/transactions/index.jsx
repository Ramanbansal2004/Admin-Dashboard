import React, {useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useGetTransactionsQuery } from 'state/api';
import { Box, Toolbar, useTheme } from '@mui/material';
import Header from 'components/Header';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
const Transactions = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState(null);
    const [search, setSearch] = useState("");
    const { data, isLoading } = useGetTransactionsQuery({ page, pageSize, sort:JSON.stringify(sort), search });
    const columns = [
      {
        field:"_id",
        headerName: "ID",
        flex: 1,
      },
      {
        field:"userId",
        headerName: "User ID",
        flex: 1,
      },
      {
        field:"createdAt",
        headerName: "Created At",
        flex: 1,
      },
      {
        field:"products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => {
          return params.value.length;
        }
      },
      {
        field:"cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params) => {
          return `$${Number(params.value).toFixed(2)}`;
        }
      },
    ]
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="List of Transactions." />
      <Box height="80vh"
        sx={{
        "& .MuiDataGrid-root":{
          border: "none",
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
          color: `${theme.palette.secondary[100]} !important`,
        }
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data?.transactions || []}
          columns={columns}
          rowCount={data?.total || 0}
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          sortingMode="server"
          sortModel={sort ? [sort] : []}
          onSortModelChange={(model) => setSort(...model)}
          checkboxSelection
          // components={{Toolbar: DataGridCustomToolbar}}
          showToolbar
        />
      </Box>
    </Box>
  )
}

export default Transactions