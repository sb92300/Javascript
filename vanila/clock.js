const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");


function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ?`0${hours}` : hours} : ${minutes < 10 ?`0${minutes}`: minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

// ${seconds < 9 ? `0${second}` : seconds} => 삼항연산자(작은 if) 조건이 맞을 경우 ? 뒤에 내용 실행, 조건이 틀릴 경우 : 내용 실행

function init() {
    getTime();
    setInterval(getTime, 1000);
    // setInterval(a, b) setInterval 함수 : a = 실행할 함수, b = 실행할 시간
}

init();