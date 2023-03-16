let question = ["Songoku", "Chi-Chi", "Nappa", "Vegeta", "Raditz", "Broly", "Freeza", "Zarbon", "Dodoria", "Ginyu-Forces", "Kurilllin", "Piccolo", "Yamcha", "Trunks"];
let typingText = document.getElementById("typingText")
questionWord()

const miss = document.getElementById("missCount")
let missCount = 0;

function questionWord() {
    let random = Math.floor(Math.random() * question.length)
    typingText.innerText = question[random]
}

window.addEventListener("keydown", function (e) {
    let typekey = e.key;

    if (typekey == typingText.innerText.slice(0, 1)) {
        typingText.innerText = typingText.innerText.slice(1)
    } else {
        missCount++
        miss.innerText = missCount
    }

    if (typingText.innerText.length == 0) {
        questionWord()
    }

});
