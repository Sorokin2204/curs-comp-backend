const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./src/models');
const userRouter = require('./src/routes/user.routes');
const brandRouter = require('./src/routes/brand.routes');
const categoryRouter = require('./src/routes/category.routes');
const attributeRouter = require('./src/routes/attribute.routes');
const productRouter = require('./src/routes/product.routes');
const orderRouter = require('./src/routes/order.routes');
const reset = require('./src/setup');
var corsOptions = {
  origin: 'http://localhost:8081',
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then((se) => {
  reset(db);
});

app.use('/api', userRouter);
app.use('/api', brandRouter);
app.use('/api', categoryRouter);
app.use('/api', attributeRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
