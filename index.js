const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes/userRoutes');
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("succesfully connected to DB");
    }).catch((e) => {
        console.log(e);
        setTimeout(connectWithRetry, 5000);
    });
}
connectWithRetry();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome Home!");
})

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})