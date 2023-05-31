// Imports
import dotenv from "dotenv";
import axios from "axios";
import DateService from "./DateService.js";
import MathService from "./MathService.js";
import StandartServices from "./StandartServices.js";

// Get env area
dotenv.config();
// Init ID Thailand
const CLIENT_ID_THAILAND = process.env.CLIENT_ID_THAILAND;

class ValutesServices {
    constructor() {
        // Init variables
        this.russiaVal = {}
        this.thailandVal = {}
        this.nominalCurrency = {}
        
        this.initNominal_And_RussiaVal()
        this.initThailandVal()
    }

    async initNominal_And_RussiaVal() {
        // Create req
        const axios_res = await axios.get('http://www.cbr.ru/scripts/XML_daily.asp');

        // parsing
        const object = StandartServices.Convert(axios_res)["ValCurs"]["Valute"];

        // Init values variables in cache
        for (const valute of object) {
            this.nominalCurrency[ valute["CharCode"]["_text"] ] = valute["Nominal"]["_text"]
            this.russiaVal[ valute["CharCode"]["_text"] ] = valute["Value"]["_text"].replace(',','.') / this.nominalCurrency[ valute["CharCode"]["_text"] ];
        }
        this.russiaVal["RUB"] = 1;
    }

    async initThailandVal() {
        // Create config from request
        const config = {
            headers: {
                "X-IBM-Client-Id":  CLIENT_ID_THAILAND
            }
        }

        // Generate now date
        const date = DateService.GetYearMonthDatePredict('-');

        // Create req
        const axios_res = await axios.get(`https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${date}&end_period=${date}`, config);

        // parsing
        const object = StandartServices.Convert(axios_res)['result'].data['data_detail'];

        // Init values variables in cache
        for (const valute of object) {
            // If currency not defined - set default value 1
            // Could not find  where to pull up nominal
            if (this.nominalCurrency[ valute["currency_id"] ] === undefined) this.nominalCurrency[ valute["currency_id"] ] = 1
            this.thailandVal[ valute["currency_id"] ] = valute["mid_rate"] / this.nominalCurrency[ valute["currency_id"] ];
        }
        this.thailandVal["THB"] = 1;
    }

    async GetRussiaValutesAll() {
        // Function get Russia currency
        // Return: valutes ({"RUB": 10, "USD": 32}) 

        // Init if russiaVal or nominalCurrency not defined
        if (Object.keys(this.russiaVal).length === 0 || Object.keys(this.nominalCurrency).length === 0) await this.initNominal_And_RussiaVal()

        // Example return: {"RUB": 10, "USD": 32} 
        return this.russiaVal;
    }

    async GetThailandValutesAll() {
        // Function get Thailand currency
        // Return: valutes ({"RUB": 10, "USD": 32}) 

        // Init if thailandVal not defined
        if (Object.keys(this.thailandVal).length === 0) await this.initThailandVal()

        // Example return: {"RUB": 10, "USD": 32} 
        return this.thailandVal;
    }

    async GetValuteFromTo(params) { 
        // Function converts currencies exist countries
        // params:
        //     country - name country, whose central bank use
        //     from - from what currency convert
        //     to - to what currency convert
        //     count - how much currency convert
        // Return: float (312,45)

        // Data validation
        if(!params.country) throw new Error("Country is empty");
        if(!params.from) throw new Error("From is empty");
        if(!params.count) throw new Error("Count is empty");
        if(isNaN(params.count)) throw new Error("Count is not number");
        if(!params.to) throw new Error("To is empty");

        // Init valutes variable
        let valutes = {};

        // Define country
        if(params.country.toLowerCase() == "thailand") valutes = await this.GetThailandValutesAll()
        else if(params.country.toLowerCase() == "russia") valutes = await this.GetRussiaValutesAll();

        // Throw err if there is no central bank
        else throw new Error("No central bank of the country");

        // Currency check
        if(!valutes[params.from]) throw new Error("From value currency not found in central bank current country");
        if(!valutes[params.to]) throw new Error("To value currency not found in central bank current country");

        // Calculate course
        const res = MathService.GetRoundFloat((1 / valutes[params.to]) * params.count / (1 / valutes[params.from]), 3);

        // Example return: 312,45
        return res;
    }
}

// Export class
export default new ValutesServices();