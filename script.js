import { $, $$ } from './helpers.js';

const daysContainer = $('.calendar__daysContainer');
const nextBtn = $('.calendar__nextBtn');
const prevBtn = $('.calendar__prevBtn');
const todayBtn = $('.calendar__todayBtm');
const selectMonths = $('.calendar__selectMonths');
const currentMonthEl = $('.date__currentMonth');
const currentYearEl = $('.date__currentYear');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// get current date
const date = new Date();

// get current month as Integer 0 - 11
let currentMonth = date.getMonth();

// get current year
let currentYear = date.getFullYear();

// function to render days
function renderCalendar() {
  // set the first day of the current Date
  date.setDate(1);

  //determine the first day of current month
  const firstDay = new Date(currentYear, currentMonth, 1);

  //determine the last day of current month
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  // returns an Integer between 0 - 6
  //Sunday = 0; Monday = 1, Tuesday = 2.....
  const lastDayIndex = lastDay.getDay();

  const lastDayDate = lastDay.getDate();

  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();

  const nextDays = 7 - lastDayIndex - 1;
  console.log(nextDays);

  // display current Month
  selectMonths.selectedIndex = currentMonth;
  currentMonthEl.textContent = months[currentMonth];
  currentYearEl.textContent = currentYear;

  // update days html
  let days = '';

  // prev days html
  /*
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDayDate; i++) {
    // check if its today then add today class
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // if date month year matches add today
      days += `<div class="day today">${i}</div>`;
    } else {
      //else dont add today
      days += `<div class="day ">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  // run this function with every calendar render
  daysContainer.innerHTML = days;
	*/
}

renderCalendar();

const events = $$('.event');
const listPanel = $('.list-panel');
const closeBtn = $('.calendar__closeBtn');
const calendarHeadline = $('.calendar__headline');

const listHeadlineText =
  'Details zu den Termin in der Liste einfach anklicken!';
const calendarHeadlineText = 'Wählen Se einen Termin aus der Übersicht aus!';

events.forEach((event) => {
  event.addEventListener('click', () => {
    listPanel.classList.add('open');
    calendarHeadline.textContent = listHeadlineText;
  });
});

closeBtn.addEventListener('click', () => {
  if (listPanel.classList.contains('open')) {
    listPanel.classList.remove('open');
    calendarHeadline.textContent = calendarHeadlineText;
  }
});
