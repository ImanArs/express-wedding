const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const guestRoutes = require('./routes/guestRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000; 
app.options('*', cors());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})); 


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);

console.log(new Date().toLocaleDateString());

mongoose.connect('mongodb+srv://dintsamaly:dItjM6IlcziV73Bd@monar.yew0p.mongodb.net/monar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use('', guestRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
