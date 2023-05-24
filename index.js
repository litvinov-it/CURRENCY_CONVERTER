import dotenv from "dotenv";
import Express from "express";
import API from "./api.js";
import rateLimit from 'express-rate-limit'

dotenv.config();
const PORT = process.env.PORT;

const app = Express();

const apiLimiter = rateLimit({
    windowMs: 60 * 1_000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(Express.json());
app.use('/api', apiLimiter);
app.use("/api", API);

app.get('/', (req, res) => {
    try {
        res.json("server working")
    } catch (error) {
        res.status(500).json(error);
    }
})

async function startServer() {
    try {
        app.listen(PORT, () => console.log("start server"))
    } catch (error) {
        console.log(error);
    }
}

startServer();