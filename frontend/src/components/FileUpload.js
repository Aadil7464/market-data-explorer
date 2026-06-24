import React, { useState } from 'react';
import { Button, Typography, Box, Paper, CircularProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.name.endsWith('.feather')) {
      setFile(selected);
      setError(null);
    } else {
      setError('Please select a valid .feather file');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const response = await onUploadSuccess(file);
      console.log('Upload response:', response);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 
                       err.response?.data?.detail || 
                       err.message || 
                       'Upload failed';
      setError(errorMsg);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload Market Data (.feather)
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
          Choose File
          <input type="file" hidden accept=".feather" onChange={handleFileChange} />
        </Button>
        {file && <Typography variant="body2">{file.name}</Typography>}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || uploading}
          startIcon={uploading ? <CircularProgress size={20} /> : null}
        >
          Upload
        </Button>
      </Box>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Paper>
  );
};

export default FileUpload;