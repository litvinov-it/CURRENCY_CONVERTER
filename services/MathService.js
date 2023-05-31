// Class
class MathService {
    GetRoundFloat(num, count) {
        // Calculate 
        return Math.round( num * 10**count ) / 10**count
    }
}

// Export class
export default new MathService();