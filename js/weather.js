const API_KEY = config.apikey;

// 한문 변환은 주요 도시와 openweathermap에 있는 교집합만. 경기도, 강원도 등은 openweathermap에 없어서 제외시켰다.
const cityName = {
  Seoul: "徐菀",
  Busan: "釜山",
  Daegu: "大邱",
  Daejeon: "大田",
  Gwangju: "光州",
  IncheonL: "仁川",
  Ulsan: "蔚山",
  Jeju: "濟州",
};
// 날씨 변환은 https://gist.github.com/choipd/e73201a4653a5e56e830 참고
const weatherKr = {
  201: "가벼운 비를 동반한 천둥구름",
  200: "비를 동반한 천둥구름",
  202: "폭우를 동반한 천둥구름",
  210: "약한 천둥구름",
  211: "천둥구름",
  212: "강한 천둥구름",
  221: "불규칙적 천둥구름",
  230: "약한 연무를 동반한 천둥구름",
  231: "연무를 동반한 천둥구름",
  232: "강한 안개비를 동반한 천둥구름",
  300: "가벼운 안개비",
  301: "안개비",
  302: "강한 안개비",
  310: "가벼운 적은비",
  311: "적은비",
  312: "강한 적은비",
  313: "소나기와 안개비",
  314: "강한 소나기와 안개비",
  321: "소나기",
  500: "악한 비",
  501: "중간 비",
  502: "강한 비",
  503: "매우 강한 비",
  504: "극심한 비",
  511: "우박",
  520: "약한 소나기 비",
  521: "소나기 비",
  522: "강한 소나기 비",
  531: "불규칙적 소나기 비",
  600: "가벼운 눈",
  601: "눈",
  602: "강한 눈",
  611: "진눈깨비",
  612: "소나기 진눈깨비",
  615: "약한 비와 눈",
  616: "비와 눈",
  620: "약한 소나기 눈",
  621: "소나기 눈",
  622: "강한 소나기 눈",
  701: "박무",
  711: "연기",
  721: "연무",
  731: "모래 먼지",
  741: "안개",
  751: "모래",
  761: "먼지",
  762: "화산재",
  771: "돌풍",
  781: "토네이도",
  800: "구름 한 점 없는 맑은 하늘",
  801: "약간의 구름이 낀 하늘",
  802: "드문드문 구름이 낀 하늘",
  803: "구름이 거의 없는 하늘",
  804: "구름으로 뒤덮인 흐린 하늘",
  900: "토네이도",
  901: "태풍",
  902: "허리케인",
  903: "한랭",
  904: "고온",
  905: "바람부는",
  906: "우박",
  951: "바람이 거의 없는",
  952: "약한 바람",
  953: "부드러운 바람",
  954: "중간 세기 바람",
  955: "신선한 바람",
  956: "센 바람",
  957: "돌풍에 가까운 센 바람",
  958: "돌풍",
  959: "심각한 돌풍",
  960: "폭풍",
  961: "강한 폭풍",
  962: "허리케인",
};

function onGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector("#weather span:first-child");
      const weather = document.querySelector("#weather span:nth-child(2)");
      const temp = document.querySelector("#weather span:nth-child(3)");
      cityCode = data.name;
      weatherCode = data.weather[0].id;
      // city 이름을 한자로 변환. 한국만 변환을 설정해 놓았기에 다른 나라가 위치로 잡힌다면 openweathermap의 설정을 따라 변환하도록 하였다.
      if (Object.keys(cityName).includes(cityCode)) {
        city.innerText = cityName[cityCode];
      } else {
        city.innerText = cityCode;
      }
      // 날씨 정보를 한글로 변환. weathercode 외의 것들은 openweathermap의 설정을 따라 변환하도록 하였다.
      if (Object.keys(weatherKr).includes(String(weatherCode))) {
        weather.innerText = weatherKr[weatherCode];
      } else {
        weather.innerText = data.weather[0].main;
      }
      // toPrecision을 사용하여 소숫점 첫 번째 자리까지 표현한다.
      temp.innerText = `${data.main.temp.toPrecision(3)} ℃`;
    });
}

function onGeoError() {
  alert("今日의 氣溫을 알고싶다면 위치 찾기 권한을 승인하시오.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
