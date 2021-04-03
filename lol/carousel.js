const left = document.querySelector('.btn-1');
const right = document.querySelector('.btn-2');
const slider = document.querySelector('.slide-container');

function carousel() {
    slider.style.transform = "translate(-100vw, 0)";
}

function init() {
    right.addEventListener('click', carousel);
}

init();