class DateService {
    GetYearMonthDatePredict(separator = '.') {
        // Function find date in the format year.month.day (2023.01.09)
        // separatot - separator between year, month, day
        // Return: 2023.01.09

        // Init now date
        const nowDate = new Date();

        // Get year
        let year = nowDate.getFullYear();

        // Get month
        let month = nowDate.getMonth() + 1;
        
        // Get day
        let date = nowDate.getDate();
        // One day predict
        if (date == 0) {
            if (month == 9, month == 4, month == 6, month == 11) date = 30
            else if (month == 2) date = 28
            else date = 31
        } else date--

        // Add zero if needed 
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;

        // Example return: 2023.01.09
        return `${year}${separator}${month}${separator}${date}`;
    }
}

export default new DateService();