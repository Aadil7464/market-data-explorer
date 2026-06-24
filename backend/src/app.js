const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } }));
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'backend-gateway' });
});

module.exports = app;
