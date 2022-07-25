document.body.onload = add24timeBlocksDivs; //load it right away

function add24timeBlocksDivs () {//creating a function that creates a row of 24 time blocks within one day.
  for (let i = 0; i < 25; i++) { //since there is 24 hours in one day we are creating a for loop that will run 24 times and one extra for the 0 index.
    
    const timeBlockDiv = document.createElement("div"); //creating a div element
    timeBlockDiv.className = "time-block"; //adding a class to the div element
    timeBlockDiv.id = `hour${i}`; //adding an id to the div element with a value of ${i}
    timeBlockDiv.dataset.hour = i; //adding a data-hour attribute to the div element with a value of ${i}
    //create the next div inside the timeBlockDiv 
    const displayHourText = document.createElement("div");
    displayHourText.className = "col-md-1 hour";
    displayHourText.textContent = i > 12 ? `${i - 12}:00 PM` : `${i}:00 AM`;// converting the hour to 12 hour format and adding PM if greater then 12, otherwise AM.

    const textareaInputCell = document.createElement("textarea");
    textareaInputCell.className = "col-md-9 description";
    textareaInputCell.id = "saveBtnId";
    textareaInputCell.placeholder = "±";

    const columnSaveBtn = document.createElement("button");
    columnSaveBtn.className = "btn saveBtn col-md-1";
    columnSaveBtn.id = "saveBtnId";
    columnSaveBtn.dataset.hour = i;

    const savebuttonIcon = document.createElement("em");
    savebuttonIcon.className = "fas fa-archive";

    timeBlockDiv.appendChild(displayHourText);
    timeBlockDiv.appendChild(textareaInputCell);
    timeBlockDiv.appendChild(columnSaveBtn);
    columnSaveBtn.appendChild(savebuttonIcon);

  // and give it some content
  // const newContent = document.createTextNode("Hi there and greetings!");

  // // add the text node to the newly created div
  // timeBlockDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1"); //getting the div element with the id of div1
  document.body.insertBefore(timeBlockDiv, currentDiv); //inserting the timeBlockDiv before the div1 element
  }
}

$(document).ready(() => { //when the document is ready, run the following code
  $(".saveBtn").on("click", function () { //when the save button is clicked, run the following code
    const grabText = $(this).siblings(".description").val(); //grab the text from the textarea
    const grabTime = $(this).parent().attr("id");   //grab the time from the timeblock
    localStorage.setItem(grabTime, grabText); //set the local storage with the time and text
  });
  const timeTracker = () => { //creating a function that will track the time
  const timeNow = moment().hour(); //grab the current time

    $(".time-block").each(function () { //for each time block, run the following code
      const blockTime = parseInt($(this).attr("id").split("hour")[1]); //grab the time from the timeblock
      if (blockTime < timeNow) { //if the time is less than the current time, run the following code
        $(this).removeClass("future"); //remove the future class from the timeblock
        $(this).removeClass("present"); //remove the present class from the timeblock
        $(this).addClass("past"); //add the past class to the timeblock
      } else if (blockTime === timeNow) { //if the time is equal to the current time, run the following code
        $(this).removeClass("past"); //remove the past class from the timeblock
        $(this).removeClass("future"); //remove the future class from the timeblock
        $(this).addClass("present"); //add the present class to the timeblock
      } else {
        $(this).removeClass("present"); //remove the present class from the timeblock
        $(this).removeClass("past"); //remove the past class from the timeblock
        $(this).addClass("future"); //add the future class to the timeblock
      }
    });
  };
  $(".time-block").each(function () { //for each time block, run the following code
    const blockTime = parseInt($(this).attr("id").split("hour")[1]); //grab the time from the timeblock
    const blockDescription = $(this).children(".description"); //grab the description from the timeblock
    const blockText = localStorage.getItem(blockTime); //grab the text from the local storage
    if (blockText !== null) {   //if the text is not null, run the following code
      blockDescription.val(blockText); //set the textarea value to the text from the local storage
    }
  }
  );
  setInterval(timeTracker, 15000); //run the timeTracker function every 15 seconds
  timeTracker(); //run the timeTracker function right away
});
