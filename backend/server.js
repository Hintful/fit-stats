const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const mongoose_uri = process.env.MONGOOSE_URI;
mongoose.connect(mongoose_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection successful.");
});

app.use(cors());
app.use(express.json());

/* routes */
const workoutsRouter = require("./routes/workouts");
const usersRouter = require("./routes/users");

app.use('/workouts', workoutsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})