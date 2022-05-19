let stateIn = '';
let covidUrl = `https://data.cdc.gov/resource/9mfq-cb36.json?state=${stateIn}`;
let covidData, subDate, year, month, day, stateVer, prevState;
covidtestBtn = document.querySelector(".covidApi-test");
covidtestIn = document.querySelector("#test-input-covid");
let mostRecentData = [];

function getStateIn() {
  stateIn = `${covidtestIn.value}`;
  console.log(stateIn);
  // getCovidApi();
}

async function getCovidApi() {
  await fetch(covidUrl).then(function (response) {
    let json = response.json();
    return json;
  })
  .then(function (data) {
    covidData = data;
  })
  splitDate();
}

function splitDate() {  
  for (let i = 0; i < covidData.length; i++) {
    stateVer = covidData[i].state;
    subDate = covidData[i].submission_date;
    subDate.toString();
    let dateArray = subDate.split("-");
    let dayArray = dateArray[2].split("T");
    year = dateArray[0];
    month = dateArray[1];
    day = dayArray[0];
    
    // createNewObj();

  }
  console.log(mostRecentData)
}

function createNewObj() {
  let prevYear = 0;
  let prevMonth = 0;
  let prevDay = 0;
  if (stateVer === prevState) {
    if (year >= prevYear) {
      prevYear = year;
      if (month >= prevMonth) {
        prevMonth = month;
        if (day >= prevDay) {
          prevDay = day;
        }
      }
    }
    let mostRecent = 
      {
        state: stateVer,
        year: prevYear,
        month: prevMonth,
        day: prevDay
      }
    let obj = {};
    obj["01"] = mostRecent.state;
    obj["02"] = mostRecent.year;
    obj["03"] = mostRecent.month;
    obj["04"] = mostRecent.day;

    mostRecentData.push(obj);
    
  } else {
    prevState = stateVer;
  }
}


covidtestBtn.addEventListener("click", getStateIn);
