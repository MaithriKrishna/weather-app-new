const submitButton = document.querySelector("#submit");
const foreCastDom = document.querySelector("#forecast");
const locationDom = document.querySelector("#location");

submitButton.addEventListener("click", () => {
  let loc = document.getElementById("location").value;
  fetch(`/weather?place=${loc}`).then((response) => {
    response.json().then((data) => {
      foreCastDom.textContent = data;
    });
  });
});
