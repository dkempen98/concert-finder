let stateIn = "";
let covidUrl;
let covidData, subDate, year, month, day;
let prevYear = 0;
let prevMonth = 0;
let prevDay = 0;
let mostUpadatedData;
covidtestBtn = document.querySelector(".covidApi-test");
covidtestIn = document.querySelector("#test-input-covid");
let mostRecentDate = [];

function getStateIn() {
  stateIn = `${covidtestIn.value}`;
  covidUrl = `https://data.cdc.gov/resource/9mfq-cb36.json?state=${stateIn}`;
  console.log(stateIn);
  getCovidApi();
}

async function getCovidApi() {
  await fetch(covidUrl)
    .then(function (response) {
      let json = response.json();
      return json;
    })
    .then(function (data) {
      covidData = data;
    });
  splitDate();
}

function splitDate() {
  for (let i = 0; i < covidData.length; i++) {
    subDate = covidData[i].submission_date;
    let dateArray = subDate.split("-");
    let dayArray = dateArray[2].split("T");
    year = dateArray[0];
    month = dateArray[1];
    day = dayArray[0];

    findMostRecentDate();
  }
  console.log(mostRecentDate);
  mostUpadatedData = `${mostRecentDate[0].year}-${mostRecentDate[0].month}-${mostRecentDate[0].day}T00:00:00.000`;
  console.log(mostUpadatedData);
}

function findMostRecentDate() {
  if (year > prevYear) {
    prevYear = year;
    if (month > prevMonth) {
      prevMonth = month;
      if (day > prevDay) {
        prevDay = day;
      }
    }
    let mostRecent = {
      year: prevYear,
      month: prevMonth,
      day: prevDay,
    };

    let obj = {};
    obj["year"] = mostRecent.year;
    obj["month"] = mostRecent.month;
    obj["day"] = mostRecent.day;

    mostRecentDate[0] = obj;
  }
}

covidtestBtn.addEventListener("click", getStateIn);
