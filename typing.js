let failCount = 0;
let successCount = 0;
let startTime = 3;
let timeLimit = 30;
const main = document.getElementById("main")
const textWrap = document.getElementById("typeText")
const startButton = document.getElementById("startButton")
const fail = document.getElementById("failCount")
const success = document.getElementById("successCount")
const remainingTime = document.getElementById("timeLimit")

const question = ["Songoku", "Chi-Chi", "Nappa", "Vegeta", "Raditz", "Broly", "Freeza", "Zarbon", "Dodoria", "Ginyu-Forces", "Kurilllin", "Piccolo", "Yamcha", "Trunks"];
let checkText = [];


function countDown() {
    startButton.textContent = startTime
    startTime--;
}


// 問題を作成
function createText() {
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

// スタートタイマー
startButton.addEventListener("click", () => {
    const timer = setInterval(()=> {
        countDown()
        if(startTime < 0) {
            clearInterval(timer)
            createText()
            main.style.display = "block"
            typeTimer()
        }
    }, 1000)
})

// 制限時間
function typeTimer() {
    const countDown = () => {
        remainingTime.textContent = timeLimit
        timeLimit--;
    }
    const typeTimer = setInterval(() => {
        countDown()
        if (timeLimit < 0) {
            clearInterval(typeTimer)
        }
    }, 1000) 
}


// タイピング処理
window.addEventListener("keydown", function (e) {
    let typekey = e.key;
    textWrap.classList.remove("fail-color")

    if (typekey === "Shift") {
        return;
    }
    if (typekey === checkText[0].textContent) {
        checkText[0].className = "success-color"
        checkText.shift()
    } else {
        textWrap.classList.add("fail-color")
        failCount++;
        fail.innerText = failCount
    }
    if (!checkText.length) {
        successCount++;
        success.innerText = successCount
        createText()
    }
});
