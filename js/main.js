/*jslint browser:true */
"use strict";

const addMonths = (elem) => {
  let annualUseKw = 0;
  let dailyUseKw = 0;
  let i = 0;
  let x = 0;

  const months = document.getElementById(elem).getElementsByTagName("input");

  for (let i = 0; i < months.length; i++) {
    x = +months[i].value;
    annualUseKw += x;
  }
  dailyUseKw = annualUseKw / 365;
  return dailyUseKw;
};

const sunHours = () => {
  var hrs;
  let theZone = document.forms.solarForm.zone.selectedIndex;
  theZone += 1;

  switch (theZone) {
    case 1:
      hrs = 6;
      break;
    case 2:
      hrs = 5.5;
      break;
    case 3:
      hrs = 5;
      break;
    case 4:
      hrs = 4.5;
      break;
    case 5:
      hrs = 4.2;
      break;
    case 6:
      hrs = 3.5;
      break;
    default:
      hrs = 0;
  }
  return hrs;
};

const calculatePanel = () => {
  const userChoice = document.forms.solarForm.panel.selectedIndex;
  const panelOptions = document.forms.solarForm.panel.options;
  const power = panelOptions[userChoice].value;
  const name = panelOptions[userChoice].text;
  const x = [power, name];
  return x;
};

const calculateSolar = () => {
  const dailyUseKw = addMonths("mpc");
//   console.log(dailyUseKw);

  const sunHoursPerDay = sunHours();
//   console.log(sunHoursPerDay);

  const minKwNeeds = dailyUseKw / sunHoursPerDay;
//   console.log(minKwNeeds);

  const realKWneeds = minKwNeeds * 1.25;
//   console.log(realKWneeds);

  const realWattNeeds = realKWneeds * 1000;
//   console.log(realWattNeeds);

  const panelInfo = calculatePanel()
  const panelOutput = panelInfo[0]
  const panelName = panelInfo[1]
//   console.log(panelOutput)
//   console.log(panelName)

  const panelsNeeded = Math.ceil(realWattNeeds / panelOutput)
//   console.log(panelsNeeded)

  let feedback = "";
    feedback += "<p>Based on your average daily use of "+Math.round(dailyUseKw)+" kWh, you will need to purchase "+panelsNeeded+" "+panelName+" solar panels to offset 100% of your electricity bill.</p>"
    feedback += "<h2>Additional Details</h2>"
    feedback += "<p>Your average daily electricity consumption: "+Math.round(dailyUseKw)+" Kwh per day.</p>"
    feedback += "<p> Average sunhine hour per day: "+sunHoursPerDay+" hours</p>"
    feedback += "<p>Realistic watts needed per hour: "+Math.round(realWattNeeds)+" watts/hour. </p>"
    feedback += "<p> The "+panelName+" panel you selected generates about "+panelOutput+" watts per hour</p>"

    document.getElementById('feedback').innerHTML = feedback
};
