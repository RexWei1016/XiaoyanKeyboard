const textDisplay = document.getElementById('text-display');
const userInput = document.getElementById('user-input');
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

// 初始化顯示文字
function init() {
    const lines = originalText.split('\n');
    const formattedLines = lines.map(line =>
        `<div>${line.split('').map(char => `<span class="untyped">${char}</span>`).join('')}</div>`
    ).join('');
    textDisplay.innerHTML = formattedLines;
}

// 比對輸入的文字
function compareInput() {
    const userText = userInput.value;
    const lines = userText.split('\n');
    const lineDivs = textDisplay.querySelectorAll('div');
    let charIndex = 0;

    lineDivs.forEach((div, divIndex) => {
        const charSpans = div.querySelectorAll('span');
        const line = lines[divIndex] || '';
        charSpans.forEach((span, spanIndex) => {
            const char = line[spanIndex];
            if (char == null) {
                span.className = 'untyped';
            } else if (char === span.textContent) {
                span.className = 'correct';
            } else {
                span.className = 'incorrect';
            }
        });
        charIndex += div.textContent.length;
    });

    // 捲動已完成的行
    const completedLinesHeight = lineDivs[0].clientHeight * lines.length;
    textDisplay.style.transform = `translateY(-${completedLinesHeight}px)`;
}

// 初始化遊戲
init();
