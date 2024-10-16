document.getElementById('timezoneForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const time = document.getElementById('time').value;
    const fromZone = document.getElementById('fromZone').value;
    const toZone = document.getElementById('toZone').value;
    console.log(time);

    if (time) {
        const date = new Date(time);
        const taipeiOptions = { timeZone: 'Asia/Taipei', hour12: false, hour: "numeric", minute: "numeric"};
        const specifiedOptions = { timeZone: toZone, hour12: false, hour: "numeric", minute: "numeric"};

        // 取得台北時間和指定時區時間
        const taipeiTime = new Intl.DateTimeFormat('zh-TW', taipeiOptions).format(date);
        const specifiedTime = new Intl.DateTimeFormat('en-GB', specifiedOptions).format(date);

        // 更新時鐘顯示
        updateClock(date, fromZone, 'taipeiHour', 'taipeiMinute');
        updateClock(date, toZone, 'specifiedHour', 'specifiedMinute');

        // 顯示字串時間
        document.getElementById('taipeiTimeString').textContent = `台北時間: ${taipeiTime}`;
        document.getElementById('specifiedTimeString').textContent = `指定時區時間: ${specifiedTime}`;
    }
});

function updateClock(date, timeZone, hourElementId, minuteElementId, secondElementId) {
    const options = { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeString = new Intl.DateTimeFormat('en-GB', options).format(date);
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
    const minuteDegrees = minutes * 6;

    document.getElementById(hourElementId).style.transform = `rotate(${hourDegrees}deg)`;
    document.getElementById(minuteElementId).style.transform = `rotate(${minuteDegrees}deg)`;
}
