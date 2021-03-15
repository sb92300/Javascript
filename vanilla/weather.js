const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = "e022cf97b57aca5bc7cc666ce8b7441e";

function getWaether(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    //openweathermap.org 사이트에 가면 api doc에 call api에서 찾을 수 있음.
    ).then(function(response) { 
        //then 함수는 앞서 실행한 함수가 완료가 된 후 실행할 함수를 작성하기 위해 사용한다.
        //fetch 함수를 동작하고 필요한 값을 받은 다음 그 값을 인자로 받는 함수 실행
        return response.json()
        //fetch 함수를 끝내고 response 값(필요한 날씨 정보 등이 있음) 을 받은 뒤 이 값을 json 값으로 변환,
        // json 값으로 변환이 되면 이 값을 콘솔에 보여준다.
        })
        .then(function(json) {
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C @ ${place}`;
        });
    
};

function saveCoords(coordsObj) { //위치 값 받아서 얻은 위도 경도 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

function handleGeoSuccess(position) { //위치 값을 받았을 때
    console.log(position);
  const latitude = position.coords.latitude; //위도 값 지정
  const longitude = position.coords.longitude; // 경도 값 지정
  const coordsObj = {
      latitude,
      longitude
      // js에서 변수 이름과 객체 이름이 같을 때는 생략해서 써도 됨. ex) first : first, last : last === first, last
  };
  saveCoords(coordsObj);
  getWaether(latitude, longitude);
};

function handleGeoError() { //위치 값을 못 받았을 때
    console.log("can't access geo location");
};

function askForCoords() { //위치 찾기
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    // getCurrentPosition() 2개의 인자를 받는데 1개는 좌표를 받는데 성공하면 실행할 함수,

};

function loadCoords() { // 위치 불러오기
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWaether(parseCoords.latitude, parseCoords.longitude);
    };
};

function init() {
    loadCoords();
};

init();