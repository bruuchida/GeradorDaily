const date = new Date();

window.onload = () => {
    getTodayDate();
    initTheme();

    document.querySelector('emoji-picker').addEventListener('emoji-click', e => {
        document.querySelector("#initial-message").value += e.detail.unicode
    })

    document.addEventListener('click', e => {
        if (e.target.id !== 'emoji-button' && document.querySelector('#emoji-picker').classList.contains('show')) toggleEmojiPicker();
        if (e.target.id !== 'palette' && document.querySelector('#themes').classList.contains('show')) togglePalette();
    })
}

function getDaily() {
    let initialMessage = document.querySelector("#initial-message").value;
    let date = document.querySelector("#date").value;
    let yesterday = getListFormat(document.querySelector("#yesterday-activities").value);
    let today = getListFormat(document.querySelector("#today-activities").value);
    let blocking = getListFormat(document.querySelector("#blocking-activities").value);
    let notice = getListFormat(document.querySelector("#notice").value);

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
    `;

    if (document.querySelector('#check-blocking-activities').checked) {
        daily += `<br><b>Impeditivo</b><ul>${blocking}</ul>`
    }

    if (document.querySelector('#check-notice').checked) {
        daily += `<br><b>Aviso</b><ul>${notice}</ul>`
    }

    document.querySelector("#daily").innerHTML = daily;

    document.querySelector('#form').style.display = "none";
    
    document.querySelector('#result').style.display = "block";
}

function copyContent() {
    const range = document.createRange();
    range.selectNode(document.querySelector("#daily"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    document.querySelector('#copied-message').classList.add('show');
    setTimeout(()=> {
        document.querySelector('#copied-message').classList.remove('show');
    }, 2000);
}

/* Theme */
function initTheme() {
    const theme = localStorage.getItem('theme')
    setTheme(theme ? theme : 'theme-dark-default');
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.classList = theme;
}


/* Toggles */
function togglePalette() {
    document.querySelector('#themes').classList.toggle('show');
}

function toggleNoticeField() {
    document.querySelector('#notice').classList.toggle('show');
}

function toggleBlockingActivitiesField() {
     document.querySelector('#blocking-activities').classList.toggle('show');
}

function toggleEmojiPicker () {
    document.querySelector('#emoji-picker').classList.toggle('show');    
}

function backToDaily() {
    document.querySelector('#form').style.display = "grid";
    document.querySelector('#result').style.display = "none";
}

/* Formats */
function getTodayDate() {
    let temp =  date.getDate().toString().padStart(2, 0) + '/' + (date.getMonth() + 1).toString().padStart(2, 0) + '/' + date.getFullYear();
    document.querySelector('#date').value = temp;
    document.querySelector('#dayBefore').innerText = getDayBefore();
}

function getDayBefore() {
    return date.getDay() == 1 ? 'Sexta' : 'Ontem';
}

function getListFormat(text) {
    var lines = text.split('\n');
    return lines.filter(line => line.trim() !== '').map(line => `<li>${line}</li>`).join('');
}