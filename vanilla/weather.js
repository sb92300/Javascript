const COORDS = 'coords';
const API_KEY = "e022cf97b57aca5bc7cc666ce8b7441e";

function getWaether(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    //openweathermap.org 사이트에 가면 api doc에 call api에서 찾을 수 있음.
}

function saveCoords(coordsObj) { //위치 값 받아서 얻은 위도 경도 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) { //위치 값을 받았을 때
  const latitude = position.coords.latitude; //위도 값 지정
  const longitude = position.coords.longitude; // 경도 값 지정
  const coordsObj = {
      latitude,
      longitude
      // js에서 변수 이름과 객체 이름이 같을 때는 생략해서 써도 됨. ex) first : first, last : last === first, last
  };
  saveCoords(coordsObj);
  getWaether(latitude, longitude);
}

function handleGeoError() { //위치 값을 못 받았을 때
    console.log("can't access geo location");
}

function askForCoords() { //위치 찾기
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    // getCurrentPosition() 2개의 인자를 받는데 1개는 좌표를 받는데 성공하면 실행할 함수,
    
}

function loadCoords() { // 위치 불러오기
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWaether(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();