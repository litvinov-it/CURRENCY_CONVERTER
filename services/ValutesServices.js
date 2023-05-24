import dotenv from "dotenv";
import axios from "axios";
import DateService from "./DateService.js";
import MathService from "./MathService.js";
import StandartServices from "./StandartServices.js";

dotenv.config();
const CLIENT_ID_TAILAND = process.env.CLIENT_ID_TAILAND;

class ValutesServices {
    async GetRussiaValutesAll() {
        const axios_res = await axios.get('http://www.cbr.ru/scripts/XML_daily.asp');
        // parsing
        const object = StandartServices.Convert(axios_res)["ValCurs"]["Valute"];
        const valutes = {};
        for (const valute of object) {
            valutes[ valute["CharCode"]["_text"] ] = valute["Value"]["_text"].replace(',','.');
        }
        valutes["RUB"] = '1';
        return valutes;
    }
    async GetTailandValutesAll() {
        const config = {
            headers: {
                "X-IBM-Client-Id":  CLIENT_ID_TAILAND
            }
        }
        const date = DateService.GetYearMonthDate('-');
        const axios_res = await axios.get(`https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${date}&end_period=${date}`, config);
        // parsing
        const object = StandartServices.Convert(axios_res)['result'].data['data_detail'];
        const valutes = {};
        for (const valute of object) {
            valutes[ valute["currency_id"] ] = valute["mid_rate"];
        }
        valutes["THB"] = '1';
        return valutes;
    }
    async GetValuteFromTo(params) { 
        if(!params.country) throw new Error("Country is empty");
        if(!params.from) throw new Error("From is empty");
        if(!params.count) throw new Error("Count is empty");
        if(isNaN(params.count)) throw new Error("Count is not number");
        if(!params.to) throw new Error("To is empty");

        let valutes = {};
        if(params.country.toLowerCase() == "tailand") valutes = await this.GetTailandValutesAll()
        else if(params.country.toLowerCase() == "russia") valutes = await this.GetRussiaValutesAll();
        else throw new Error("No central bank of the country");

        if(!valutes[params.from]) throw new Error("From value currency not found in central bank current country");
        if(!valutes[params.to]) throw new Error("To value currency not found in central bank current country");

        const res = MathService.GetRoundFloat((1 / valutes[params.to]) * params.count / (1 / valutes[params.from]), 3);
        return res;
    }
}

export default new ValutesServices();