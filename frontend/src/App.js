import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, CssBaseline, Box } from '@mui/material';
import FileUpload from './components/FileUpload';
import SummaryPanel from './components/SummaryPanel';
import FilterControls from './components/FilterControls';
import DataTable from './components/DataTable';
import { uploadFile } from './api';

function App() {
  const [uploaded, setUploaded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({ instrument: '', expiry: '', strike: '' });
  const [instrument, setInstrument] = useState('');
  const [expiry, setExpiry] = useState('');
  const [strike, setStrike] = useState('');

  const handleUploadSuccess = async (file) => {
    const response = await uploadFile(file);
    setUploaded(true);
    setRefreshKey(prev => prev + 1);
    return response.data;
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Market Data Explorer</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        {uploaded && (
          <>
            <SummaryPanel refresh={refreshKey} />
            <FilterControls
              onApply={handleApplyFilters}
              instrument={instrument}
              setInstrument={setInstrument}
              expiry={expiry}
              setExpiry={setExpiry}
              strike={strike}
              setStrike={setStrike}
            />
            <DataTable filters={filters} />
          </>
        )}
      </Container>
    </>
  );
}

export default App;