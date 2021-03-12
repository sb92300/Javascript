const toDoForm = document.querySelector('.js-toDoForm'),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = "toDos";
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //js에서 localStorage는 오로지 값을 string으로 저장함. 단순히 toDos를 인자로 쓰면
    // toDos에 들어오는 값이 toDoObj로 만든 오브젝트 값이므로 오류가 날 수 있음.
    // 그러므로 JSON.stringfy() 함수를 이용해 toDos의 인자를 string으로 바꿔줌.
}


function deleteToDo(e) {
    const btn = e.target;
    //event가 일어나는 대상을 찾음.
    const li = btn.parentNode;
    //click event가 일어난 대상(button)의 부모인 li 태그 지칭.
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter((toDo)=> {
        console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
        /* filter 함수는 toDos가 가진 값을 하나씩 살펴보고 return 값이  true인 것만 반환함.
        만약 내가 1번 버튼을 누르면 li.id 값은 1이 되고 toDo.id는 1~내가 가진 li 수가 됨.
        (todo 목록이 10개 있으면 toDo.id = 1,2,3...,10 / li.id = 1,1,1,1..,1(1이 10개))
        이 것을 fliter로 돌려서 true 값만 return해줌. 다른 요소들은 2 !== 1, 3!== 1, 4! == 1, ... 10 !== 1 이 맞지만
        내가 누른 1번 버튼은 toDo.id = 1, li.id = 1 이기 때문에 toDo.id !== parseInt(li.id); 이 조건에 부합하므로 false.
        false는 return 하지 않으므로 내 ui에서 사라지게 되는 것.
        toDo.id = int, li.id = string 이기 때문에 비교를 위해 li.id를 int 값으로 변경해야 함. */
    });
    toDos = cleanToDos;
    saveToDos();
}


function paintToDo(text) {
    //작성한 글을 li안에 넣어주는 역할을 하는 함수
    const li = document.createElement("li");
    const delBtn = document.createElement('button');
    // 버튼을 만든 것도 좋지만 이쁘게 하려면 a태그로 만들고 기능 추가 하는 것도 괜찮을 듯.
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText ="❌" 
    delBtn.addEventListener('click', deleteToDo);
    span.innerText = text;
    //span 안에 text 인자 값을 넣는데 text 인자는 handleSubmit 함수에서 나옴. (input의 value 값)
    li.appendChild(span);
    //li에 span 내용 추가
    li.appendChild(delBtn);
    //li에 만든 버튼 추가
    li.id = newId;
    toDoList.appendChild(li);
    //그 모든 것이 추가된 li를 ul안에 추가
    const toDoObj = {
        text : text,
        id : newId
        //toDos의 배열이 빈 값이라 1을 더하면 id: 1 값이 1개 있으면 다음에 들어올 값은 2 즉 순서가 맞게 됨.
    }
    //text 값은 handleSubmit에서 찾을 수 있다(toDoInput.value)
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(e) {
    e.preventDefault();
    //handleSubmit 함수 실행을 위해 submit 잠시 정지
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    //paintToDo의 text 인자 값에 toDoInput.value 넣어줌.
    toDoInput.value="";
    //할 일을 계속 적어야 하기 때문에 todo를 입력해서 list에 추가한 후 다시 input은 빈 값으로 넣어 값을 쓸 수 있게 한다.
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        //string으로 저장된 toDos의 값을 불러올 땐 다시 object형으로 바꿔야 함.
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    } else {

    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
    }

init();
