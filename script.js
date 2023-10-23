import { $, $$ } from './helpers.js';

const daysContainer = $('.calendar__daysContainer');
const nextBtn = $('.calendar__nextBtn');
const prevBtn = $('.calendar__prevBtn');
const todayBtn = $('.calendar__todayBtn');
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
  console.log(date);

  //determine the first day of current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  console.log(firstDay);
  console.log(firstDay.getDate());
  console.log(firstDay.getDay());

  //determine the last day of current month
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  console.log(lastDay);

  // returns an Integer between 0 - 6
  //Sunday = 0; Monday = 1, Tuesday = 2.....
  const lastDayIndex = lastDay.getDay();
  console.log(lastDayIndex);

  const lastDayDate = lastDay.getDate();
  console.log(lastDayDate);

  const prevLastDay = new Date(currentYear, currentMonth, 0);
  console.log(prevLastDay);

  const prevLastDayDate = prevLastDay.getDate();
  console.log(prevLastDayDate);

  const nextDays = 7 - lastDayIndex - 1;
  console.log(nextDays);

  // display current Month
  selectMonths.selectedIndex = currentMonth;
  currentMonthEl.textContent = months[currentMonth];
  currentYearEl.textContent = currentYear;

  // update days html
  let days = '';

  // prev days html
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `
    <div class="calendar__cell notCurrentMonth">
      <span class="calendar__day">${prevLastDayDate - x + 1}</span>
    </div>
    
    `;
  }

  for (let i = 1; i <= lastDayDate; i++) {
    // check if its today then add today class
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // if date month year matches add today
      days += `
      <div class='calendar__cell currentDay'>
      <span class='calendar__day'>${i}</span>
      </div>
      `;
    } else {
      //else dont add today
      days += `
        <div class="calendar__cell">
          <span class="calendar__day">${i}</span>
        </div>
      `;
    }
  }

  // next month days
  for (let j = 1; j <= nextDays; j++) {
    days += `
    <div class="calendar__cell notCurrentMonth">
      <span class="calendar__day">${j}</span>
    </div>
    `;
  }

  // run this function with every calendar render
  daysContainer.innerHTML = days;
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

nextBtn.addEventListener('click', () => {
  // increase current month by one
  currentMonth++;
  if (currentMonth > 11) {
    // if month gets greater that 11 make it 0 and increase year by one
    currentMonth = 0;
    currentYear++;
  }
  // rerender calendar
  renderCalendar();
});

// prev monyh btn
prevBtn.addEventListener('click', () => {
  // increase by one
  currentMonth--;
  // check if month gets less than 0 then make it 11 and deacrease year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// go to today
todayBtn.addEventListener('click', () => {
  // set month and year to current
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  // rerender calendar
  renderCalendar();
});
