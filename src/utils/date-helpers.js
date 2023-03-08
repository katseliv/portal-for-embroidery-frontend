export const formatDatetime = (datetimeString) => {
    const date = new Date(datetimeString);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = `0${month}`;
    }

    return day + "-" + month + "-" + year;
}

export const datetimeToYears = (datetimeString) => {
    const currentDatetime = new Date(Date.now());
    const datetime = new Date(datetimeString);
    const year = currentDatetime.getFullYear() - datetime.getFullYear();

    if (year === 1) {
        return year + " year";
    }
    return year + " years";
}