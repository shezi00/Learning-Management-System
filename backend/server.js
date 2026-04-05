const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

app.use('/auth', authRoutes);     
app.use('/api', apiRoutes);       
app.use('/api/admin', adminRoutes); 

app.listen(5000, () => console.log("Server running on port 5000"));