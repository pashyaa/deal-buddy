const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const couponRoutes = require('./routes/couponRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const sequelize = require('./config/database');


// Sync database
sequelize.sync();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/coupons', couponRoutes);
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
