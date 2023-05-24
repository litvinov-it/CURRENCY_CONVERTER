import DateService from "../services/DateService.js";
import MathService from "../services/MathService.js";
import ReqLimit from "../services/ReqLimitService.js";
import ValutesServices from "../services/ValutesServices.js";

const ReqLimitRussia = new ReqLimit(100);
const ReqLimitTailand = new ReqLimit(200);

class ValutesController {
    async GetRussiaValutesAll(req, res) {
        try {
            await DateService.CreateDelay(MathService.GetRandomInt(5))
            const valutes = await ReqLimitRussia.Req(ValutesServices.GetRussiaValutesAll)
            res.json(valutes)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    async GetTailandValutesAll(req, res) {
        try {
            await DateService.CreateDelay(MathService.GetRandomInt(5))
            const valutes = await ReqLimitTailand.Req(ValutesServices.GetTailandValutesAll)
            res.json(valutes)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    async GetValuteFromTo(req, res) {
        try {
            await DateService.CreateDelay(MathService.GetRandomInt(5))
            const num = await ValutesServices.GetValuteFromTo(req.body);
            res.json(num);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

export default new ValutesController();