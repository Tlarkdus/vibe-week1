// --- 요소 참조 ---
const input = document.getElementById("nameInput");
const button = document.getElementById("greetBtn");
const output = document.getElementById("output");
const counterEl = document.getElementById("counter");
const clockEl = document.getElementById("clock");
const timeGreetingEl = document.getElementById("timeGreeting");
const confettiLayer = document.getElementById("confettiLayer");
const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const starsLayer = document.getElementById("starsLayer");
const shootingLayer = document.getElementById("shootingLayer");

let greetCount = 0;

// 실제 별처럼 흰색 위주에 푸른빛·노란빛을 살짝 섞음
const starColors = [
  "#ffffff",
  "#ffffff",
  "#cfe3ff", // 푸른 별
  "#fff3c4", // 노란 별
  "#ffd9b3", // 주황빛 별
];

// --- 별밭 생성: 화면에 별을 흩뿌리고 각각 다른 속도로 반짝이게 ---
function createStars(count) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = "star";
    const size = 1 + Math.random() * 2; // 1~3px
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.background =
      starColors[Math.floor(Math.random() * starColors.length)];
    star.style.setProperty("--dur", 1.5 + Math.random() * 3.5 + "s");
    star.style.setProperty("--delay", Math.random() * 4 + "s");
    frag.appendChild(star);
  }
  starsLayer.appendChild(frag);
}

createStars(140);

// --- 별똥별: 가끔 한 줄기가 화면을 가로질러 지나감 ---
function launchShootingStar() {
  const star = document.createElement("span");
  star.className = "shooting-star";
  const width = 80 + Math.random() * 120; // 꼬리 길이
  star.style.width = width + "px";
  star.style.left = Math.random() * 60 + "vw"; // 상단 왼쪽~가운데에서 출발
  star.style.top = Math.random() * 40 + "vh";
  star.style.setProperty("--angle", 20 + Math.random() * 30 + "deg");
  star.style.setProperty("--travel", 400 + Math.random() * 400 + "px");
  star.style.setProperty("--dur", 0.8 + Math.random() * 0.7 + "s");
  shootingLayer.appendChild(star);
  // 다음 프레임에 애니메이션 시작
  requestAnimationFrame(() => star.classList.add("go"));
  star.addEventListener("animationend", () => star.remove());
}

// 2.5~6초 간격으로 무작위 발사
function scheduleShootingStar() {
  const delay = 2500 + Math.random() * 3500;
  setTimeout(() => {
    launchShootingStar();
    scheduleShootingStar();
  }, delay);
}

scheduleShootingStar();

// --- 매번 바뀌는 랜덤 칭찬 메시지 ---
const messages = [
  "님, 반갑습니다! 🎉",
  "님, 오늘도 멋져요! ✨",
  "님, 만나서 기뻐요! 😄",
  "님, 환영합니다! 🥳",
  "님, 좋은 하루 보내세요! 🌈",
  "님, 최고예요! 🚀",
  "님, 반짝반짝 빛나네요! 💫",
];

// --- 컨페티에 쓸 이모지 ---
const confettiEmojis = ["🎉", "🎊", "✨", "🌟", "💫", "🎈", "🥳", "🌈"];

// --- 시간대별 인사 + 실시간 시계 ---
function pad(n) {
  return String(n).padStart(2, "0");
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 디지털 시각
  clockEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  // 아날로그 시계 바늘 각도 (12시 방향이 0도)
  const secondDeg = seconds * 6; // 초당 6도
  const minuteDeg = minutes * 6 + seconds * 0.1; // 분당 6도 + 초에 따른 미세 이동
  const hourDeg = (hours % 12) * 30 + minutes * 0.5; // 시당 30도 + 분에 따른 이동
  secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

  const h = hours;
  let greeting;
  if (h < 6) greeting = "🌙 늦은 밤이에요";
  else if (h < 12) greeting = "☀️ 좋은 아침이에요";
  else if (h < 18) greeting = "🌤️ 활기찬 오후네요";
  else greeting = "🌆 편안한 저녁이에요";
  timeGreetingEl.textContent = greeting;
}

updateClock();
setInterval(updateClock, 1000);

// --- 컨페티 터뜨리기 ---
function launchConfetti() {
  const count = 24;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent =
      confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDuration = 2 + Math.random() * 2 + "s";
    piece.style.animationDelay = Math.random() * 0.3 + "s";
    piece.style.fontSize = 1 + Math.random() * 1.2 + "rem";
    confettiLayer.appendChild(piece);
    // 애니메이션이 끝나면 정리
    piece.addEventListener("animationend", () => piece.remove());
  }
}

// --- 인사하기 ---
function greet() {
  const name = input.value.trim();
  if (!name) {
    output.textContent = "이름을 입력해 주세요. 🙂";
    replayPop();
    return;
  }

  const msg = messages[Math.floor(Math.random() * messages.length)];
  output.textContent = `${name}${msg}`;
  replayPop();
  launchConfetti();

  greetCount += 1;
  counterEl.textContent = `지금까지 ${greetCount}번 인사했어요 👏`;
}

// output에 pop 애니메이션 다시 재생
function replayPop() {
  output.classList.remove("pop");
  void output.offsetWidth; // 리플로우 강제 → 애니메이션 재시작
  output.classList.add("pop");
}

// --- 이벤트 연결 ---
button.addEventListener("click", greet);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    greet();
  }
});
