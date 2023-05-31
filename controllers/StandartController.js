// Class
class StandartController {
    async GetHome(req, res) {
        try {
            // Send routers
            res.json([{get_valutes_russia: "/russia", param: {}}, {get_valutes_tailand: '/tailand', param: {}}, {convert_valutes: '/convert', param: {country: 'name country, whose central bank use', from: 'from what currency convert', to: 'to what currency convert', count: 'how much currency convert'}}])   
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

// Export class
export default new StandartController();