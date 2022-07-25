const deeClock = document.getElementById('clock'); //grab the clock element
const currentDay = document.getElementById('currentDay'); //grab the current day element

const updateTime = () => {  //creating a function that will update the time
  const now = moment();  //grab the current time
  const a = now.format("dddd, MMMM Do YYYY, h:mm.ss A"); //format the time
  clock.textContent = a; //set the clock to the formatted time

  const b = moment().toDate(); //grab the current date
  currentDay.textContent = b; //set the current day to the current date
  console.log(a); //log the formatted time
}; //end of updateTime



setInterval(updateTime, 1000); //run the updateTime function every second
updateTime(); //run the updateTime function right away


