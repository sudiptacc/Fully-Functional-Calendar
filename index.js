// Mostly stolen from some other project
// fixed to actually work though

// global variables
var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();
var monthName = date.toLocaleString('default', { month: 'long' });

function getCalendarArray (date = new Date()) {
    // Get day of the week of the first day of the month (0-6)
    const firstDay = new Date(year, month, 1).getDay();

    // Get number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get number of rows in the calendar table
    const dayCellsUsed = firstDay + daysInMonth;
    const weeksInMonth = Math.ceil(dayCellsUsed / 7);

    const calendarArray = Array(weeksInMonth).fill();

    // Fill calendarArray with days of the month
    for (let i = 0; i < weeksInMonth; i++) {
      calendarArray[i] = Array(7).fill();
      for (let j = 0; j < 7; j++) {
        const day = i * 7 + j - firstDay + 1;
        if (day > 0 && day <= daysInMonth) {
          calendarArray[i][j] = day;
        }
      }
    }

    return calendarArray;
}

var calendarArray = getCalendarArray();

// runs whenever the month change buttons are run
function calendarChangeMonth(check) {
    if (check) {
      date.setMonth(date.getMonth() + 1);
      month = date.getDate();
      monthName = date.toLocaleString('default', { month: 'long' });
      year = date.getFullYear();
      console.log(date);
      calendarArray = getCalendarArray(date);
    } else {
      date.setMonth(date.getMonth() - 1);
      month = date.getDate();
      monthName = date.toLocaleString('default', { month: 'long' });
      year = date.getFullYear();
      calendarArray = getCalendarArray(date);
    }
    renderCalendar();
  }

  // function that draws the actual calendar
function initiateCalendar() {
  let calendarInfo = document.getElementById('calendar-info')
  calendarInfo.textContent = `${monthName} ${year}`
  let calendarTable = document.getElementById('calendar-table');
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let daysRow = document.createElement("tr");
  for (let i = 0; i < days.length; i++) {
    let dayHeading = document.createElement('th');
    dayHeading.textContent = days[i];
    daysRow.appendChild(dayHeading);
  }
  calendarTable.appendChild(daysRow);
  for (let i = 0; i < calendarArray.length; i++) {
      let row = document.createElement('tr');
      for (let j = 0; j < calendarArray[i].length; j++) {
        let dayButton = document.createElement('button');
        let data = document.createElement('td');
        dayButton.textContent = calendarArray[i][j];
        data.appendChild(dayButton)
        row.appendChild(data);
      }
      calendarTable.appendChild(row)
    }
}

// function is run to update the calendar with new month
function renderCalendar() {
  let calendarTable = document.getElementById('calendar-table');
  // removes children of table so that new information can be added
  while (calendarTable.firstChild) {
    calendarTable.removeChild(calendarTable.firstChild);
  }
  initiateCalendar();
}

initiateCalendar();