const msPerMinute = 60 * 1000;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;

export const getDate = (timeStamp, language) => {
    var date = new Date(timeStamp).getDay();
    var today = new Date(Date.now()).getDay();
    if (!timeStamp) return '';
    else if (date == today) {
        return language == 'en' ? 'Today' : 'Hôm nay';
    } else {
        var days =
            language == 'en'
                ? ['Sun', 'Mon', 'Tus', 'wed', 'Thu', 'fri', 'sat']
                : ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
        var dayName = days[date];
        return `${dayName}`;
    }
};

export const getDay = timeStamp => {
    var day = new Date(timeStamp);
    return `${day.getDay()}/${day.getMonth()}`;
};

export const getTime = (timeStamp, fullTime = false) => {
    var day = new Date(timeStamp);
    if (!fullTime) {
        return day.toLocaleTimeString().substring(0, 5);
    } else {
        return day.toLocaleTimeString();
    }
};
