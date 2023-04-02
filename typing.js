const main = document.getElementById("main")
const getMainStyle = getComputedStyle(main)
const textWrap = document.getElementById("typeText")
const startText = document.getElementById("startText")
const restartText = document.getElementById("restartText")
const fail = document.getElementById("failCount")
const success = document.getElementById("successCount")
const resultType = document.getElementById("successType")
const resultSuccess = document.getElementById("successResult")
const resultFail = document.getElementById("failResult")
const remainingTime = document.getElementById("timeLimit")
const startWrap = document.getElementById("startWrap")
const endWrap = document.getElementById("endWrap")

// 音源
const bgmSound = new Audio("music/BPM130.mp3")
const startSound = new Audio("music/Countdown06-2.mp3")
const endSound = new Audio("music/end.mp3")
const typeSound = new Audio("music/typing.mp3")
const successSound = new Audio("music/correct040.mp3")
const failSound = new Audio("music/fail.mp3")

// 音源調整
bgmSound.volume = 0.4;
failSound.volume = 0.4;
bgmSound.currentTime = 1


let startTime = 3;
let timeLimit = 30;
let typeCount = 0;
let successCount = 0;
let failCount = 0;
let timerStarted = false;

const question = ["show databases;", "create database;", "use database_name;","drop database", "show tables;", "create table", "select distinct", "where", "group by", "having", "order by", "between", "ls ls-l ls-a", "cd cp mkdir","touch", "rm rmdir", "cat more less", "find grep", "diff", "chmod chown"]
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
    checkText[0].className = "letterType"
}

// スタートタイマー
function startTimer() {
    const countDown = () => {
        startText.textContent = startTime
        restartText.textContent = startTime
        startTime--;
    }
    const timer = setInterval(() => {
        countDown();
        startSound.play()
        if (startTime < 0) {
            clearInterval(timer)
            typeDisplay()
            startWrap.style.display = "none"
            endWrap.classList.remove("active")
            timerStarted = false;
        }
    }, 1000)
}


// タイピングゲーム表示
function typeDisplay() {
    startTime = 3;
    timeLimit = 30;
    typeCount = 0;
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
            bgmSound.play()
        } 
        else {
            bgmSound.pause()
            bgmSound.currentTime = 1
            endSound.play()
            main.style.display = "none";
            restartText.textContent = "Enterキーでもう一度";
            resultType.textContent = typeCount;
            resultSuccess.textContent = successCount;
            resultFail.textContent = failCount;
            endWrap.classList.add("active")
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
            typeCount++;
            typeSound.currentTime = 0;
            typeSound.play()
            checkText[0].className = "success-color"
            checkText.shift()
            if (checkText.length) {
                checkText[0].className = "letterType"
            }
        } else {
            failSound.currentTime = 0;
            failSound.play()
            textWrap.classList.add("fail-color")
            failCount++;
            fail.innerText = failCount
        }
        if (!checkText.length) {
            successSound.currentTime = 0;
            successSound.play()
            successCount++;
            success.innerText = successCount
            createText()

        }
    }
});