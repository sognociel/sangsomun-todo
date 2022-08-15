const images = [
    "03478_sandycay_1920x1080.jpg",
    "03541_lassenvolcanic_1920x1080.jpg",
    "04004_theblackandwhiterocky_1920x1080.jpg",
    "04005_loneguardian_1920x1080.jpg",
    "04007_autumnsunlightthroughthetrees_1920x1080.jpg"
];

// 랜덤으로 배경 이미지 선택하기
const chosenImage = images[Math.floor(Math.random() * images.length)];

// js에서 html생성
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;

// html에 만들었던 img태그 추가 append:가장 뒤에, prepend:가장 위에 
document.body.appendChild(bgImage);