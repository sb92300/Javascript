const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
//현재 유저의 local storage 저장을 위한 변수
const SHOWING_CN = "showing";
//display를 보이게 하기 위한 변수

function saveName(text) {
    localStorage.setItem(USER_LS, text);
    //LS에 USER_LS, text인자를 저장. 이렇게 저장하면 LS에서 key 값은 USER_LS 즉 currentUser 가 되고 value 값은 text에 들어온 값이 된다.
}

function handleSubmit(e) {
    e.preventDefault();
    //인풋에 입력하고 엔터 쳤을 때 값이 submit을 하기 위해 이동하는 것을 막음.
    const currentValue = input.value;
    //input값 받아오기
    paintGreeting(currentValue);
    //hello ~~에 ~~ 안에 input.value 넣기
    saveName(currentValue);
    //currentUser(key)에 input.value에 입력된 value 넣기

}

function askForName() {
    form.classList.add(SHOWING_CN);
    //form 값 보이게 
    form.addEventListener('submit', handleSubmit);
    // submit, 즉 인풋에 값 입력후 엔터 쳤을 때 handleSubmit 함수 실행
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    //form 안보이게
    greeting.classList.add(SHOWING_CN);
    //greeting 보이게
    greeting.innerText = `Hello ${text}`
    //greeting에 Hello 누구누구 보이게
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    //LS에서 저장된 user 불러오기
    if(currentUser === null) {
        askForName();
        //저장된 유저 없으면 인풋 창
    }  else {
        paintGreeting(currentUser)
        //저장 유저 있으면 hello ~~ 보이게
    }
}


function init() {
    loadName();
}

init();
