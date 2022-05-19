let stateIn = "";
let covidUrl;
let covidData, subDate, year, month, day, stateVer, prevState;
let prevYear = 0;
let prevMonth = 0;
let prevDay = 0;
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
    obj["01"] = mostRecent.year;
    obj["02"] = mostRecent.month;
    obj["03"] = mostRecent.day;

    mostRecentDate.push(obj);
  }
}

covidtestBtn.addEventListener("click", getStateIn);
