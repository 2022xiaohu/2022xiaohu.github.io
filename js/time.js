function time(time) {
    let date = new Date(time * 1000);
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    return steTime = hours + ":" + minutes + ":" + seconds;
}