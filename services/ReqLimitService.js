export default class ReqLimit {
    constructor(limit) {
        this.limit = limit;
        this.reqCount = 0;

        this.StartInterval()
    }

    StartInterval() {
        setInterval(() => {
            this.reqCount = 0;
        }, 1_000)
    }

    async Req(callback) {
        if (this.reqCount < this.limit) {
            this.reqCount += 1;
            return await callback();
        } else {
            return 'Exceeded count reques. Please, try again';  
        }
    }
}