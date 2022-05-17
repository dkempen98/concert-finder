let covidUrl = `https://data.cdc.gov/resource/9mfq-cb36.json`;

covidtestBtn = document.querySelector(".covidApi-test")

function getCovidApi() {
  fetch(covidUrl).then(function (response) {
    let json = response.json();
    return json;
  })
  .then(function (data) {
    console.log(data);
  })
}

covidtestBtn.addEventListener("click", getCovidApi);
