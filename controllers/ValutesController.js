// Imports
import ValutesServices from "../services/ValutesServices.js";

// Class
class ValutesController {
    async GetRussiaValutesAll(req, res) {
        try {
            // Get valutes
            const valutes = await ValutesServices.GetRussiaValutesAll()
            // Res
            res.json(valutes)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    async GetThailandValutesAll(req, res) {
        try {
            // Get valutes
            const valutes = await ValutesServices.GetThailandValutesAll()
            // Res
            res.json(valutes)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    async GetValuteFromTo(req, res) {
        try {
            // Get num
            const num = await ValutesServices.GetValuteFromTo(req.query);
            // Res
            res.json(num);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

// Export class
export default new ValutesController();