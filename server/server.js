const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');





const app = express();
dotenv.config();
app.use(cookieParser());


app.use(cors());
app.use(express.json());

dbConnect();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3300');
});


app.use('/api',userRoutes);
app.use('/',productRoutes);
app.use('/api',categorieRoutes);

