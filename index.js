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

function calendarChangeMonth(check) {
    if (check) {
      const date = new Date(year, month + 1, 1)
      const newDate = new Date(date.setMonth(date.getMonth() + 1));

      month += 1;
      monthName = date.toLocaleString('default', { month: 'long' });
      year = newDate.getFullYear();
      calendarArray = getCalendarArray(date);
    } else {
        const date = new Date(year, month - 1, 1)
        const newDate = new Date(date.setMonth(date.getMonth() - 1));

      month -= 1;
      monthName = date.toLocaleString('default', { month: 'long' });
      year = newDate.getFullYear();
      calendarArray = getCalendarArray(date);
    }
  }

  function renderCalendar() {
    let calendarTop = document.getElementById('calendar-top')
    calendarTop.textContent = `${monthName} ${year}`
    let calendarTable = document.getElementById('calendar-table');
      for (let i = 0; i < calendarArray.length; i++) {
          let row = document.createElement('tr');
          for (let j = 0; j < calendarArray[i].length; j++) {
            let dayButton = document.createElement('button');
            let data = document.createElement('td');
            console.log(day);
            dayButton.textContent = calendarArray[i][j];
            data.appendChild(dayButton)
            row.appendChild(data);
          }
          calendarTable.appendChild(row)
        }
  }

renderCalendar();