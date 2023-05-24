class MathService {
    GetRandomInt(max) {
        return Math.floor(Math.random() * max)
    }
    GetRoundFloat(num, count) {
        return Math.round( num * 10**count ) / 10**count
    }
}

export default new MathService();