class DateService {
    GetYearMonthDate(separator = '.') {
        const nowDate = new Date();

        let year = nowDate.getFullYear();
        let month = nowDate.getMonth();
        let date = nowDate.getDate();

        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;

        return `${year}${separator}${month}${separator}${date}`;
    }
    CreateDelay(seconds) {
        return new Promise((resolve) => { setTimeout(resolve, seconds * 1000); });
    }
}

export default new DateService();