const question = ["Songoku", "Chi-Chi", "Nappa", "Vegeta", "Raditz", "Broly", "Freeza", "Zarbon", "Dodoria", "Ginyu-Forces", "Kurilllin", "Piccolo", "Yamcha", "Trunks"];
let checkText = [];
createText()

const fail = document.getElementById("failCount")
const success = document.getElementById("successCount")
let failCount = 0;
let successCount = 0;


function createText() {
    const textWrap = document.getElementById("typeText")
    let random = Math.floor(Math.random() * question.length)
    const textContent = question[random].split("")
    textWrap.textContent = "";
    checkText = textContent.map(value => {
        const span = document.createElement("span")
        span.textContent = value
        textWrap.appendChild(span)
        return span
    })
}

window.addEventListener("keydown", function (e) {
    let typekey = e.key;

    if (typekey == checkText[0].textContent) {
        checkText[0].className = "success-color"
        checkText.shift()
    } else {
        failCount++;
        fail.innerText = failCount
    }

    if (typekey == "Shift") {
        failCount--;
    }

    if (!checkText.length) {
        successCount++;
        success.innerText = successCount
        createText()
    }

});
