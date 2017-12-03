const DateUtil = {
    DAY_LENGTH: 1000 * 60 * 60 * 24,
    toDate(date) {
        if (typeof date === "string") return new Date(date);
        const {year, month, day = 1, hour = 0, minute = 0, second = 0} = date;
        return new Date(year, month - 1, day, hour, minute, second);
    },
    genListYear(year) {
        let currentYear = year || new Date().getFullYear();
        let years = [];
        for (let i = currentYear - 100 < 1 ? 1 : currentYear - 100; i <= currentYear + 100; i++) {
            years.push({
                value: i,
                name: i
            });
        }

        return years;
    },
    addHour(date, hour) {
        return new Date(date.setTime(new Date().getTime() + (hour*60*60*1000)))
    },
    addMinute(date, min) {
        return new Date(date.setTime(new Date().getTime() + (min * 60 * 1000)))
    },
    subtract(date, hour) {
        return new Date(date.setTime(new Date().getTime() - (hour*60*60*1000)))
    },
    addDay(date, days) {
        return new Date(date.setDate(new Date(date).getDate() + days));
    },
    subtractDay(date, days) {
        return new Date(date.setDate(new Date(date).getDate() - days));
    },
    months: [
        {value: 1, name: "January", abbr: "Jan"},
        {value: 2, name: "February", abbr: "Feb"},
        {value: 3, name: "March", abbr: "Mar"},
        {value: 4, name: "April", abbr: "Apr"},
        {value: 5, name: "May", abbr: "May"},
        {value: 6, name: "June", abbr: "Jun"},
        {value: 7, name: "July", abbr: "Jul"},
        {value: 8, name: "August", abbr: "Aug"},
        {value: 9, name: "September", abbr: "Sep"},
        {value: 10, name: "October", abbr: "Oct"},
        {value: 11, name: "November", abbr: "Nov"},
        {value: 12, name: "December", abbr: "Dec"}
    ],
    utcDate(date) {
        if(typeof date === "string") return new Date(date);
        const {year, month, day = 1, hour = 0, minute = 0, second = 0} = date;
        return new Date(Date.UTC(year, parseInt(month) - 1, parseInt(day) || 1, hour || 0, minute || 0, second || 0));
    },
    utcDateWithoutTimezoneEffect(dateInput) {
        let date = new Date();
        if(typeof dateInput === "string") return new Date(dateInput) + (date.getTimezoneOffset() * 60 * 1000);
        const {year, month, day = 1, hour = 0, minute = 0, second = 0} = dateInput;
        let dateUTC = new Date(Date.UTC(year, month - 1, day || 1, hour || 0, minute || 0, second || 0));
        return new Date(dateUTC.getTime() + (date.getTimezoneOffset() * 60 * 1000));
    },
    removeoffsetDate(date, offset = new Date().getTimezoneOffset()) {
        let timestamp = date.getTime();
        timestamp = timestamp - (offset * 60 * 1000);
        return new Date(timestamp);
    },
    removeOffsetDateObject(dateObject) {
        if (!dateObject.from) return dateObject;
        return {
            from: DateUtil.removeoffsetDate(dateObject.from, dateObject.client_offset),
            thru: DateUtil.removeoffsetDate(dateObject.thru, dateObject.client_offset),
            client_offset: dateObject.client_offset
        }
    },
    subtractMonth({day, month, year}) {
        if (month == 1) {
            return {
                day: day,
                month: 12,
                year: parseInt(year) - 1
            }
        } else {
            return {
                day: day,
                month: parseInt(month) - 1,
                year: year
            }
        }
    },
    plusMonth({day, month, year}) {
        if (month == 12) {
            return {
                day: day,
                month: 1,
                year: parseInt(year) + 1
            }
        } else {
            return {
                day: day,
                month: parseInt(month) + 1,
                year: year
            }
        }
    },
    remainingTimeFromNow(date) {
        return DateUtil.toDate(date).getTime() - new Date().getTime();
    },
    pastDate(date) {
        return Math.abs(DateUtil.remainingTimeFromNow(date)) / DateUtil.DAY_LENGTH
    },
    remainingDayFromNow(date) {
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        let deadlineDate = new Date(date.year, date.month - 1, date.day);
        deadlineDate.setHours(0,0,0,0);
        return currentDate.getTime() - deadlineDate.getTime();
    },
    parseDate (date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }
};

exports.DateUtil = DateUtil;