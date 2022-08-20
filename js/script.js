window.onload = () => {
    var date = new Date();
    let temp =  date.getDate() + '/' + (date.getMonth() + 1).toString().padStart(2, 0) + '/' + date.getFullYear();
    document.getElementById('date').value = temp;
}

function generateDaily() {
    let initialMessage = document.getElementById("initial-message").value;
    let date = document.getElementById("date").value;
    let yesterday = getListFormat(document.querySelector("#yesterday-activities").value);
    let today = getListFormat(document.querySelector("#today-activities").value);
    let blocking = getListFormat(document.querySelector("#blocking-activities").value);
    let goodThing = getListFormat(document.querySelector("#good-thing").value);

    let output = `
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
        <b>Coisa boa</b>
        <ul>${goodThing}</ul>
    `;

    document.getElementById("output").innerHTML = output;

    document.getElementById('form').style.display = "none";
    document.getElementById('button-generate').style.display = "none";
    
    document.getElementById('result').style.display = "block";
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
    document.getElementById('button-generate').style.display = "block";
    document.getElementById('result').style.display = "none";
}

function copyContent() {
    const range = document.createRange();
    range.selectNode(document.getElementById("output"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    document.getElementById('copied-message').classList.add('show');
    setTimeout(()=> {
        document.getElementById('copied-message').classList.remove('show');
    }, 2000);
}
