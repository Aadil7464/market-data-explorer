import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { getMetadata } from '../api';

const FilterControls = ({ onApply, instrument, setInstrument, expiry, setExpiry, strike, setStrike }) => {
  const [expiries, setExpiries] = useState([]);
  const [strikes, setStrikes] = useState([]);
  const [instrumentsList, setInstrumentsList] = useState([]);
  const [metadataLoaded, setMetadataLoaded] = useState(false);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await getMetadata();
        const meta = res.data;
        setExpiries(meta.expiries || []);
        setStrikes(meta.strikes || []);
        setInstrumentsList(meta.instruments || []);
        setMetadataLoaded(true);
      } catch (e) {
        console.error('Failed to fetch metadata for filters', e);
      }
    };
    fetchMeta();
  }, []);

  const handleApply = () => {
    onApply({ instrument, expiry, strike });
  };

  const handleClear = () => {
    setInstrument('');
    setExpiry('');
    setStrike('');
    onApply({ instrument: '', expiry: '', strike: '' });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Instrument</InputLabel>
        <Select
          value={instrument}
          label="Instrument"
          onChange={(e) => setInstrument(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {instrumentsList.map(inst => (
            <MenuItem key={inst} value={inst}>{inst}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Expiry</InputLabel>
        <Select
          value={expiry}
          label="Expiry"
          onChange={(e) => setExpiry(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {expiries.map(e => (
            <MenuItem key={e} value={e}>{e}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Strike</InputLabel>
        <Select
          value={strike}
          label="Strike"
          onChange={(e) => setStrike(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {strikes.map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleApply}>Apply Filters</Button>
      <Button variant="outlined" onClick={handleClear}>Clear</Button>
    </Box>
  );
};

export default FilterControls;