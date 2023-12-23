const express = require('express');

const app = express();

const { PrismaClient } = require('@prisma/client');

const bodyParser = require('body-parser');

const PORT = 8080;
const authorRoutes = require('./routes/authors');

const albumRoutes = require('./routes/albums');

const songRoutes = require('./routes/songs');

const prisma = new PrismaClient();

const cors = require('cors');

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
// author routes
app.use(authorRoutes);
// album routes
app.use(albumRoutes);
//song routes
app.use(songRoutes);



app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
