const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

const app = express();

// Middlewares essenciais
app.use(cors());
app.use(express.json());

// Documentação da API via Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da aplicação
app.use('/auth', authRoutes);
app.use('/', authRoutes); // Disponibiliza o endpoint GET /dashboard diretamente na raiz
app.use('/events', eventRoutes);
app.use('/volunteers', volunteerRoutes);

module.exports = app;
