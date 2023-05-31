// Imports
import dotenv from "dotenv";
import Express from "express";
import API from "./api.js";

// Init env area
dotenv.config();
// Init PORT from env
const PORT = process.env.PORT;

// Create server
const app = Express();

// Init server service
app.use(Express.json());
app.use("/api", API);

// Init home path '/' 
app.get('/', (req, res) => {
    try {
        res.json("server working")
    } catch (error) {
        res.status(500).json(error);
    }
})

// Start server
async function startServer() {
    app.listen(PORT)
}

// Promise 
startServer()
    .then(() => console.log("start server"))
    .catch((err) => console.log(err))
