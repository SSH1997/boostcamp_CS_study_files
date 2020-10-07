const divButton = document.getElementById("button-div");
const btnButton = document.getElementById("button-btn");
document.body.addEventListener("click", (event) => {
  const { target } = event;
  if (target === divButton || target === btnButton) {
    alert("버튼을 클릭하셨군요!");
  } else if (target.id === "naver") {
    window.open("https://www.naver.com", "_blank");
  } else if (target.id === "kakao") {
    window.open("https://www.kakaocorp.com", "_blank");
  } else if (target.id === "google") {
    window.open("https://www.google.com", "_blank");
  }
});
