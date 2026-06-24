import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Card, CardContent } from '@mui/material';
import { getMetadata } from '../api';

const SummaryPanel = ({ refresh }) => {
  const [expiries, setExpiries] = useState([]);
  const [strikes, setStrikes] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [counts, setCounts] = useState({ CE: 0, PE: 0, FUT: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const metaRes = await getMetadata();
        setExpiries(metaRes.data.expiries || []);
        setStrikes(metaRes.data.strikes || []);
        setInstruments(metaRes.data.instruments || []);
        // We can fetch contract counts from another endpoint if needed,
        // for now we'll derive from metadata? Actually need to call counts endpoint.
        // Let's implement counts via separate call or we can compute from preview.
        // For simplicity, we'll add a count endpoint call.
        const countRes = await fetch('/api/contract-counts').then(r => r.json());
        setCounts(countRes);
      } catch (e) {
        console.error('Failed to fetch summary', e);
      }
    };
    fetchSummary();
  }, [refresh]);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Contract Summary</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Unique Expiries</Typography>
              <Typography variant="body1">{expiries.join(', ')}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Unique Strikes</Typography>
              <Typography variant="body1">{strikes.join(', ')}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Contract Counts</Typography>
              <Typography variant="body2">CE: {counts.CE} | PE: {counts.PE} | FUT: {counts.FUT}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SummaryPanel;