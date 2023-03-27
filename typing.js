const main = document.getElementById("main")
const getMainStyle = getComputedStyle(main)
const textWrap = document.getElementById("typeText")
const startText = document.getElementById("startText")
const fail = document.getElementById("failCount")
const success = document.getElementById("successCount")
const remainingTime = document.getElementById("timeLimit")
const startWrap = document.getElementById("startWrap")

let startTime = 3;
let timeLimit = 10;
let successCount = 0;
let failCount = 0;
let timerStarted = false;

const question = ["Songoku", "Chi-Chi", "Nappa", "Vegeta", "Raditz", "Broly", "Freeza", "Zarbon", "Dodoria", "Ginyu-Forces", "Kurilllin", "Piccolo", "Yamcha", "Trunks"];
let checkText = [];

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
function startTimer() {
    const countDown = () => {
        startText.textContent = startTime
        startTime--;
    }
    const timer = setInterval(() => {
        countDown()
        if (startTime < 0) {
            clearInterval(timer)
            typeDisplay()
            startWrap.style.display = "none"
            timerStarted = false;
        }
    }, 1000)
}


// タイピングゲーム表示
function typeDisplay() {
    startTime = 3;
    timeLimit = 10;
    failCount = 0;
    successCount = 0;
    textWrap.classList.remove("fail-color")
    fail.innerHTML = failCount
    success.innerHTML = successCount
    remainingTime.textContent = timeLimit
    main.style.display = "block"
    createText()
    typeTimer()
}

// タイプタイマー
function typeTimer() {
    let startTime = performance.now();

    const animate = (now) => {
        let elapsed = Math.floor((now - startTime) / 1000);
        remainingTime.textContent = timeLimit - elapsed;

        if (elapsed < timeLimit) {
            requestAnimationFrame(animate);
        } else {
            main.style.display = "none";
            startText.textContent = "Enterでスタート";
            startWrap.style.display = "block";
        }
    };
    requestAnimationFrame(animate);
}

// タイピング処理
window.addEventListener("keydown", function (e) {
    let typekey = e.key;
    // Enterでゲームスタート
    if (getMainStyle.display === "none" && typekey === "Enter" && !timerStarted) {
        timerStarted = true;
        startTimer();
    }

    // ゲーム処理
    if (getMainStyle.display === "block") {
        textWrap.classList.remove("fail-color")
        if (typekey === "Shift" || typekey === "Enter") {
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
    }
});