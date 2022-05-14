const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./src/models');
const bodyParser = require('body-parser');
const userRouter = require('./src/routes/user.routes');
const brandRouter = require('./src/routes/brand.routes');
const categoryRouter = require('./src/routes/category.routes');
const attributeRouter = require('./src/routes/attribute.routes');
const productRouter = require('./src/routes/product.routes');
const orderRouter = require('./src/routes/order.routes');
const reset = require('./src/setup');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
let interval;
io.on('connection', (socket) => {
  console.log('a user connected');
});
server.listen(4001, () => console.log(`Listening on port ${4001}`));

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('CREATE_ORDER', (sockett) => {
    console.log('CREATE ORDER ');
    io.emit('REFRESH_ORDERS');
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

var corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./images'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then((se) => {
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
