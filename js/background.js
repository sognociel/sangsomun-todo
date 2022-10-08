// 배경화면 이미지를 랜덤으로 바꾸고 싶을 때.
const images = [
  "thunderstorm.jpg",
  "lightning.jpg",
  "dark.jpg",
  "dark-clouds.jpg",
];

// 랜덤으로 배경 이미지 선택하기
const chosenImage = images[Math.floor(Math.random() * images.length)];

// js에서 html생성
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;

// html에 만들었던 img태그 추가.
// append:가장 뒤에, prepend:가장 위에
const filter = document.querySelector(".filter");
filter.appendChild(bgImage);
