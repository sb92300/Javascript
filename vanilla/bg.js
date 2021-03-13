const body = document.querySelector('body');
const IMG_NUMBER = 4;


function paintImage(imgNumber) {
    const image = new Image();
    image.src = `/images/${imgNumber + 1}.jpg`;
    //images 폴더 경로를 img.src로 저장. genRandom으로 뽑는 숫자는 0 ~ 3 이지만
    // img 파일의 번호는 1 ~ 4이므로 + 1씩 해서 맞추는 것.
    image.classList.add('bg-image');
    body.appendChild(image);
}


function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    //Math.floor 는 소숫점 버림 / Math.ceil은 소숫점 올림
    //Math.random() * 4 는 0~3까지 랜덤으로 숫자 뽑아줌.
    return number;
}


function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();