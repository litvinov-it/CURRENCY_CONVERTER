class StandartController {
    async GetHome(req, res) {
        try {
            res.json({get_valutes_russia: "/russia", get_valutes_tailand: '/tailand', convert_valutes: '/convert'})
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new StandartController();