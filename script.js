const textDisplay = document.getElementById('text-display');
const userInput = document.getElementById('user-input');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score-display');
const gameContainer = document.getElementById('game-container');
const originalText = `我怎會毫髮無傷
我真是傷透了
除了頭髮還在
臉也沒了
心也碎了
一向自律自重
從來沒想到會跟這類事扯上，
我真的頭都抬不起
一輩子沒有這樣怕見人
打擊很大
很多事我都不知道
覺得對不起耿如
如果早知道我絕不會讓她嫁給他!`;

let timeRemaining = 60;
let timer = null;

function init() {
    const lines = originalText.split('\n');
    const formattedLines = lines.map(line =>
        `<div>${line.split('').map(char => `<span class="untyped">${char}</span>`).join('')}</div>`
    ).join('');
    textDisplay.innerHTML = formattedLines;
    timerDisplay.textContent = '剩餘時間：60 秒';
    scoreDisplay.textContent = '';
    userInput.disabled = true;
}

userInput.addEventListener('focus', function() {
    gameContainer.classList.add('keyboard-active');
});

userInput.addEventListener('blur', function() {
    gameContainer.classList.remove('keyboard-active');
});

function compareInput() {
    const userText = userInput.value;
    const lines = userText.split('\n');
    const divs = textDisplay.querySelectorAll('div');

    divs.forEach((div, divIndex) => {
        const chars = div.querySelectorAll('span');
        const lineText = lines[divIndex] || '';

        chars.forEach((char, charIndex) => {
            if (charIndex < lineText.length) {
                if (char.textContent === lineText[charIndex]) {
                    char.classList.remove('untyped', 'incorrect');
                    char.classList.add('correct');
                } else {
                    char.classList.remove('untyped', 'correct');
                    char.classList.add('incorrect');
                }
            } else {
                char.classList.remove('correct', 'incorrect');
                char.classList.add('untyped');
            }
        });
    });

    // 滾動至當前輸入行
    const currentLineIndex = lines.length - 1;
    const currentDiv = divs[currentLineIndex];
    if (currentDiv) {
        textDisplay.scrollTop = currentDiv.offsetTop - textDisplay.offsetTop;
    }
}



function startGame() {
    if (timer) {
        clearInterval(timer);
    }
    timeRemaining = 60;
    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `剩餘時間：${timeRemaining} 秒`;
        if (timeRemaining === 0) {
            clearInterval(timer);
            finishGame();
        }
    }, 1000);
    userInput.disabled = false;
    userInput.focus();
}

function finishGame() {
    userInput.disabled = true;
    const spans = textDisplay.querySelectorAll('span');
    const correctCount = Array.from(spans).filter(span => span.className === 'correct').length;
    const totalCount = spans.length;
    const accuracy = Math.round((correctCount / totalCount) * 100);
    scoreDisplay.textContent = `完成度：${accuracy}%`;
}

startBtn.addEventListener('click', () => {
    startGame();
});

init();
