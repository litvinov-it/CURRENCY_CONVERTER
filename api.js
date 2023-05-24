import Router from "express";
import StandartController from "./controllers/StandartController.js";
import ValutesController from "./controllers/ValutesController.js";

const API = new Router();

API.get('/', StandartController.GetHome);
API.get('/russia', ValutesController.GetRussiaValutesAll);
API.get('/tailand', ValutesController.GetTailandValutesAll);
API.get('/convert', ValutesController.GetValuteFromTo);

export default API;