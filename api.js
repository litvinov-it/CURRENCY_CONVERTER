// Imports
import Router from "express";
import StandartController from "./controllers/StandartController.js";
import ValutesController from "./controllers/ValutesController.js";

// Create Router
const API = new Router();

// Init path
API.get('/', StandartController.GetHome);
API.get('/russia', ValutesController.GetRussiaValutesAll);
API.get('/thailand', ValutesController.GetThailandValutesAll);
API.get('/convert', ValutesController.GetValuteFromTo);

// Export API
export default API;