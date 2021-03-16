const form = document.querySelector('.js-form'),
      input = form.querySelector('input');
const pending = document.querySelector('.js-pending');
const finish = document.querySelector('.js-finish');
const PENDING = "PENDING";
const FINISHED = "FINISHED";
const check = document.createElement('button');
let pendingArray = [];
let finishArray = [];

// check 버튼 클릭 시 pending에 있던 li의 값들이 finish로 이동
// PENDING에 저장되어 있던 값이 FINISHED로 이동
// pending에 있던 li의 값 중 체크 버튼이 finish로 가면 back 버튼으로 변경
// back 버튼을 누르면 다시 FINISHED에 저장된 값이 PENDING으로 이동, back 버튼이 체크 버튼으로 변경

function savePending() {
  localStorage.setItem(PENDING, JSON.stringify(pendingArray));
}

function deletePending(e) {
   const delbtn = e.target;
   const li = delbtn.parentNode;
   pending.removeChild(li);
   const cleanPending = pendingArray.filter((task)=> {
    console.log(task.id, li.id);
    return task.id !== parseInt(li.id);
    /* filter 함수는 toDos가 가진 값을 하나씩 살펴보고 return 값이  true인 것만 반환함.
    만약 내가 1번 버튼을 누르면 li.id 값은 1이 되고 toDo.id는 1~내가 가진 li 수가 됨.
    (todo 목록이 10개 있으면 toDo.id = 1,2,3...,10 / li.id = 1,1,1,1..,1(1이 10개))
    이 것을 fliter로 돌려서 true 값만 return해줌. 다른 요소들은 2 !== 1, 3!== 1, 4! == 1, ... 10 !== 1 이 맞지만
    내가 누른 1번 버튼은 toDo.id = 1, li.id = 1 이기 때문에 toDo.id !== parseInt(li.id); 이 조건에 부합하므로 false.
    false는 return 하지 않으므로 내 ui에서 사라지게 되는 것.
    toDo.id = int, li.id = string 이기 때문에 비교를 위해 li.id를 int 값으로 변경해야 함. */
});
pendingArray = cleanPending;
savePending();
}

function putFinish() {
  localStorage.setItem(FINISHED, JSON.stringify(finishArray));
}

function moveToFin(e) {
  const btn = e.target;
  const li = btn.parentNode;
  finish.appendChild(li);
}
function paintPending(text) {
  const li = document.createElement('li');
  const del = document.createElement('button');
  const span = document.createElement('span');
  const check = document.createElement('button');
  const pendingId = pendingArray.length + 1;

  del.innerText = "❌";
  check.innerText ="✔";
  span.innerText = text;
  del.addEventListener('click', deletePending);
  check.addEventListener('click', moveToFin);

  li.appendChild(span);
  li.appendChild(check);
  li.appendChild(del);
  li.id = pendingId;
  pending.appendChild(li);

  const pendingObj = {
    id : pendingId,
    text : text
  }
  pendingArray.push(pendingObj);
  savePending();
}

function eventHandler(e) {
    e.preventDefault();
    const currentPending = input.value;
    paintPending(currentPending);
    input.value = "";
}

function loadPending() {
  const loadedPending = localStorage.getItem(PENDING);
  if(loadedPending !== 0) {
    const parsePending = JSON.parse(loadedPending);
    parsePending.forEach(function(task) {
      paintPending(task.text);
   });
  };
};

function init() {
  loadPending();
  form.addEventListener('submit', eventHandler);
}

init();
