window.onload = () => {
    document.getElementById('result').style.display = "none";
    getTodayDate();
    initTheme();
}

function generateDaily() {
    let initialMessage = document.getElementById("initial-message").value;
    let date = document.getElementById("date").value;
    let yesterday = getListFormat(document.getElementById("yesterday-activities").value);
    let today = getListFormat(document.getElementById("today-activities").value);
    let blocking = getListFormat(document.getElementById("blocking-activities").value);
    let notice = getListFormat(document.getElementById("notice").value);

    let daily = `
        <b>${initialMessage}</b>
        <br><br>
        <b>Daily ${date}</b>
        <br><br>
        <b>${getDayBefore()}</b>
        <ul>${yesterday}</ul>
        <br>
        <b>Hoje</b>
        <ul>${today}</ul>
        <br>
        <b>Impeditivo</b>
        <ul>${blocking}</ul>
    `;

    let hasNotice = document.getElementById('check-notice').checked
    if (hasNotice) {
        daily += `
        <br>
        <b>Aviso</b>
        <ul>${notice}</ul>
        `
    }

    document.getElementById("daily").innerHTML = daily;

    document.getElementById('form').style.display = "none";
    
    document.getElementById('result').style.display = "block";
}

function getTodayDate() {
    let date = new Date();
    let temp =  date.getDate().toString().padStart(2, 0) + '/' + (date.getMonth() + 1).toString().padStart(2, 0) + '/' + date.getFullYear();
    document.getElementById('date').value = temp;
    document.getElementById('dayBefore').innerText = getDayBefore();
}

function getDayBefore() {
    let date = new Date();
    return date.getDay() == 1 ? 'Sexta' : 'Ontem';
}

function getListFormat(text) {
    var lines = text.split('\n');
    return lines.filter(line => line.trim() !== '').map(line => `<li>${line}</li>`).join('');
}

function backToDaily() {
    document.getElementById('form').style.display = "block";
    document.getElementById('result').style.display = "none";
}

function toggleNoticeField() {
    let check = document.getElementById('check-notice').checked;
    let displayField = document.getElementById('notice').classList;

    if (check) {
        displayField.add('show');
    } else {
        displayField.remove('show');
    }
}

function copyContent() {
    const range = document.createRange();
    range.selectNode(document.getElementById("daily"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    document.getElementById('copied-message').classList.add('show');
    setTimeout(()=> {
        document.getElementById('copied-message').classList.remove('show');
    }, 2000);
}

function toggleEmojiPicker () {
    let display = document.getElementById('emoji-picker').classList;

    if (display.contains('show')) {
        display.remove('show');
    } else {
        display.add('show');
    }
    
}

function initTheme() {
    let localTheme = localStorage.getItem('theme');

    if (localTheme === null) {
        setTheme('theme-default');
    } else {
        setTheme(localTheme);
    }
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
}

function changeTheme() {
    let paletteStatus = document.getElementById('palette-container').classList;
    if (paletteStatus.value == '') {
        paletteStatus.add('show');
    } else {
        paletteStatus.remove('show');
    }
}
