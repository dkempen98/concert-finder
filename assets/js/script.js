var concertDate;
var weatherDate;

var state;
var totalStateCases;
var recentStateCases;
var averageWeeklyCases;
var covidRiskScore;

function getWeatherDate() {
  weatherDate = Math.floor(new Date(concertDate).getTime() / 1000);
}

function calculateCovidScore() {
  // The formula is avgWeeklyCases/5 = x => currentWeekTotal / x => score

  var weekCount = weeksSincePandemicStart();
  averageWeeklyCases = totalStateCases / weekCount;
  // 5 is the baseline so I assume average weekly cases would be a score of 5.
  // Knowing this, I will divide the average weekly cases by 5 to get a score
  // of 1 then adjust that based on the recent case counts.
  var scoreOfOne = averageWeeklyCases / 5;
  covidRiskScore = recentStateCases / scoreOfOne;

  if (covidRiskScore > 10) {
    covidRiskScore = 10;
  }

  return covidRiskScore;
}

function weeksSincePandemicStart() {
  // Start of pandemic, gave some leeway to avoid using the few weeks of very
  // low weekly numbers from the first couple weeks
  var startDate = new Date(2020, 04, 01);
  var curDate = new Date();
  var timeBetween = (curDate.getTime() - startDate.getTime()) / 1000;
  timeBetween = timeBetween / (60 * 60 * 24 * 7);
  console.log(timeBetween);
  return timeBetween;
}
