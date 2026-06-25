import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Box, Paper, Typography } from '@mui/material';
import { getFilteredData, getDataPreview } from '../api';

const DataTable = ({ filters }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (filters && (filters.instrument || filters.expiry || filters.strike)) {
          response = await getFilteredData(filters);
          setRowData(response.data.data || []);
          setTotalRows(response.data.count || 0);
        } else {
          response = await getDataPreview(500, 0);
          setRowData(response.data.data || []);
          setTotalRows(response.data.total || 0);
        }
        const data = response.data.data || [];
        if (data.length > 0 && columnDefs.length === 0) {
          const cols = Object.keys(data[0]).map(key => ({
            field: key,
            headerName: key,
            sortable: true,
            filter: 'agTextColumnFilter',
            floatingFilter: true,
          }));
          setColumnDefs(cols);
        }
      } catch (e) {
        console.error('Failed to fetch data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
  }), []);

  const handleGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  const handleFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Data Preview {totalRows > 0 && `(${totalRows} records)`}
      </Typography>
      <Box className="ag-theme-alpine" sx={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={50}
          animateRows={true}
          loading={loading}
          suppressBrowserResizeObserver={true}
          onGridReady={handleGridReady}
          onFirstDataRendered={handleFirstDataRendered}
        />
      </Box>
    </Paper>
  );
};

export default DataTable;